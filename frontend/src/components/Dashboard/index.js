import React, { Fragment, useEffect, useState } from "react";
import moment from "moment";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  ButtonGroup,
} from "reactstrap";
import api from "../../services/api";
const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const user_id = localStorage.getItem("user");
   const [cSelected, setCSelected] = useState([]);
    const [rSelected, setRSelected] = useState(null);
  useEffect(() => {
    getEvents();
  }, []);

 const filterHandler=(query)=>{
	 setRSelected(query)
	 getEvents(query)
 }
  const getEvents = async (filter) => {
    const url = filter ? `/dashboard/${filter}` : "/dashboard";
    const response = await api.get(url, { headers: { user_id } });
    setEvents(response.data);
  };
  console.log("list ", events);
  return (
    <Fragment>
      <Container>
		<ButtonGroup>
				<Button color="primary" onClick={() => filterHandler(null)} active={rSelected === null}>All Sports</Button>
				<Button color="primary" onClick={() => filterHandler("running")} active={rSelected === 'running'}>Running</Button>
				<Button color="primary" onClick={() => filterHandler("Hunter")} active={rSelected === 'Hunter'}>Hunter</Button>
				<Button color="primary" onClick={() => filterHandler('flying')} active={rSelected === 'flying'}>Flying</Button>
		</ButtonGroup>
        <Row>
          {events.map((event) => {
            return (
              <Col key={event._id} sm="3">
                <Card style={{ minHeight: "370px", marginBottom: "15px" }}>
                  <CardImg
                    top
                    width="100%"
                    style={{ diplay: "block" }}
                    src={event.thumbnail_url}
                    alt="Card image cap"
                  />
                  <CardBody>
                    <CardTitle>{event.title}</CardTitle>
                    <CardSubtitle>
                      {parseFloat(event.price).toFixed(2)}
                    </CardSubtitle>
                    <CardText>{event.description}</CardText>
					<CardText>{event.sport}</CardText>
                    <CardText>{moment(event.date).format("L")}</CardText>
                    <Button>Pay</Button>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </Fragment>
  );
};

export default Dashboard;
