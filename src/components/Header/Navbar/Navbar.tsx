import React from 'react';
import './navbar.scss';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const burgerToggler = () => {
        const burger = document.querySelector(
            '.navbar__burger',
        ) as HTMLSpanElement;
        const categories = document.querySelector(
            '.navbar__categories',
        ) as HTMLUListElement;
        categories.classList.toggle('navbar__categories--open');
        burger.classList.toggle('navbar__burger--open');
    };

    return (
        <nav className='navbar'>
            <span className='navbar__burger' onClick={burgerToggler}></span>
            <ul className='navbar__categories'>
                <li>
                    <Link to='#'>homme</Link>
                </li>
                <li>
                    <Link to='#'>femme</Link>
                </li>
                <li>
                    <Link to='#'>enfant</Link>
                </li>
                <li>
                    <Link to='#'>marques</Link>
                </li>
                <li>
                    <Link to='#'>nouveautés</Link>
                </li>
                <li>
                    <Link to='#'>promotions</Link>
                </li>
            </ul>
        </nav>
    );
}
