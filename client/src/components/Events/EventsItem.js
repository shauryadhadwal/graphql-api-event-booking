import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ListItemWrapper = styled.li`
    display: box;
    width: 100%;
    box-shadow: 2px 2px 5px #bbb;
    margin: 20px 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    transition: transform .2s ease-in-out;

    :hover {
        transform: scale(1.02);
        // color: #CC4831;
    }
`;

const LeftContainer = styled.div`
    padding: 10px;
`;

const Price = styled.div`
    font-size: 2rem;
    font-weight: bold;
`;

const RightContainer = styled.div`
`;

const Owner = styled.div`
    width: 100px;
    height: 100%;
    text-align: center;
    background-color: #FFC107;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;

    :hover {
        background-color: #CC9B06;
    }
`;

const Details = styled.div`
    width: 50px;
    height: 100%;
    text-align: center;
    background-color: #FFC107;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;

    :hover {
        background-color: #CC9B06;
    }
`;

const EventItem = ({ event, userId, onDetailsClick }) => (
    <ListItemWrapper event-id={event._id}>
        <LeftContainer>
            <h3>
                {event.title}
            </h3>
            <Container>
                <Row>
                    <Col><Price>${event.price}</Price></Col>
                    <Col>
                        <FontAwesomeIcon icon={faCalendarAlt} size="1x" /> {new Date(event.date).toLocaleDateString('default', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </Col>
                </Row>
                <Row>
                    By: <u><i> {event.creator.email}</i></u>
                </Row>
            </Container>
        </LeftContainer>
        <RightContainer className="right-container">
            {userId && (
                event.creator._id === userId ?
                    <Owner>You are the owner of this event</Owner> :
                    <Details onClick={() => onDetailsClick(event)}>
                        <FontAwesomeIcon icon={faInfoCircle} size="2x" />
                    </Details>
            )}
        </RightContainer>
    </ListItemWrapper>
)

export default EventItem;