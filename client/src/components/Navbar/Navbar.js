import React from 'react';
import { Navbar, Nav, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useStateValue } from '../../contexts/state-context';
import './Navbar.css';

const NavigationBar = () => {

    const [{ token }] = useStateValue();

    return (
        <Navbar bg="dark" variant="dark" fixed="top">
            <Navbar.Brand>What's New?</Navbar.Brand>
            <Nav className="mr-auto" variant="pills">
                <NavLink className="NavLink" to="/bookings">Bookings</NavLink>
                <NavLink className="NavLink" to="/events">Events</NavLink>
            </Nav>
            <Form inline>
                {token ?
                    <NavLink to="/logout">Logout</NavLink>
                    :
                    <NavLink to="/auth">Login</NavLink>
                }
            </Form>
        </Navbar>
    )
}

export default NavigationBar;