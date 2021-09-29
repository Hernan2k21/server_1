var express = require('express');
var router = express.Router();
var config = require('../config')
const mercadopago = require("mercadopago");
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


module.exports = router;
