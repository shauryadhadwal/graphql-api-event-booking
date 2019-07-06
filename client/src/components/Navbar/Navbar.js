import React from 'react';
import { Navbar, Nav, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavigationBar = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="mr-auto">
                <NavLink to="/bookings">Bookings</NavLink>
                <NavLink to="/events">Events</NavLink>
            </Nav>
            <Form inline>
                <NavLink to="/auth">Login</NavLink>
            </Form>
        </Navbar>
    )
}

export default NavigationBar;