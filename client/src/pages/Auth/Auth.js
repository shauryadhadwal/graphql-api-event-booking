import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import './Auth.css';
import Axios from 'axios';

const AuthPage = () => {

    const [isSignup, setIsSignup] = useState(true);

    const emailEl = useRef('poonamdhadwal@gmail.com');
    const passwordEl = useRef('qwerty');
    const confirmPasswordEl = useRef('qwerty');

    useEffect(() => {
        emailEl.current.focus();
        emailEl.current.value = 'shauryadhadwal@gmail.com';
        passwordEl.current.value = 'qwerty';
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const email = emailEl.current.value;
        const password = passwordEl.current.value;

        if (email.trim().length === 0 || password.trim().length === 0)
            return;

        const signUp = {
            query: `
                mutation {
                    createUser(userInput: {email:"${email}", password:"${password}"}){
                        email
                        _id
                    }
                }
            `
        };

        const login = {
            query: `
                query {
                    login(email:"${email}", password:"${password}")
                }
            `
        };

        const body = isSignup ? signUp : login;

        Axios.post('http://localhost:3000/graphql', JSON.stringify(body), {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div className="FormContainer">
            <h1>{isSignup ? 'SignUp' : 'Login'}</h1>
            <Form onSubmit={handleSubmit} className="Form">
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
                {isSignup ?
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control ref={confirmPasswordEl} type="password" placeholder="Password" required />
                    </Form.Group>
                    :
                    null
                }
                <Button variant="primary" type="submit" block>
                    {isSignup ? 'SignUp' : 'Login'}
                </Button>
            </Form>
            <hr />
            <p>Or switch to <span>
                <Button variant="light" onClick={() => {
                    setIsSignup(!isSignup)
                }}>
                    {isSignup ? 'Login' : 'SignUp'}
                </Button>
            </span>
            </p>
        </div>
    )
}

export default AuthPage;