import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CreateEvent = (props) => {

    const [formState, setFormState] = useState({
        title: '',
        description: '',
        price: '',
        date: ''
    });

    const onChangeHandler = (event) => {
        if (!event || !event.target)
            return;
        const newState = { ...formState };
        newState[event.target.name] = event.target.value;
        setFormState(newState);
    }

    const formName = "event-form";

    const onSubmitHandler = (event) => {
        event.preventDefault();
        props.onSubmit(formState);
    };

    return (
            <Modal
                show={props.isOpen}
                onHide={props.onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create A New Event
                            </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onSubmitHandler} id={formName}>
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
                    <Button onClick={props.onHide}>Close</Button>
                    <Button form={formName} type="submit">Submit</Button>
                </Modal.Footer>
            </Modal>
    )

}

export default CreateEvent;