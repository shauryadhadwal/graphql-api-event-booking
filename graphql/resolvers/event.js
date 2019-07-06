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

const createEvent = async (args, req ) => {
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

        let tempEvent = {};

        let event = await eventToSave.save();

        console.log('[CREATE EVENT] ', event);

        event = transformEvent(event);

        const user = await User.findById(req.userId);

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