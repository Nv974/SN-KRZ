import React, { FormEvent, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import * as orderActions from '../redux/actions/orderActions';
import * as displayActions from '../redux/actions/displayActions';
import * as cartActions from '../redux/actions/cartActions';

import './checkout.scss';
import logo from '../assets/icons/snikrz.png';
import chip from '../assets/icons/chip.png';
import { Link, useNavigate } from 'react-router-dom';
import Item from '../components/Order/Item';
import { SpinnerCircular } from 'spinners-react';

export default function CheckoutForm() {
    const dispatch = useDispatch();
    const elements = useElements();

    const stripe = useStripe();

    const order = useSelector((state: any) => state.order.order);
    const paymentStatus = useSelector((state: any) => state.order.payment);

    const amount = order.totalPrice * 100;

    useEffect(() => {
        dispatch(displayActions.showCart(1));
        dispatch(displayActions.showHeader(false));
    }, [dispatch]);

    const paymentRender = () => {
        if (paymentStatus === 'payed') {
            return (
                <div className='checkout__form__check__status--ok'>
                    Le paiement a été accepté !
                </div>
            );
        } else if (paymentStatus === 'denied') {
            return (
                <div className='checkout__form__check__status--error'>
                    Paiement refusé
                </div>
            );
        }
    };

    const router = useNavigate();

    const handleOnSubmitForm = async (e: FormEvent) => {
        e.preventDefault();
        const { error, paymentMethod } = await stripe!.createPaymentMethod({
            type: 'card',
            card: elements!.getElement(CardElement) as any,
        });
        if (!error) {
            console.log('Token Généré : ', paymentMethod);
            dispatch(orderActions.payOrder('waiting'));

            //envoi du token au back

            try {
                const reponse = await axios.post(
                    'http://localhost:8080/stripe/charge',
                    {
                        amount: amount,
                        //client: order.userId,
                        id: paymentMethod!.id,
                    },
                );
                if (reponse.data.success) {
                    console.log('Paiement accepté');
                    dispatch(orderActions.payOrder('payed'));
                    dispatch(cartActions.eraseCart());
                }
            } catch (err) {
                console.log('Paiement refusé', err);
                dispatch(orderActions.payOrder('denied'));
            }
        } else {
            console.log('erreur', error.message);
        }
    };

    const CardOptions = {
        hidePostalCode: true,
        style: {
            base: {
                fontSize: '16px',
                color: 'white',
                '::placeholder': {
                    color: '#dcdde1',
                },
                iconColor: 'white',
            },
            invalid: {
                color: 'red',
                iconColor: 'red',
            },
            complete: {
                iconColor: '#10FF00',
                color: '#DDFEDA',
            },
        },
    };

    return (
        <div className='order'>
            <div className='order__left'>
                <div className='checkout'>
                    <div className='checkout__header'>
                        <img src={logo} alt='logo' />
                        <div className='checkout__header__label'>
                            Entrez les informations nécessaires à l'achat
                        </div>
                    </div>

                    <form
                        onSubmit={handleOnSubmitForm}
                        className='checkout__form'
                    >
                        <div className='checkout__form__logo'>
                            <img src={logo} alt='logo' />
                        </div>
                        <div className='checkout__form__chip'>
                            <img src={chip} alt='puce' />
                        </div>
                        {paymentStatus !== 'payed' && (
                            <CardElement options={CardOptions} />
                        )}
                        <div className='checkout__form__check'>
                            {paymentStatus !== 'payed' && (
                                <button type='submit'>
                                    {paymentStatus === 'waiting' ? (
                                        <SpinnerCircular
                                            size={30}
                                            color='gray'
                                            thickness={150}
                                            secondaryColor={'white'}
                                        />
                                    ) : (
                                        `Payer ${order.totalPrice + ' €'}`
                                    )}
                                </button>
                            )}
                            {
                                <div className='checkout__form__check__status'>
                                    {paymentRender()}
                                </div>
                            }
                        </div>
                    </form>
                    <div className='checkout__footer'>
                        <Link to={paymentStatus === 'payed' ? '/' : '/order'}>
                            {paymentStatus === 'wait' && ''}
                            {paymentStatus === 'none' &&
                                '<  Revenir à la commande'}
                            {paymentStatus === 'payed' &&
                                '< Retour à la boutique'}
                        </Link>
                    </div>
                </div>
            </div>
            <div className='order__right'>
                <div className='order__right__products'>
                    {order.products.map((item: any) => (
                        <Item key={Math.random()} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}
