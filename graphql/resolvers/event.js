const Event = require('../../models/event');
const User = require('../../models/user');
const { getUser } = require('./user');

// Why use bind?
// By binding a function, we return a new function which can 
// be called later.

const getEventsByIds = (eventIds) => {
    return Event.find({ _id: { $in: eventIds } })
        .then(events => { 
            return events.map(event => {
                return { ...event._doc, 
                creator : getUser.bind(this, event._doc.creator) }
            })
        })
        .catch(err => {
            console.error(err);
            throw err;
        });
}

const events = () => {
    return Event.find()
        .then(events => {
            return events.map(event => {
                return {
                    ...event._doc,
                    creator: getUser.bind(this, event._doc.creator)
                }
            });
        })
        .catch(err => {
            console.error(err);
            throw err;
        });
}

const createEvent = ({ eventInput: args }) => {
    const event = new Event({
        title: args.title,
        description: args.description,
        price: +args.price,
        date: new Date(args.date),
        creator: '5d1f91b982c2fa2634b52dc5'
    });

    let tempEvent = {};

    return event.save()
        .then(result => {
            console.log('[CREATE EVENT] ', result);
            tempEvent = { ...result._doc };
            return User.findById('5d1f91b982c2fa2634b52dc5')
        })
        .then(user => {
            if (!user) {
                throw new Error('[CREATE EVENT] User not found!')
            }
            user.createdEvents.push(tempEvent._id);
            return user.save()
        })
        .then(success => {
            console.log('[CREATE EVENT] Updated User.createdEvents');
            return tempEvent;
        })
        .catch(err => {
            console.error(err);
            throw err;
        });
}

module.exports = {
    events,
    createEvent,
    getEventsByIds
}
