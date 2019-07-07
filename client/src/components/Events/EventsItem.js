import React from 'react';
import {Button} from 'react-bootstrap';

const EventItem = ({event, userId}) => (
    <li event-id={event._id} className="events_list-item">
        <div>
            <h3>
            {event.title}
            </h3>
            <p>Price: {event.price}$</p>
        </div>
        <div>
            <Button>View Details</Button>
            {event.creator._id === userId && <p>You are the owner</p>}
        </div>
    </li>
)

export default EventItem;