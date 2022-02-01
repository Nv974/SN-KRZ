import React from 'react';
import logo from '../../assets/icons/snikrz.png';
import './header.scss';
import cart from '../../assets/icons/panier.png';
import search from '../../assets/icons/search.png';
import email from '../../assets/icons/email.png';
import phone from '../../assets/icons/phone.png';
import Navbar from './Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import * as displayActions from '../../redux/actions/displayActions';
import { Link } from 'react-router-dom';
import {stateInterface} from "../../Types/types";

export default function Header() {
    const dispatch = useDispatch();

    const handleShowCart = () => {
        dispatch(displayActions.showCart(2));
    };

    const cartNumber = useSelector((state: stateInterface) => state.cart.list.length);

    return (
        <div className='header'>
            <div className='header__top'>
                <div className='header__top__contact'>
                    <div className='header__top__contact__phone'>
                        <img src={phone} alt='téléphone' />
                        06 93 51 62 99
                    </div>
                    <div className='header__top__contact__mail'>
                        <img src={email} alt='email' />
                        nicolasvitry.web@gmail.com
                    </div>
                </div>
                <div className='header__top__logo'>
                    <Link to='/'>
                        <img src={logo} alt='logo' />
                    </Link>
                </div>
                <div className='header__top__browse'>
                    <span>MON COMPTE</span>|
                    <span onClick={handleShowCart}>
                        <div className='header__top__browse__cart'>
                            <img src={cart} alt='panier' />
                            {cartNumber !== 0 && (
                                <div className='header__top__browse__cart__number'>
                                    {cartNumber}
                                </div>
                            )}
                        </div>
                    </span>
                    |
                    <span>
                        <img src={search} alt='rechercher' />
                    </span>
                </div>
            </div>
            <Navbar />
        </div>
    );
}
