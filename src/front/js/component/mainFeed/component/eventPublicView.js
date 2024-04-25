import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Card, Button } from 'react-bootstrap';
import "../../../../styles/event.css";
import { Context } from "../../../store/appContext";
import { Link } from "react-router-dom";

export const EventPublicView = () => {
    const { store, actions } = useContext(Context);
    const [buttonStates, setButtonStates] = useState({});
    console.log(store.publicEvents)

    useEffect(() => {
        let token = localStorage.getItem("token");
        actions.getPublicEvents(token);
    }, []);

  

    return (
        <>
            <Row className="flex-column">
                {store.publicEvents.reverse().map((item, index) => (
                    <Col xs={12} className="mb-3" key={index}>
                        <Link to={`/event-view/${item.id}`}>
                            <Card className="h-100">
                                <Card.Body>
                                    <Row className="justify-content-between">
                                        <Col xs={9}>
                                            <Card.Title className="p-3"><h4>{item.name}</h4></Card.Title>
                                        </Col>
                                        <Col xs={3}>
                                            <Button
                                                variant="primary"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Evita que el clic se propague al Link
                                                    // Lógica para agregar a favoritos
                                                    // actions.addFavouriteEvent(item.id);
                                                }}
                                            >
                                                {"Add to favorites"}
                                            </Button>
                                        </Col>
                                        <Row id="event-userRow" className="mt-2 ms-1">
                                            <Col xs={2}>
                                                <Card.Title className="p-3"><img className="rounded-circle" src={item.owner.profile_image} style={{ width: "100px", height: "100px", objectFit: "cover" }} /></Card.Title>
                                            </Col>
                                            <Col xs={4} id="event-cardUserName">
                                                <Card.Title >{item.owner.name}</Card.Title>
                                            </Col>
                                            <Col xs={4} id="event-userButton">
                                                <Button
                                                    variant="secondary"
                                                // onClick={() => actions.addFavouriteEvent(item.id)}
                                                >
                                                    {"Visit Profile"}
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Row>
                                    <Card.Text>
                                        <label>Event Location:</label>
                                        <p>{item.location}</p>
                                        <label>Event Schedule:</label>
                                        <p>{item.start_date}, {item.start_time}-{item.end_time}</p>
                                        <label>Event description:</label>
                                        <p>{item.description}</p>
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className="border"></Card.Footer>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    );
};