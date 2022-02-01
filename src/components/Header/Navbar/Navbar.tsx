import React from 'react';
import './navbar.scss';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className='navbar'>
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
