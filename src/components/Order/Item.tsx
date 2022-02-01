import React from 'react';
import './item.scss';

interface CartProps {
    item : {
    id : number;
    img : string;
    name : string;
    price : number;
    quantity : number;
    size : number;
    brand :string
}

}

export default function Item({ item }: CartProps) {
    return (
        <div className='item'>
            <div className='item__left'>
                <div className='item__left__img'>
                    <img
                        src={require(`../../assets/shoes/${item.img}.jpeg`)}
                        alt={item.name}
                    />
                    <span>{item.quantity}</span>
                </div>
            </div>
            <div className='item__middle'>
                <div className='item__middle__name'>{item.name}</div>
                <div className='item__middle__brand'>{item.brand}</div>

                <div className='item__middle__size'>
                    {item.size + ' EU'} - {item.price + ',00 €'}
                </div>
            </div>
            <div className='item__right'>
                {item.price * item.quantity + ',00 €'}
            </div>
        </div>
    );
}
