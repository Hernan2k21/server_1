const dotenv = require('dotenv')

dotenv.config()

const config = {
    mercadopago:{
        accesToken: process.env.MERCADOPAGO_ACCES_TOKEN,
        backUrls: {
            succes:process.env.SUCCES_CALLBACK_URL,
            pending:process.env.PENDING_CALLBACK_URL,
            failure:process.env.FAILURE_CALLBACK_URL
        }
    },
    server:{
        port: process.env.PORT
    }
}

module.exports = config