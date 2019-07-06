const bcrypt = require('bcryptjs')
const User = require('../../models/user');
const Event = require('../../models/event');
const Booking = require('../../models/booking');

// Why use bind?
// By binding a function, we return a new function which can 
// be called later.

const transformEvent = event => {
    return {
        ...event._doc,
        date: new Date(event._doc.date).toISOString(),
        creator: getUserById.bind(this, event._doc.creator)
    }
}

const getEventsByIds = async (eventIds) => {
    try {
        const events = await Event.find({ _id: { $in: eventIds } });
        if (!events) {
            throw new Error('[GET EVENTS BY IDS] failed!')
        }
        return events.map(event => transformEvent(event));
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const getEventById = async (eventId) => {
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            throw new Error('[GET EVENT] Event not found!');
        }
        return transformEvent(event);

    } catch (err) {
        console.error(err);
        throw new err;
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
        return events.map(event => transformEvent(event));
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

        event = transformEvent(event);

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

const bookings = async () => {
    try {
        const bookings = await Booking.find();
        return bookings.map(booking => {
            return {
                ...booking._doc,
                createdAt: new Date(booking._doc.createdAt).toISOString(),
                updatedAt: new Date(booking._doc.updatedAt).toISOString(),
                user: getUserById.bind(this, booking._doc.user),
                event: getEventById.bind(this, booking._doc.event)
            }
        })
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const bookEvent = async ({ eventId }) => {
    try {
        const booking = await new Booking({
            user: '5d1f91b982c2fa2634b52dc5',
            event: eventId
        });

        const result = await booking.save();

        return {
            ...result._doc,
            createdAt: new Date(result._doc.createdAt).toISOString(),
            updatedAt: new Date(result._doc.updatedAt).toISOString(),
            user: getUserById.bind(this, result._doc.user),
            event: getEventById.bind(this, result._doc.event)
        }
    } catch (err) {
        console.error(err);
        throw err;
    }

}
const cancelBooking = async ({ bookingId }) => {
    try {
        console.log(bookingId);
        const booking = await Booking.findOne({ _id: bookingId }).populate('event');
        console.log(booking);

        await Booking.deleteOne({ _id: bookingId });

        return transformEvent(booking.event);

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
    bookings,
    createEvent,
    createUser,
    bookEvent,
    cancelBooking
}