const Event = require('../../models/event');
const User = require('../../models/user');
const { transformEvent } = require('./merge');
const log = require('../../helpers/logger');

const events = async () => {
    log.event('FETCH EVENTS');
    try {
        const events = await Event.find();
        return events.map(event => transformEvent(event));
    } catch (error) {
        console.error(err);
        throw err;
    }
}

const createEvent = async (args, req ) => {
    log.event('CREATE EVENT');
    if(!req.isAuth){
        throw new Error('Not Authenticated!');
    }
    try {
        const eventToSave = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: req.userId
        });

        let event = await eventToSave.save();

        event = transformEvent(event);

        const user = await User.findById(req.userId);

        if (!user) {
            throw new Error('[CREATE EVENT] User not found!')
        }

        user.createdEvents.push(event._id);

        const updatedUser = await user.save()

        if (!updatedUser) {
            throw new Error('[CREATE EVENT] Could not update user');
        }

        log.data(`EVENT: ${event.title} USER: ${user.email}`);
        return event;

    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports = {
    events,
    createEvent,
}