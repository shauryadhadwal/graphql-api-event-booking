const DataLoader = require('dataLoader');
const Event = require('../../models/event');
const User = require('../../models/user');
const log = require('../../helpers/logger');

const EventLoader = new DataLoader((eventIds) => {
    log.event('EVENT LOADER');
    log.data(eventIds);
    return Event.find({ _id: { $in: eventIds } });
});

const UserLoader = new DataLoader((userIds) => {
    log.event('USER LOADER');
    log.data(userIds);
    return User.find({_id: {$in: userIds}});
});

const transformBooking = booking => {
    return {
        ...booking._doc,
        createdAt: new Date(booking._doc.createdAt).toISOString(),
        updatedAt: new Date(booking._doc.updatedAt).toISOString(),
        user: getUserById.bind(this, booking._doc.user),
        event: getEventById.bind(this, booking._doc.event)
    }
}

const transformEvent = event => {
    return {
        ...event._doc,
        date: new Date(event._doc.date).toISOString(),
        creator: getUserById.bind(this, event._doc.creator)
    }
}

const getEventsByIds = async (eventIds) => {
    try {
        const events = await EventLoader.loadMany(eventIds);
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
        const event = await EventLoader.load(eventId.toString());

        if (!event) {
            throw new Error('[GET EVENT] Event not found!');
        }
        return event;

    } catch (err) {
        console.error(err);
        throw new err;
    }
}

const getUserById = async (userId) => {
    try {
        const user = await UserLoader.load(userId.toString());
        if (!user)
            throw new Error('[GET USER BY ID] failed');
        return {
            ...user._doc,
            password: null,
            createdEvents: EventLoader.loadMany.bind(this, user._doc.createdEvents)
        };
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports = {
    getEventById,
    getEventsByIds,
    getUserById,
    transformEvent,
    transformBooking
}