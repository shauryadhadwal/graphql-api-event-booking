const Event = require('../../models/event');
const { transformEvent } = require('./merge');


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

module.exports = {
    events,
    createEvent,
}