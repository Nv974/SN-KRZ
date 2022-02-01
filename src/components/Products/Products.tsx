import React, { useEffect } from 'react';
import shoes from '../../datas/shoes';
import Product from './Product/Product';
import './products.scss';
import * as displayActions from '../../redux/actions/displayActions';
import { useDispatch } from 'react-redux';

export default function Products() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(displayActions.showHeader(true));
    }, [dispatch]);
    return (
        <div className='products'>
            {shoes.map((shoe) => (
                <Product key={Math.random()} item={shoe} />
            ))}
        </div>
    );
}
