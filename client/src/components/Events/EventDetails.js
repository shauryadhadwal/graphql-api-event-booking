import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const EventDetails = (props) => {

    return (
        <Modal
            size="lg"
            onHide={props.onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.isOpen}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.event.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h2>{props.event.price}</h2>
                <p>{props.event.description}</p>
            </Modal.Body>
            <Modal.Footer>
                {props.userId && <Button onClick={() => props.onBookEvent(props.event._id)}>Book</Button>}
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EventDetails;