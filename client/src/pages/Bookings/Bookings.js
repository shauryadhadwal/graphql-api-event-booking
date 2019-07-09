import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useStateValue } from '../../contexts/state-context';
import Spinner from '../../components/Spinner/Spinner';
import BookingsList from '../../components/Bookings/BookingsList';
import './Bookings.css';

const BookingsPage = () => {

    const [{ token }] = useStateValue();
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        const requestBody = {
            query: `
                query {
                    bookings{
                        _id
                        createdAt
                        event{
                            title
                        }
                        user{
                            _id
                        }
                    }
                }
            `
        }

        const response = await Axios.post("http://localhost:3000/graphql", JSON.stringify(requestBody),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            }
        );

        console.log(response)

        if (!response.data.data.errors) {
            setBookings(response.data.data.bookings);
        }

    }

    const onCancelBookingHandler = async (bookingId) => {
        console.log(bookingId)
        const requestBody = {
            query: `
                mutation CancelBooking($bookingId: ID!){
                    cancelBooking(bookingId: $bookingId){
                        title
                    }
                }
            `,
            variables: {
                bookingId: bookingId
            }
        }

        const response = await Axios.post("http://localhost:3000/graphql", JSON.stringify(requestBody),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            }
        );

        console.log(response);

        const index = bookings.findIndex(booking => booking._id === bookingId);

        setBookings([...bookings.slice(0, index), ...bookings.slice(index + 1, )]);
    }

    return (
        <React.Fragment>
            <h1>Bookings Page</h1>
            {
                bookings.length > 0 ?
                    <BookingsList bookings={bookings} onCancelBooking={onCancelBookingHandler} /> :
                    <Spinner />
            }
        </React.Fragment>

    )
}

export default BookingsPage;