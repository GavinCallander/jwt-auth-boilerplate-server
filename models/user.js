// dependencies
const BCRYPT = require('bcryptjs');
const MONGOOSE = require('mongoose');
// schema
let userSchema = new MONGOOSE.Schema({
    firstname: {
        type: String,
        required: [true, 'First name is a required field'],
        minlength: [1, 'First name must be at least 1 character']
    },
    lastname: {
        type: String,
    },
    username: {
        type: String,
        required: [true, 'Username is a required field'],
        unique: [true, 'Username already in use'],
        minlength: [1, 'Username must be at least 1 character']
    },
    email: {
        type: String,
        required: [true, 'Email is a required field'],
        unique: [true, 'Email already in use'],
        minlength: [5, 'Email must be at least 5 characters']
    },
    password: {
        type: String,
        required: [true, 'Password is a required field'],
        minlength: [8, 'Password must be at least 8 characters']
    }
});
// hash password with bcrypt
userSchema.pre('save', function(next) {
    this.password = BCRYPT.hashSync(this.password, 12)
    next()
});
// remove password from user object
userSchema.set('toJSON', {
    transform: (doc, user) => {
        delete user.password
        return user
    }
});
// helper function for passwod hash comparison
userSchema.methods.isAuthenticated = function(typedPassword) {
    return BCRYPT.compareSync(typedPassword, this.password)
};

module.exports = MONGOOSE.model('User', userSchema);