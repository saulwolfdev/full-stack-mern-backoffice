import React, { Fragment, useState, useMemo } from "react";
import api from "../../services/api";
import camera from "../../assets/camera.png";
import { Container, Button, Form, FormGroup, Input, Label,ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

import "./EventPage.css";
const EventPage = ({ history }) => {
  // const user_id = localStorage.getItem("user");
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [sport, setSport] = useState("Sport");
  const [thumbnail, setThumbnail] = useState(null);
  const [date, setDate] = useState();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

const [dropdownOpen, setOpen] = useState(false);
const toggle = () => setOpen(!dropdownOpen);

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
    eventData.append("sport", sport);
    eventData.append("thumbnail", thumbnail);
    eventData.append("date", date);

    try {
      if (
        title !== "" &&
        description !== "" &&
        price !== "" &&
        sport !== "Sport" &&
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
   
   const sportEventHandler=(sport)=>{
	   setSport(sport);
	 
   }
     console.log("XXX",sport)
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
              type="text"
              name="title"
              placeholder="Your title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              placeholder="Your description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormGroup>
          {/* <FormGroup>
            <Label>Sport</Label>
            <Input
              type="text"
              name="sport"
              placeholder="Your sport"
              onChange={(e) => setSport(e.target.value)}
            />
          </FormGroup> */}
			<FormGroup>
			<Label>type </Label>
            <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle caret value={sport} color="primary">{sport}</DropdownToggle>
              <DropdownMenu>
				 <DropdownItem header>SPORT</DropdownItem>
                <DropdownItem  onClick={()=>sportEventHandler("camisas")}>camisas</DropdownItem>
                <DropdownItem  onClick={()=>sportEventHandler("remeras")}>remeras</DropdownItem>
                <DropdownItem  onClick={()=>sportEventHandler("pantalones")}>pantalones</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </FormGroup>
          <FormGroup>
            <Label>Price</Label>
            <Input
              type="text"
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
          <Button color="secondary" onClick={() => history.push("/")}>
            Dashboard
          </Button>
        </Form>
      </Container>
    </Fragment>
  );
};

export default EventPage;
