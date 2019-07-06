const bcrypt = require('bcryptjs')
const User = require('../../models/user');
const { getEventsByIds } = require('./event');

const getUser = (userId) => {
    return User.findById(userId)
        .then(user => {
            if (!user)
                throw Error;
            return {
                ...user._doc,
                password: null,
                createdEvents: getEventsByIds.bind(this, user._doc.createdEvents)
            };
        })
        .catch(err => {
            console.error(err);
        })
}

const createUser = ({ userInput: args }) => {
    return bcrypt.hash(args.password, 12).then(hashed => {
        const user = new User({
            email: args.email,
            password: hashed,
        });
        return user.save()
            .then(result => {
                console.log('[CREATE USER]: ', result);
                return { ...result._doc, password: null };
            })
            .catch(err => {
                console.error(err);
                throw err;
            });

    }).catch();
}

module.exports = {
    createUser,
    getUser
}