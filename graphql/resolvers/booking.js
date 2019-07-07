const Booking = require('../../models/booking');
const { transformBooking, transformEvent } = require('./merge');
const mongoose = require('mongoose');
const log = require('../../helpers/logger');

const bookings = async (args, req) => {
    log.event('FETCH BOOKINGS');

    if(!req.isAuth){
        throw new Error('Not Authenticated!');
    }
    try {
        const bookings = await Booking.find();
        return bookings.map(booking => transformBooking(booking));
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const bookEvent = async (args, req) => {
    log.event('BOOK EVENT');
    
    if(!req.isAuth){
        throw new Error('Not Authenticated!');
    }
    try {
        const booking = await new Booking({
            user: req.userId,
            event: args.eventId
        });

        const result = await booking.save();

        return transformBooking(result);
        
    } catch (err) {
        console.error(err);
        throw err;
    }

}
const cancelBooking = async (args, req) => {
    log.event('CANCEL BOOKING');
    log.data(args.bookingId);

    if(!req.isAuth){
        throw new Error('Not Authenticated!');
    }
    try {
        const booking = await Booking.findOne({ _id: args.bookingId }).populate('event');

        await Booking.deleteOne({ _id: args.bookingId });

        return transformEvent(booking.event);

    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports = {
    bookings,
    bookEvent,
    cancelBooking
}