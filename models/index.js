// dependencies
const MONGOOSE = require('mongoose');

MONGOOSE.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

module.exports.User = require('./user');