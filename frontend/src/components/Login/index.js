import React, { Fragment, useState } from "react";
import api from "../../services/api";
import { Container, Button, Form, FormGroup, Input } from "reactstrap";
const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errormessage, setErrorMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("result login ok", email, password);

    const response = await api.post("/login", { email, password });
    console.log(response);
    const userId = response.data._id || false;
    try {
      if (userId) {
        localStorage.setItem("user", userId);
        history.push("/dashboard");
		console.log("login OK")
      } else {
        const { message } = response.data;
			setError(true)
			setErrorMessage(message)
        setTimeout(()=>{
			setError(false)
			setErrorMessage("")
		},2000)
      }
    } catch (error) {

	}
  };
  return (
    <Fragment>
      <Container>
        <h2>Login</h2>
        <p>
          Please <strong>Login</strong> into your account
        </p>
        <Form onSubmit={handleSubmit}>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
		  <FormGroup>
			   <Button className="submit-btn">Submit</Button>
		  </FormGroup>
				<FormGroup>
			   <Button className="submit-btn"  onClick={() => history.push("/register")}>New Account</Button>
		  </FormGroup>
        </Form>
        {error ? (
          <div className="event-validation" color="danger">
            ERROR LOGIN
          </div>
        ) : (
          ""
        )}
      </Container>
    </Fragment>
  );
};

export default Login;
