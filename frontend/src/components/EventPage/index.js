import React, { Fragment, useState, useMemo } from "react";
import api from "../../services/api";
import camera from "../../assets/camera.png";
import {
  Container,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import "./EventPage.css";
export default function EventPage({ history }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [sport, setSport] = useState("Sport")
  const [thumbnail, setThumbnail] = useState(null)
  const [date, setDate] = useState("")
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user_id = localStorage.getItem("user");

    const eventData = new FormData();

    eventData.append("title", title)
    eventData.append("description", description)
    eventData.append("price", price)
    eventData.append("sport", sport)
    eventData.append("thumbnail", thumbnail)
    eventData.append("date", date)

    try {
      if (
          title !== "" &&
          description !== "" &&
          price !== "" &&
          sport !== "Sport" &&
          date !== "" &&
          thumbnail !== null
      ) {
        await api.post("/event", eventData, { headers: { user_id } })
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
          history.push("/")
        }, 2000);
      } else {
        setError(true)
        setTimeout(() => {
          setError(false)
        }, 2000)
      }
    } catch (error) {
      Promise.reject(error);
      console.log("error in create event", error);
    }
  };

  const sportEventHandler = (sport) =>setSport(sport)

      
  return (<Fragment>
      <Container>
        <h2>Create your Event</h2>
        <p>
          Please <strong>Login</strong> into your account
        </p>
        <Form onSubmit={handleSubmit} className="form">
          {error ? (<div className="event-validation" color="danger">Missing required information</div>) : ("")}
          {success ? (<div className="event-validation" color="danger">The evente was created successfully</div>) : ("")}
          <FormGroup>
            <Label>Upload Image: </Label>
            <Label
              id="thumbnail"
              style={{ backgroundImage: `url(${preview})` }}
              className={thumbnail ? "has-thumbnail" : ""}
            >
              <Input
                type="file"
                onChange={(e) => setThumbnail(e.target.files[0])}
              />
              <img
                src={camera}
                style={{ maxWidth: "50px" }}
                alt="upload icon image"
              />
            </Label>
          </FormGroup>
          {/**<FormGroup>
          <Label>type </Label>
          <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret value={sport} color="primary">
              {sport}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>SPORT</DropdownItem>
              <DropdownItem onClick={() => sportEventHandler("camisas")}>camisas</DropdownItem>
              <DropdownItem onClick={() => sportEventHandler("remeras")}>remeras</DropdownItem>
              <DropdownItem onClick={() => sportEventHandler("pantalones")}>pantalones</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </FormGroup>**/}
                <FormGroup>
            <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                <Button id="caret" value={sport} disabled>{sport}</Button>
                <DropdownToggle caret />
                <DropdownMenu>
                     <DropdownItem onClick={() => sportEventHandler('camisas')}>camisas</DropdownItem>
                    <DropdownItem onClick={() => sportEventHandler('remeras')}>remeras</DropdownItem>
                    <DropdownItem onClick={() => sportEventHandler('pantalones')}>pantalones</DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>
        </FormGroup>
          <FormGroup>
            <Label>Title</Label>
            <Input
              type="text"
              id="title"
              value={title}
              placeholder={"Your title"}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Description</Label>
            <Input
              type="text"
              id="description"
              value={description}
              placeholder={"Your description"}
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
            <Label>Price</Label>
            <Input
              type="text"
              id="price"
              value={price}
              placeholder={"Your Price"}
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Date</Label>
            <Input
              type="date"
              id="date"
              value={date}
              placeholder={"Your date"}
              onChange={(e) => setDate(e.target.value)}
            />
          </FormGroup>
          <Button color="primary">Submit</Button>
          <Button color="secondary" onClick={() => history.push("/")}>
            Cancel
          </Button>
        </Form>
      </Container>
    </Fragment>);
}
