import React from 'react';
import { Button } from 'react-bootstrap';

const BookingItem = ({ booking, userId, onCancelBooking }) => (
    <li booking-id={booking._id} className="bookings_list-item">
        <div>
            <h3>
                {booking.event.title}
            </h3>
            <p>Booking made on: {new Date(booking.createdAt).toLocaleDateString('default', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="right-container">
            {
                <Button variant="warning" onClick={() => onCancelBooking(booking._id)} block>Cancel</Button>
            }
        </div>
    </li>
)

export default BookingItem;