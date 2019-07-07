import React from 'react';
import './Events.css';
import EventItem from './EventsItem';
import {useStateValue} from '../../contexts/state-context';

const EventsList = (props) => {

    const [{userId}] =  useStateValue();

    console.log(userId);

    const list = props.events.map(event => {
        return (
            <EventItem key={event._id} event={event} userId={userId}/>
        )
    });

    return (
        <ul className="events_ul">
            {list}
        </ul>
    )
    
};

export default EventsList;