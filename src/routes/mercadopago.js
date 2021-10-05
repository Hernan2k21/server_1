var express = require('express');
var router = express.Router();
var config = require('../config')
const mercadopago = require("mercadopago");

//checkout pro
router.post("/create_preference", (req, res) => {
  const {description, price, quantity} = req.body

	let preference = {
		items: [{
			title: description,
			unit_price: Number(price),
			quantity: Number(quantity),
		}],
		back_urls: {
			"success": config.mercadopago.backUrls.succes,
			"failure": config.mercadopago.backUrls.failure,
			"pending": config.mercadopago.backUrls.pending
		},
		auto_return: 'approved',
	};

	mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json({id :response.body.id,
			complete_res: response.body})
		}).catch(function (error) {
			res.json({
				"error":error
			});
		});
});

router.get('/feedback', function(request, response) {
	 response.json({
		Payment: request.query.payment_id,
		Status: request.query.status,
		MerchantOrder: request.query.merchant_order_id
	})
});

// checkout api
router.post('/process_payment', (req, res) => {
	//console.log("Body", req.body)
	const {transaction_amount, token, description, installments, payment_method_id, issuer_id, payer}  = req.body
	const payment_data = {
		transaction_amount: Number(transaction_amount),
		token: token,
		description: description,
		installments: Number(installments),
		payment_method_id: payment_method_id,
		issuer_id:  issuer_id,
		payer: {
			email: payer.email,
			identification: {
			type: payer.identification.type,
			number: payer.identification.number
		}
		}
	};
console.log(payment_data)
mercadopago.payment.save(payment_data)
    .then(function(response) {
		//console.log(response)
    res.status(response.status).json({
		status: response.body.status,
		status_detail: response.body.status_detail,
		id: response.body.id
    });
})
.catch(function(error) {
	res.status(400).send(error);
});
})
module.exports = router;
