import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalContainer = (props) => {
    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.heading}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button onClick={props.onSubmit} form={props.formName}>Submit</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalContainer;