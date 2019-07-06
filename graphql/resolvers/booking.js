const Booking = require('../../models/booking');
const { transformBooking, transformEvent } = require('./merge');

const bookings = async (args, req) => {
    if(!req.isAuth){
        throw new Error('Not Authenticated!');
    }
    try {
        const bookings = await Booking.find();
        return bookings.map(booking => transformBooking(booking))
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const bookEvent = async (eventId, req) => {
    if(!req.isAuth){
        throw new Error('Not Authenticated!');
    }
    try {
        const booking = await new Booking({
            user: '5d1f91b982c2fa2634b52dc5',
            event: eventId
        });

        const result = await booking.save();

        return transformBooking(result);
        
    } catch (err) {
        console.error(err);
        throw err;
    }

}
const cancelBooking = async (bookingId, req) => {
    if(!req.isAuth){
        throw new Error('Not Authenticated!');
    }
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

module.exports = {
    bookings,
    bookEvent,
    cancelBooking
}