import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as displayActions from '../../redux/actions/displayActions';
import './cart.scss';
import Item from './Item';
import {stateInterface} from "../../Types/types";

type ItemProps = {
    id : number;
    quantity : number;
    name: string;
    img: string;
    price: number;
    size: number;
    brand: string;
};

export default function Cart() {
    const dispatch = useDispatch();
    const cartList = useSelector((state: stateInterface) => state.cart.list);
    const showCart = useSelector((state: stateInterface) => state.display.showCart);
    const cartSub = useSelector((state: stateInterface) => state.cart.sub);

    /* 
        Positionnement du panier

        1 = état initial => caché

        2 = Show

        3 = Fermé
    
    */

    const handleShowCart = () => {
        if (showCart === 1 || showCart === 3) {
            dispatch(displayActions.showCart(2));
        } else if (showCart === 2) {
            dispatch(displayActions.showCart(3));
        }
    };

    let leftShow;
    let rightShow;

    switch (showCart) {
        case 1:
            leftShow = 'cart__left';
            rightShow = 'cart__right';

            break;
        case 2:
            leftShow = 'cart__left--show';
            rightShow = 'cart__right--show';

            break;
        case 3:
            leftShow = 'cart__left';
            rightShow = 'cart__right--close';
            break;

        default:
            break;
    }

    return (
        <div className='cart'>
            <div className={leftShow} onClick={handleShowCart}></div>
            <div className={rightShow}>
                <div className='cart__right__header'>
                    <div className='cart__right__header__close'>
                        <button onClick={handleShowCart}>+</button>
                    </div>
                    <div className='cart__right__header__title'>Mon Panier</div>
                </div>

                {cartList.length !> 1 && (
                    <div> Il n'y a aucun produit dans le panier </div>
                )}

                {cartList.map((item: ItemProps) => (
                    <Item item={item} key={Math.random()} />
                ))}
                {cartList.length > 1 && (
                    <>
                        <div className='cart__right__sub'>
                            <span>Sous-total</span>{' '}
                            <span>{cartSub + ',00'} € </span>
                        </div>
                        <Link to='/order'>
                            <button className='cart__right__order'>
                                Finaliser la commande
                            </button>
                        </Link>
                        <button
                            className='cart__right__shop'
                            onClick={handleShowCart}
                        >
                            Continuer mes achats
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
