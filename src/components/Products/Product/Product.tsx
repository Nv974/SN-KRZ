import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './product.scss';

type ProductProps = {
    item : {
        id: number;
        name: string;
        price: number;
        img: string;
        secondImg: string;
        description: string;
        sizes: {
            size: number;
            stock: number;
        }[];
        brands: {
            main: string;
        };
    }

};

export default function Product({item}: ProductProps) {
    const [mouseOver, setMouseOver] = useState(true);

    const shoeImg = !mouseOver ? item.secondImg : item.img;

    return (
        <div className='product'>
            <div className='product__img'>
                <Link to={`/products/${item.id}`}>
                    <img
                        src={require(`../../../assets/shoes/${shoeImg}.jpeg`)}
                        alt='product'
                        onMouseOver={() => setMouseOver(false)}
                        onMouseOut={() => setMouseOver(true)}
                    />
                </Link>
            </div>
            <div className='product__infos'>
                <div className='product__infos__name'>{item.name}</div>
                <div className='product__infos__brand'>
                    {item.brands.main}
                </div>
                <div className='product__infos__price'>
                    {item.price + '.00 €'}
                </div>
            </div>
        </div>
    );
}
