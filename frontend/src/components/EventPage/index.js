import React, { Fragment, useState, useMemo } from "react";
import api from "../../services/api";
import camera from "../../assets/camera.png";
import { Container, Button, Form, FormGroup, Input, Label } from "reactstrap";
import "./EventPage.css";
const EventPage = ({history}) => {
  // const user_id = localStorage.getItem("user");
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [sport, setSport] = useState();
  const [thumbnail, setThumbnail] = useState(null);
  const [date, setDate] = useState();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);
  // console.log(title,description,price,sport,thumbnail,date)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user_id = localStorage.getItem("user");

    const eventData = new FormData();
    eventData.append("title", title);
    eventData.append("description", description);
    eventData.append("price", price);
    eventData.append("thumbnail", thumbnail);
    eventData.append("date", date);

    try {
      if (
        title !== "" &&
        description !== "" &&
        price !== "" &&
        sport !== "" &&
        date !== "" &&
        thumbnail !== null
      ) {
        console.log("Event has been SEND");
        await api.post("/event", eventData, { headers: { user_id } });
        console.log("Event has been CREATED OK");
		setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 2000);
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 2000);
        console.log("Missing required data");
      }
    } catch (error) {
      Promise.reject(error);
      console.log("error in create event", error);
    }
  };

  return (
    <Fragment>
      <Container>
        <h2>Create your Event</h2>
        <p>
          Please <strong>Login</strong> into your account
        </p>
        <Form onSubmit={handleSubmit} className="form">
          {error ? (
            <div className="event-validation" color="danger">
              Missing required information
            </div>
          ) : (
            ""
          )}
			{success ? (
            <div className="event-validation" color="danger">
              The evente was created successfully
            </div>
          ) : (
            ""
          )}
          <FormGroup>
            <Label>Upload Image: </Label>
            <Label
              id="thumbnail"
              style={{ backgroundImage: `url(${preview})` }}
              className={thumbnail ? "has-thumbnail" : ""}
            >
              <Input
                type="file"
                onChange={(evt) => setThumbnail(evt.target.files[0])}
              />
              <img
                src={camera}
                style={{ maxWidth: "50px" }}
                alt="upload icon image"
              />
            </Label>
          </FormGroup>
          <FormGroup>
            <Label>Title</Label>
            <Input
              type="title"
              name="title"
              placeholder="Your title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Description</Label>
            <Input
              type="description"
              name="description"
              placeholder="Your description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Sport</Label>
            <Input
              type="sport"
              name="sport"
              placeholder="Your sport"
              onChange={(e) => setSport(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Price</Label>
            <Input
              type="price"
              name="price"
              placeholder="Your Price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Date</Label>
            <Input
              type="date"
              name="date"
              placeholder="Your date"
              onChange={(e) => setDate(e.target.value)}
            />
          </FormGroup>
          <Button color="primary">Submit</Button>
		   <Button color="secondary" onClick={() => history.push("/dashboard")}>Dashboard</Button>
        </Form>
      </Container>
    </Fragment>
  );
};

export default EventPage;
