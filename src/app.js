var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const  config = require('./config')
const mercadopago = require("mercadopago");
var indexRouter = require('./routes/index');
var mercadopagoRouter = require('./routes/mercadopago');
var morgan = require('morgan')
var app = express();
mercadopago.configurations.setAccessToken(config.mercadopago.accesToken); 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('combined'))

app.use('/', indexRouter);
app.use('/mercadopago', mercadopagoRouter);

app.listen(config.server.port, () => {
    console.log(`The server is now running on Port ${config.server.port}`);
    console.log(`MP  ${config.mercadopago.accesToken}`);
  });

module.exports = app;
