const server = require('express').Router();
var mercadopago = require('mercadopago');
mercadopago.configure({
    access_token: 'TEST-4926040521089430-020418-dd73c243a9775d3a2a6e6f0b032b921c-115872473'
});

server.post('/', (req, res, next) => {
    const { purchaseAmount, title } = req.body
    var preference = {
        items: [{
            title,
            quantity: 1,
            currency_id: 'ARS',
            unit_price: parseInt(purchaseAmount)
        }],
        back_urls: {
            success: "http://localhost:3000/",
            failure: "http://localhost:3000/",
            pending: "http://localhost:3000/"
        },
        auto_return: "approved"
    };

    mercadopago.preferences.create(preference)
    .then(response => {
        res.json({url: response.body.init_point})
    })
})

module.exports = server;