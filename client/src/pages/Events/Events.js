import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import { useStateValue } from '../../contexts/state-context';
import EventsList from '../../components/Events/EventsList';
import CreateEvent from '../../components/Events/CreateEvent';
import EventDetails from '../../components/Events/EventDetails';
import Spinner from '../../components/Spinner/Spinner';
import './Events.css';

const EventsPage = (props) => {

    const [{ token, userId }] = useStateValue();
    const [isOpen, setIsOpen] = useState(false);
    const [events, setEvents] = useState([]);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [detailsEvent, setDetailsEvent] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        const postBody = {
            query: `
                query {
                    events{
                        _id
                        title
                        price
                        date
                        creator{
                            _id
                            email
                        }
                    }
                }
            `
        }

        const response = await Axios.post("http://localhost:3000/graphql", JSON.stringify(postBody),
            {
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        );

        if (!response.data.data.errors) {
            setEvents(response.data.data.events);
        }
    }

    const onCreateEventhandler = async (formState) => {
        setIsOpen(false);

        const postBody = {
            query: `
            mutation{
                createEvent(eventInput: {title: "${formState.title}", description: "${formState.description}", price: ${formState.price}, date: "${formState.date}"}){
                    _id
                    title
                    price
                    date
                }
            }
        `
        }
        //Validate the form
        let { data: { data: { createEvent: newEvent } } } = await Axios.post("http://localhost:3000/graphql", JSON.stringify(postBody),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });

        newEvent = {
            ...newEvent,
            creator: {
                _id: userId,
            }
        }

        setEvents([
            ...events,
            newEvent
        ])
    };

    const onHideHandler = () => {
        setIsOpen(false);
    }

    const onHideDetailsHandler = () => {
        setIsDetailsOpen(false);
        setDetailsEvent(null);
    }

    const onDetailsClickHandler = (event) => {
        setDetailsEvent(event);
        setIsDetailsOpen(true);
    }

    const onBookEventHandler = async (eventId) => {
        console.log(eventId);
        const postBody = {
            query: `
            mutation{
                bookEvent(eventId: "${eventId}"){
                    _id
                }
            }
        `
        };
        try {
            let { data: { data: { bookEvent: booking } } } = await Axios.post("http://localhost:3000/graphql", JSON.stringify(postBody),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                });

        console.log(booking);

        } catch (error) {
            console.error('[Book Event]');
        }
    }

    return (
        <React.Fragment>
            <div className="events_header">
                <div className="heading-container">
                    Events
                </div>
                <div className="button-container">
                    {token && <Button size="lg" onClick={() => setIsOpen(true)}>Create</Button>}
                </div>
            </div>
            {token && <CreateEvent onSubmit={onCreateEventhandler} onHide={onHideHandler} isOpen={isOpen} />}
            {events.length > 0 ? <EventsList events={events} onDetailsClick={onDetailsClickHandler} /> : <Spinner />}
            {detailsEvent && <EventDetails onHide={onHideDetailsHandler} isOpen={isDetailsOpen} event={detailsEvent} userId={userId} onBookEvent={onBookEventHandler} />}

        </React.Fragment>
    )
}

export default EventsPage;