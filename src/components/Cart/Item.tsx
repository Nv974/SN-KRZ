import React from 'react';
import * as cartActions from '../../redux/actions/cartActions';

import { useDispatch, useSelector } from 'react-redux';

type ItemProps = {
    item : {
        id : number;
        quantity : number;
        name: string;
        img: string;
        price: number;
        size: number;
        brand: string;
    }
};

//item

export default function Item({ item } : ItemProps) {
    const dispatch = useDispatch();

    const currentProduct = useSelector((state: any) => {
        return state.cart.list.filter(
            (product: any) =>
                product.id === item.id && product.size === item.size,
        );
    });


    const handleChangeQuantity = (operation: string) => {
        if (operation === 'plus') {
            dispatch(cartActions.addQuantity(item.id, item.size, item.price));
        } else if (operation === 'min') {
            if (currentProduct[0].quantity > 1) {
                dispatch(
                    cartActions.removeQuantity(item.id, item.size, item.price),
                );
            } else {
                dispatch(
                    cartActions.removeToCart(
                        currentProduct[0].id,
                        currentProduct[0].size,
                        currentProduct[0].price,
                    ),
                );
            }
        }
    };

    return (
        <div className='cart__right__infos'>
            <div className='cart__right__infos__left'>
                <img
                    src={require(`../../assets/shoes/${item.img}.jpeg`)}
                    alt={item.name}
                    style={{ width: 100 }}
                />
            </div>
            <div className='cart__right__infos__right'>
                <div className='cart__right__infos__name'>{item.name}</div>
                <div className='cart__right__infos__brand'>{item.brand}</div>
                <div className='cart__right__infos__size'>
                    {item.size} EU -{' ' + item.price + ',00'} €
                </div>
                <div className='cart__right__infos__bottom'>
                    <div className='cart__right__infos__bottom__select'>
                        <span onClick={() => handleChangeQuantity('min')}>
                            -
                        </span>
                        {currentProduct[0].quantity}
                        <span onClick={() => handleChangeQuantity('plus')}>
                            +
                        </span>
                    </div>
                </div>
                <div className='cart__right__infos__price'>
                    {item.price * currentProduct[0].quantity + ',00'} €
                </div>
            </div>
        </div>
    );
}
