// dependencies
require('dotenv').config();
const CORS = require('cors');
const EXPRESS = require('express');
const EXPRESS_JWT = require('express-jwt');
const MORGAN = require('morgan');
const ROWDY_LOGGER = require('rowdy-logger');
// app and logger instantiation
const APP = EXPRESS();
const ROWDY_RESULTS = ROWDY_LOGGER.begin(APP);
// middleware config
APP.use(CORS());
APP.use(MORGAN('dev'));
APP.use(EXPRESS.urlencoded({ extended: false }));
APP.use(EXPRESS.json());
// ROUTES
APP.use('/auth', EXPRESS_JWT({
    secret: process.env.JWT_SECRET
}).unless({
    path: [
        { url: '/auth/login', methods: ['POST'] },
        { url: '/auth/signup', methods: ['POST'] }
    ]
}), require('./controllers/auth'));

APP.get('*', (req, res) => {
    res.status(404).send({ message: 'Not Found' })
});

APP.listen(process.env.PORT, () => {
    console.log(`Keeping it ${process.env.PORT}`)
    ROWDY_RESULTS.print()
});