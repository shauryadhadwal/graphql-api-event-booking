const bcrypt = require('bcryptjs')
const User = require('../../models/user');
const jwt = require('jsonwebtoken');

const createUser = async ({ userInput: args }) => {
    try {
        const hashedPassword = await bcrypt.hash(args.password, 12);
        const user = new User({
            email: args.email,
            password: hashedPassword,
        });

        const savedUser = await user.save();

        if (!savedUser) {
            throw new Error('[CREATE USER] Could not save user!');
        }

        return { ...savedUser._doc, password: null };

    } catch (err) {
        console.error(err);
        throw err;
    }
}

const login = async ({ email, password }) => {
    try {
        console.log(['LOGIN']);
        
        const user = await User.findOne({ email: email });
        
        if (!user) {
            throw new Error('The credentials do not match');
        }
        
        const isValid = await bcrypt.compare(password, user.password);
        
        if (!isValid) {
            throw new Error('The credentials do not match');
        }

        const payload = {
            userId: user.id,
            email: user.email
        }

        const token = jwt.sign(payload, process.env.JWT_KEY, {expiresIn: '1h'});
        
        return { userId: user.id, token: token, tokenExpiration: 1}

    } catch (err) {
        throw err;
    }
}

module.exports = {
    createUser,
    login
}