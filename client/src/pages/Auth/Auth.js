import React, { useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import './Auth.css';
import Axios from 'axios';

const AuthPage = () => {

    const emailEl = useRef('poonamdhadwal@gmail.com');
    const passwordEl = useRef('qwerty');

    useEffect(() => {
        emailEl.current.focus();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const email = emailEl.current.value;
        const password = passwordEl.current.value;

        if (email.trim().length === 0 || password.trim().length === 0)
            return;

        const body = {
            query: `
                mutation {
                    createUser(userInput: {email:"${email}", password:"${password}"}){
                        email
                        _id
                    }
                }
            `
        };
        Axios.post('http://localhost:3000/graphql',JSON.stringify(body), {
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });

    }

    return (
        <div className="FormContainer">
            <h1>Sign In Page</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control ref={emailEl} type="email" placeholder="Enter email" required />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control ref={passwordEl} type="password" placeholder="Password" required />
                </Form.Group>
                <Form.Group controlId="formBasicChecbox">
                    <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>
                <Button variant="primary" type="submit" block>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default AuthPage;