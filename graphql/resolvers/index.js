// const eventAPI = require('./event');
// const userAPI = require('./user');


const bcrypt = require('bcryptjs')
const User = require('../../models/user');
const Event = require('../../models/event');

// Why use bind?
// By binding a function, we return a new function which can 
// be called later.

const getEventsByIds = async (eventIds) => {
    try {
        const events = await Event.find({ _id: { $in: eventIds } })
        return events.map(event => {
            return {
                ...event._doc,
                creator: getUserById.bind(this, event._doc.creator)
            }
        });
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const getUserById = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user)
            throw new Error('[GET USER BY ID] failed');
        return {
            ...user._doc,
            password: null,
            createdEvents: getEventsByIds.bind(this, user._doc.createdEvents)
        };
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const events = async () => {
    try {
        const events = await Event.find();
        return events.map(event => {
            return {
                ...event._doc,
                date: new Date(event._doc.date).toISOString(),
                creator: getUserById.bind(this, event._doc.creator)
            }
        });
    } catch (error) {
        console.error(err);
        throw err;
    }
}

const createEvent = async ({ eventInput: args }) => {
    try {
        const eventToSave = new Event({
            title: args.title,
            description: args.description,
            price: +args.price,
            date: new Date(args.date),
            creator: '5d1f91b982c2fa2634b52dc5'
        });

        let tempEvent = {};

        let event = await eventToSave.save();

        console.log('[CREATE EVENT] ', event);

        event = {
            ...event._doc,
            creator: getUserById.bind(this, event._doc.creator)
        }

        const user = await User.findById('5d1f91b982c2fa2634b52dc5');

        if (!user) {
            throw new Error('[CREATE EVENT] User not found!')
        }

        user.createdEvents.push(tempEvent._id);

        const updatedUser = await user.save()

        if (!updatedUser) {
            throw new Error('[CREATE EVENT] Could not update user');
        }

        return event;

    } catch (err) {
        console.error(err);
        throw err;
    }
}

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

module.exports = {
    events,
    createEvent,
    createUser,
}