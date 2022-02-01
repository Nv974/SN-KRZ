const express = require('express');
const app = express();
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST);
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post('/stripe/charge', cors(), async (req, res) => {
    let { amount, id, client } = req.body;
    console.log('amount & id :>> ', amount, id);
    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            client,
            currency: 'EUR',
            description: 'Snikrz',
            payment_method: id,
            confirm: true,
        });

        res.json({
            message: 'Paiement réussi',
            success: true,
        });
    } catch (error) {
        console.log('Erreur lors de paiment ', error);
        res.json({
            message: 'Le paiment à échoué',
            success: false,
        });
    }
});

app.listen(process.env.PORT || 8080, () => {
    console.log('Serveur démaré port 8080');
});
