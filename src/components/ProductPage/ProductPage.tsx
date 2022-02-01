import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import shoes from '../../datas/shoes';
import './product-page.scss';
import * as cartActions from '../../redux/actions/cartActions';
import * as displayActions from '../../redux/actions/displayActions';
import { useDispatch, useSelector } from 'react-redux';
import {productInterface, stateInterface} from "../../Types/types";


export default function ProductPage() {
    const [mainImage, setMainImage] = useState(true);
    const [selectedSize, setSelectedSize] = useState(38);

    let { id } = useParams();
    const productId = parseInt(id!);

    const productItem = shoes.filter((shoe) => shoe.id === productId);
    const sizes = productItem[0].sizes;

    const imgToDisplay = mainImage
        ? productItem[0].img
        : productItem[0].secondImg;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(displayActions.showHeader(true));
    }, [dispatch]);

    const list = useSelector((state:stateInterface) => state.cart.list);


    const sameProduct = list.find(
        (elt: productInterface) => elt.id === productItem[0].id && elt.size === selectedSize,
    );

    const handleAddToCart = () => {
        const cartProduct = {
            id: productItem[0].id,
            name: productItem[0].name,
            brand: productItem[0].brands.main,
            price: productItem[0].price,
            img: productItem[0].img,
            size: selectedSize,
            quantity: 1,
        };

        if (!sameProduct) {
            dispatch(cartActions.addToCart(cartProduct));
        } else if (sameProduct) {
            dispatch(
                cartActions.addQuantity(
                    productItem[0].id,
                    selectedSize,
                    productItem[0].price,
                ),
            );
        }
        dispatch(displayActions.showCart(2));
    };

    return (
        <div className='product-page'>
            <div className='product-page__img'>
                <div className='product-page__img__main'>
                    <img
                        src={require(`../../assets/shoes/${imgToDisplay}.jpeg`)}
                        alt={productItem[0].name}
                    />
                </div>
                <div className='product-page__img__select'>
                    <div className='product-page__img__select__main'>
                        <img
                            style={
                                mainImage ? { opacity: 1 } : { opacity: 0.5 }
                            }
                            src={require(`../../assets/shoes/${productItem[0].img}.jpeg`)}
                            alt={productItem[0].name + " l'unité"}
                            onClick={() => setMainImage(true)}
                        />
                    </div>
                    <div className='product-page__img__select__second'>
                        <img
                            style={
                                mainImage ? { opacity: 0.5 } : { opacity: 1 }
                            }
                            src={require(`../../assets/shoes/${productItem[0].secondImg}.jpeg`)}
                            alt={productItem[0].name + ' la paire'}
                            onClick={() => setMainImage(false)}
                        />
                    </div>
                </div>
            </div>
            <div className='product-page__right'>
                <div className='product-page__right__description'>
                    <div className='product-page__right__description__brand'>
                        {productItem[0].brands.main}
                    </div>
                    <div className='product-page__right__description__name'>
                        {productItem[0].name}
                    </div>
                    <div className='product-page__right__description__price'>
                        {productItem[0].price + ',00 €'}
                    </div>
                </div>
                <div className='product-page__right__select'>
                    <div className='product-page__right__select__size'>
                        <select
                            value={'DEFAULT'}
                            name='size'
                            onChange={(e) =>
                                setSelectedSize(parseInt(e.target.value))
                            }
                        >
                            {sizes.map((size) =>
                                size.size !== selectedSize ? (
                                    <option key={Math.random()}>
                                        {size.size}
                                    </option>
                                ) : (
                                    <option
                                        key={Math.random()}
                                        value='DEFAULT'
                                        disabled
                                    >
                                        {selectedSize}
                                    </option>
                                ),
                            )}
                        </select>
                    </div>
                    <button
                        className='product-page__right__cart'
                        onClick={handleAddToCart}
                    >
                        Ajouter au panier
                    </button>
                </div>
            </div>
        </div>
    );
}
