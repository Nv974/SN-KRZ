import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const PUBLIC_KEY =
    'pk_test_51KEtRwLtnZ8dBEqHuEIodqPrzZU56KrElJFVnqNcZYSUttfnBEj6BsGPBw5Eh9yl0SmD2ywtrn9bFQLtZQzixD5600EqEpDZKf';

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
    return (
        <Elements stripe={stripeTestPromise}>
            <CheckoutForm />
        </Elements>
    );
}
