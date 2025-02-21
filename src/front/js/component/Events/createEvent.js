import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { Form, Button, Row, Col, Container, Card } from "react-bootstrap";
import MapContainer from "./mapContainer";
import "../../../styles/event.css";
import EventCard from "./eventCard";

export const CreateEvent = () => {
    const { store, actions } = useContext(Context);
    const [eventData, setEventData] = useState({
        title: "",
        budget: 0,
        startDate: new Date().toISOString().slice(0, 16) || Date.now().toISOString().slice(0, 16),
        endDate: new Date().toISOString().slice(0, 16) || Date.now().toISOString().slice(0, 16),
        description: "",
        markerPosition: "",
        address: "",
        place_name: "",
        typeEvent: "",
        event_type_name: "",
        errors: {},
        owner: {
            user_id: store.userAccount.id,
            profile_image: "",
            name: "John",
            last_name: "Doe",

        },
        placeholder: "Create"
    });
    const [eventType, setEventType] = useState([]);
    const [eventTypeId, setEventTypeId] = useState([]);



    useEffect(() => {
        actions.getEventTypes().then(types => {
            if (types) {
                const typesName = types.map(type => type.name);
                setEventType(typesName);
                setEventTypeId(types.map(type => type.id));
            }
        
        }
);

 getUserData();


    }, [store.userAccount.id]);

    const getUserData = async () => { await actions.getUserProfile(store.userAccount.id).then((userData) => {
        console.log(userData)
        setEventData(prevState => ({ 
            ...prevState, 
            owner: {
            profile_image: userData?.profile_image,
            name: userData?.name,
            last_name: userData?.last_name
        } }));
      
    })}

    const handleInputChange = e => {
        const { name, value } = e.target;
        console.log(name, value);
        console.log(eventData);
        setEventData(prevState => ({ ...prevState, [name]: value }));
        if (name === "typeEvent") {
            console.log(eventType[parseInt(value)]);
            setEventData(prevState => ({ ...prevState, event_type_name: eventType[parseInt(value)] }));
        }
    };

    const handleLocationSelect = location => {
        setEventData(prevState => ({ ...prevState, markerPosition: location.location }));
        setEventData(prevState => ({ ...prevState, address: location.address.address }));
        setEventData(prevState => ({ ...prevState, place_name: location.address.name || location.address.address }));
    };

    const validateForm = () => {
        const errors = {};
        const { title, typeEvent, startDate, endDate, description, markerPosition } = eventData;
        if (!title.trim()) errors.title = "Please enter event title";
        if (!typeEvent) errors.typeEvent = "Please select event type";
        if (!startDate) errors.startDate = "Please select start date";
        if (!endDate || new Date(endDate) <= new Date(startDate)) errors.endDate = "End date must be after start date";
        if (!description.trim()) errors.description = "Please enter event description";
        if (!markerPosition) errors.markerPosition = "Please select event location";
        setEventData(prevState => ({ ...prevState, errors }));
        return Object.keys(errors).length === 0;
    };

    const createEventHandler = async () => {
        if (!validateForm()) return;
        try {
            await actions.createEvent({
                ...eventData,
                event_type_id: eventTypeId[eventData.typeEvent]
            });
        } catch (error) {
            console.error("Error creating event:", error);
        }
    };

    const { title, budget, startDate, endDate, description, errors } = eventData;

    return (
        <Container fluid className="vh-100 d-flex align-items-start justify-content-center create-event">
            <Row className="w-100">
                <Col md={12} className="mt-3">
                    <h2 className="text-center">Create Event</h2>
                </Col>
                <Col md={12} className="mt-2">
                    <Card className="p-4 row flex-row h-100 container-card container-shadow">
                        <Col md={8} className="m-0 mb-2">
                            <Form.Group controlId="title">
                                <Form.Label>Event Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Give a name to your Event"
                                    name="title"
                                    value={title}
                                    onChange={handleInputChange}
                                />
                                {errors.title && <Form.Text className="text-danger">{errors.title}</Form.Text>}
                            </Form.Group>
                        </Col>
                        <Col md={4} className="m-0 mb-2">
                            <Form.Group controlId="typeEvent">
                                <Form.Label>Event Type</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="typeEvent"
                                    value={eventData.typeEvent}
                                    className={eventData.typeEvent === "" ? "select-placeholder" : ""}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select Event Type</option>
                                    {eventType.map((type, index) => (
                                        <option className="select-text" key={index} value={index}>
                                            {type}
                                        </option>
                                    ))}
                                </Form.Control>
                                {errors.typeEvent && <Form.Text className="text-danger">{errors.typeEvent}</Form.Text>}
                            </Form.Group>
                        </Col>

                        <Col md={12} className="mb-2">
                            <Form.Group controlId="budget">
                                <Form.Label className="d-flex justify-content-between">
                                    Budget <Form.Label className="m-0 pe-1">{budget} €</Form.Label>
                                </Form.Label>
                                <Form.Control
                                    type="range"
                                    min="0"
                                    max="100"
                                    step={10}
                                    name="budget"
                                    value={budget}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                        <Row className="pe-0 mb-2">
                            <Col md={6}>
                                <Form.Group controlId="startDate">
                                    <Form.Label>Start Date</Form.Label>
                                    <Form.Control
                                        type="datetime-local"
                                        name="startDate"
                                        value={startDate}
                                        className={startDate === "" ? "select-placeholder" : ""}
                                        onChange={handleInputChange}
                                    />
                                    {errors.startDate && <Form.Text className="text-danger">{errors.startDate}</Form.Text>}
                                </Form.Group>
                            </Col>
                            <Col md={6} className="pe-0">
                                <Form.Group controlId="endDate" className="pe-0 me-0">
                                    <Form.Label>End Date</Form.Label>
                                    <Form.Control
                                        type="datetime-local"
                                        name="endDate"
                                        value={endDate}
                                        className={endDate === "" ? "select-placeholder" : ""}
                                        onChange={handleInputChange}
                                    />
                                    {errors.endDate && <Form.Text className="text-danger">{errors.endDate}</Form.Text>}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Col md={12} className="mb-2">
                            <Form.Group controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    placeholder="Describe your event"
                                    name="description"
                                    value={description}
                                    onChange={handleInputChange}
                                />
                                {errors.description && <Form.Text className="text-danger">{errors.description}</Form.Text>}
                            </Form.Group>
                        </Col>
                        <Col md={12} className="mb-2">
                            <MapContainer selectedLocation={eventData.markerPosition} onLocationSelect={handleLocationSelect} />
                            {errors.markerPosition && <Form.Text className="text-danger">{errors.markerPosition}</Form.Text>}
                        </Col>
                    </Card>
                </Col>
                <EventCard event={eventData} handleClick={(e) => createEventHandler()} />
            </Row>
        </Container>
    );
};
