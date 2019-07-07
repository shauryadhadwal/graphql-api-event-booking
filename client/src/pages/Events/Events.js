import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Axios from 'axios';
import { useStateValue } from '../../contexts/state-context';

const EventsPage = (props) => {

    const [isOpen, setIsOpen] = useState(false);
    const [eventForm, setEventForm] = useState({
        title: '',
        description: '',
        price: '',
        date: ''
    });
    const [{ token }] = useStateValue();

    const onChangeHandler = (event) => {
        if (!event || !event.target)
            return;
        const newState = { ...eventForm };
        newState[event.target.name] = event.target.value;
        setEventForm(newState);
    }

    const formName = "eventForm";

    const postBody = {
        query: `
        mutation{
            createEvent(eventInput: {title: "${eventForm.title}", description: "${eventForm.description}", price: ${eventForm.price}, date: "${eventForm.date}"}){
                title
                creator{
                    email
                }
                date
                price
            }
        }
        `
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        setIsOpen(false);

        //Validate the form
        Axios.post("http://localhost:3000/graphql", JSON.stringify(postBody),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(res => {

                console.log(res);
                return res;
            })
            .catch(err => {
                console.log(err);
            });

    };

    return (
        <React.Fragment>
            <h1>Events</h1>
            {
                token ?
                    <React.Fragment>

                        <Button onClick={() => setIsOpen(true)}>Create</Button>
                        <Modal
                            show={isOpen}
                            onHide={() => setIsOpen(false)}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered>
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    Create A New Event
                    </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={onSubmitHandler} className="Form" id={formName}>
                                    <Form.Group controlId="title">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control name="title" type="text" required onChange={onChangeHandler} />
                                    </Form.Group>
                                    <Form.Group controlId="description">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control name="description" type="text" required onChange={onChangeHandler} />
                                    </Form.Group>
                                    <Form.Group controlId="price">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control name="price" type="number" required onChange={onChangeHandler} />
                                    </Form.Group>
                                    <Form.Group controlId="date">
                                        <Form.Label>Date</Form.Label>
                                        <Form.Control name="date" type="date" required onChange={onChangeHandler} />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={() => setIsOpen(false)}>Close</Button>
                                <Button form={formName} type="submit">Submit</Button>
                            </Modal.Footer>
                        </Modal>
                    </React.Fragment>
                    : null
            }
        </React.Fragment>

    )
}

export default EventsPage;