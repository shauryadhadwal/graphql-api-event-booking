import React from 'react';
import './Bookings.css';
import BookingItem from './BookingItem';
import { useStateValue } from '../../contexts/state-context';

const BookingsList = (props) => {

    const [{ userId }] = useStateValue();

    const list = props.bookings.map(booking => {
        return (
            <BookingItem key={booking._id} booking={booking} userId={userId} onCancelBooking={props.onCancelBooking} />
        )
    });

    return (
        <ul className="bookings_ul">
            {list}
        </ul>
    )

};

export default BookingsList;