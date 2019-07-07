import React from 'react';
import { Button } from 'react-bootstrap';

const EventItem = ({ event, userId, onDetailsClick }) => (
    <li event-id={event._id} className="events_list-item">
        <div>
            <h3>
                {event.title}
            </h3>
            <p>Price: ${event.price} - {new Date(event.date).toLocaleDateString('default', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="right-container">
            {
                event.creator._id === userId ?
                    <p>You are the owner</p> :
                    <Button variant="warning" onClick={() => onDetailsClick(event)} block>Details</Button>
            }
        </div>
    </li>
)

export default EventItem;