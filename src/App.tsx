import React, { useEffect } from 'react';
import Header from './components/Header/Header';
import './app.scss';
import Products from './components/Products/Products';
import { Routes, Route, useLocation } from 'react-router-dom';
import ProductPage from './components/ProductPage/ProductPage';
import Cart from './components/Cart/Cart';
import Order from './components/Order/Order';
import { useSelector } from 'react-redux';
import StripeContainer from './stripe/StripeContainer';
import Footer from './components/Footer/Footer';
import {stateInterface} from "./Types/types";


function App() {
    const showHeader = useSelector((state: stateInterface ) => state.display.showHeader);
    const location = useLocation();

    const title = document.querySelector('title')  as  HTMLTitleElement;
    title.textContent = 'SN!KRZ'

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }, [location]);

    return (
        <div className='App'>
            {showHeader && <Header />}
            <Routes>
                <Route path='/' element={<Products />} />
                <Route path='/products/:id' element={<ProductPage />} />
                <Route path='/order' element={<Order />} />
                <Route path='/stripe' element={<StripeContainer />} />
            </Routes>
            <Cart />
            <Footer />
        </div>
    );
}

export default App;
