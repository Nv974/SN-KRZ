import React, { FC, useEffect, useState } from 'react';
import * as displayActions from '../../redux/actions/displayActions';
import { useDispatch, useSelector } from 'react-redux';
import './order.scss';
import logo from '../../assets/icons/snikrz.png';
import { Link, useNavigate } from 'react-router-dom';
import Item from './Item';
import * as orderActions from '../../redux/actions/orderActions';
import { useForm } from 'react-hook-form';
import {stateInterface, FormInputs, productInterface} from "../../Types/types";


const Order: FC = ( context) => {

    const dispatch = useDispatch();

    const { register, handleSubmit, formState } = useForm<FormInputs>();

    const { isSubmitting, errors } = formState;

    useEffect(() => {
        dispatch(displayActions.showCart(1));
        dispatch(displayActions.showHeader(false));
        dispatch(orderActions.payOrder('none'));
    }, [dispatch]);

    const router = useNavigate();

    const cartList = useSelector((state: stateInterface ) => state.cart.list);
    const subPrice = useSelector((state: stateInterface) => state.cart.sub);

    const [deliveryPrice, setDeliveryPrice] = useState(0);
    const [error, setError] = useState('');
    const [payment, setPayment] = useState(false);

    const totaLPrice = subPrice + deliveryPrice;
    const priceStr = totaLPrice.toString().replace('.', ',');


    const handleOrderSubmit = (data: FormInputs) => {
        const order = {
            id: Math.random(),
            userId: Math.random(),
            userInformations: data,
            products: cartList,
            subPrice,
            deliveryPrice,
            totalPrice: subPrice + deliveryPrice,
            finish: false,
        };

        if (deliveryPrice === 0) {
            setError('Veuillez choisir un mode de livraison');
        } else {
            setPayment(true);
            setError('');
            dispatch(orderActions.addOrder(order));
            router('/stripe');
        }
    };

    const borderError = {
        border: '2px solid red',
    };

    return (
        <form className='order' onSubmit={handleSubmit(handleOrderSubmit)}>
            <div className='order__left'>
                <>
                    <div className='order__left__header'>
                        <div className='order__left__header__logo'>
                            <img src={logo} alt='logo' />
                        </div>
                        <div className='order__left__header__path'></div>
                    </div>
                    <div className='order__left__form'>
                        <div className='order__left__form__mail'>
                            <label htmlFor='email'> Coordonnées </label>
                            <input
                                {...register('email', {
                                    required:
                                        'Veulliez entrer une adresse email',
                                    maxLength: {
                                        value: 150,
                                        message:
                                            'Vous avez entrer trop de caractères',
                                    },
                                })}
                                type='email'
                                name='email'
                                id='email'
                                placeholder='Adresse e-mail'
                                style={errors.email && borderError}
                            />
                            {errors.email && (
                                <span className='order__invalid'>
                                    {errors.email.message}
                                </span>
                            )}
                        </div>
                        <label>Adresse de Livraison</label>
                        <div className='order__left__form__address'>
                            <select
                                {...register('country', {
                                    required: 'Veuillez selectionner un pays',
                                })}
                                name='country'
                                id='country'
                                style={errors.country && borderError}
                            >
                                {errors.country && (
                                    <span className='order__invalid'>
                                        {errors.country.message}
                                    </span>
                                )}
                                <option value='Réunion'> Réunion </option>
                                <option value='France'>
                                    {' '}
                                    France métropolitaine{' '}
                                </option>
                            </select>
                            <div className='order__left__form__address__name'>
                                <input
                                    {...register('firstname', {
                                        required: 'Veulliez entrer un prénom',
                                        minLength: {
                                            value: 2,
                                            message:
                                                'Vous devez entrer au moins 2 caractères',
                                        },
                                        maxLength: {
                                            value: 50,
                                            message:
                                                'Vous avez entrer trop de caractères',
                                        },
                                    })}
                                    type='text'
                                    name='firstname'
                                    id='firstname'
                                    placeholder='Prénom'
                                    style={errors.firstname && borderError}
                                />
                                <input
                                    {...register('lastname', {
                                        required: 'Veulliez entrer un nom',
                                        minLength: {
                                            value: 2,
                                            message:
                                                'Vous devez entrer au moins 2 caractères',
                                        },
                                        maxLength: {
                                            value: 50,
                                            message:
                                                'Vous avez entrer trop de caractères',
                                        },
                                    })}
                                    type='text'
                                    name='lastname'
                                    id='lastname'
                                    placeholder='Nom'
                                    style={errors.lastname && borderError}
                                />
                            </div>
                            <div className='order__errors'>
                                {errors.firstname && (
                                    <span className='order__invalid'>
                                        {errors.firstname.message}
                                    </span>
                                )}
                                {errors.lastname && (
                                    <span className='order__invalid'>
                                        {errors.lastname.message}
                                    </span>
                                )}
                            </div>

                            <div className='order__left__form__address__company'>
                                <input
                                    {...register('company', {
                                        required: false,
                                    })}
                                    type='text'
                                    name='company'
                                    id='company'
                                    placeholder='Entreprise (facultatif)'
                                />
                            </div>
                            <div className='order__left__form__address__street'>
                                <input
                                    {...register('street', {
                                        required: 'Veulliez entrer une adresse',
                                        minLength: {
                                            value: 5,
                                            message:
                                                'Vous devez entrer au moins 5 caractères',
                                        },
                                        maxLength: {
                                            value: 50,
                                            message:
                                                'Vous avez entrer trop de caractères',
                                        },
                                    })}
                                    type='text'
                                    name='street'
                                    id='street'
                                    placeholder='Adresse'
                                    style={errors.street && borderError}
                                />
                            </div>
                            {errors.street && (
                                <span className='order__invalid'>
                                    {errors.street.message}
                                </span>
                            )}
                            <div className='order__left__form__address__sup'>
                                <input
                                    {...register('sup', {
                                        required: false,
                                    })}
                                    type='text'
                                    name='sup'
                                    id='sup'
                                    placeholder="Supplément d'addresse : Numéro de bâtiment, code, étage ... (facultatif)"
                                />
                            </div>
                            <div className='order__left__form__address__city'>
                                <input
                                    {...register('zip', {
                                        required:
                                            'Veulliez saisir un code postal',
                                        minLength: {
                                            value: 5,
                                            message:
                                                'Le code Postal doit contenir 5 chiffres',
                                        },
                                        maxLength: {
                                            value: 5,
                                            message:
                                                'Le code Postal doit contenir 5 chiffres',
                                        },
                                    })}
                                    type='text'
                                    name='zip'
                                    id='zip'
                                    placeholder='Code Postal'
                                    style={errors.zip && borderError}
                                />
                                <input
                                    {...register('city', {
                                        required: 'Veulliez saisir une ville',
                                        minLength: {
                                            value: 2,
                                            message:
                                                'Vous devez entrer au moins 2 caractères',
                                        },
                                        maxLength: {
                                            value: 70,
                                            message:
                                                'Vous avez entrer trop de caractères',
                                        },
                                    })}
                                    type='text'
                                    name='city'
                                    id='city'
                                    placeholder='Ville'
                                    style={errors.city && borderError}
                                />
                            </div>
                            <div className='order__errors'>
                                {errors.zip && (
                                    <span className='order__invalid'>
                                        {errors.zip.message}
                                    </span>
                                )}
                                {errors.city && (
                                    <span className='order__invalid'>
                                        {errors.city.message}
                                    </span>
                                )}
                            </div>
                            <div className='order__left__form__address__phone'>
                                <input
                                    {...register('phone', {
                                        required: 'Veulliez entrer un phone',
                                        minLength: {
                                            value: 2,
                                            message:
                                                'Vous devez entrer au moins 6 caractères',
                                        },
                                        maxLength: {
                                            value: 50,
                                            message:
                                                'Vous avez entrer trop de caractères',
                                        },
                                    })}
                                    type='text'
                                    name='phone'
                                    id='phone'
                                    placeholder='Numéro de téléphone (pour le livreur)'
                                    style={errors.phone && borderError}
                                />
                                {errors.phone && (
                                    <span className='order__invalid'>
                                        {errors.phone.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='order__left__btns'>
                        <Link to='/'>
                            <div className='order__left__btns__back'>
                                {`< Retour au panier `}
                            </div>
                        </Link>
                    </div>
                </>
            </div>
            <div className='order__right'>
                <div className='order__right__products'>
                    {cartList.map((item: productInterface) => (
                        <Item key={Math.random()} item={item} />
                    ))}
                </div>
                <div className='order__right__delivery'>
                    <div className='order__right__select'>
                        <p>Choisissez le mode d'expedition</p>
                        <div>
                            <input
                                onChange={() => {
                                    setDeliveryPrice(9.99);
                                }}
                                type='radio'
                                name='delivery'
                                id='normal'
                                value='normal'
                            />
                            <label htmlFor='normal'>
                                Envoi normal (+ 9,99€)
                            </label>
                        </div>
                        <div>
                            <input
                                onChange={() => {
                                    setDeliveryPrice(19.99);
                                }}
                                type='radio'
                                name='delivery'
                                id='express'
                                value='express'
                            />
                            <label htmlFor='normal'>
                                Envoi express (+ 19,99€)
                            </label>
                        </div>
                        <span className='order__invalid'>{error}</span>
                    </div>
                    <div className='order__right__infos'>
                        <div className='order__right__subprice'>
                            <p className='order__right__subprice__left'>
                                Sous-total
                            </p>
                            <p className='order__right__subprice__price'>
                                {subPrice + ',00 €'}
                            </p>
                        </div>
                        <div className='order__right__delivprice'>
                            <p className='order__right__delivprice__left'>
                                Livraison
                            </p>
                            <p
                                className='order__right__delivprice__price'
                                style={{ fontSize: 15 }}
                            >
                                {deliveryPrice === 0
                                    ? 'Choisissez un mode de livraison'
                                    : deliveryPrice
                                          .toString()
                                          .replace('.', ',') + ' €'}
                            </p>
                        </div>
                    </div>
                    <div className='order__right__total'>
                        <p className='order__right__total__left'>Total</p>
                        <p className='order__right__total__price'>
                            {priceStr + ' €'}
                        </p>
                    </div>
                </div>
                <button
                    className={
                        isSubmitting
                            ? 'order__right__btn--disabled'
                            : 'order__right__btn--enabled'
                    }
                    disabled={deliveryPrice > 0 && isSubmitting}
                    type='submit'
                >
                    Passer au paiement
                </button>
            </div>
        </form>
    );
};

export default Order;
