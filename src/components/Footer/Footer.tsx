import React from 'react';
import './footer.scss';

export default function Footer() {
    return (
        <div className='footer'>
            <div className='footer__contact'>
                <h3> Contact </h3>
                <p>Nous sommes disponibles du lundi au samedi de 9h à 19h</p>
                <div className='footer__phone'> +262(0) 6 93 51 62 99 </div>
                <div className='footer__mail'> nicolasvitry.web@gmail.com </div>
            </div>
            <div className='footer__brands'>
                <h3>Les Marques</h3>
                <ul>
                    <li>Nike</li>
                    <li>Adidas</li>
                    <li>Jordan</li>
                    <li>Yeezy</li>
                    <li>Converse</li>
                    <li>New Balance</li>
                </ul>
            </div>
            <div className='footer__about'>
                <h3>En savoir plus</h3>
                <ul>
                    <li>Nous contacter</li>
                    <li>Mentions légales</li>
                    <li>Politique de confidentialité</li>
                    <li>Conditions Générales de Ventes</li>
                </ul>
            </div>
        </div>
    );
}
