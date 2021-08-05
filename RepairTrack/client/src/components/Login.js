import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Col, Card } from "reactstrap";
import { useHistory, Link } from "react-router-dom";
import { login } from "../modules/authManager";
// import logo1 from "../images/logo1.png";

export default function Login() {
  const history = useHistory();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => history.push("/"))
      .catch(() => alert("Invalid email or password"));
  };

  return (
    <div className="container-sm">
      <Card className="my-4 border-0 shadow">
        <Form onSubmit={loginSubmit} className="form">
          {/* <img className="logo1" src={logo1} alt="logo1" /> */}
          <fieldset className="loginform m-3">
            <FormGroup row>
              <Label sm={2}></Label>
              <Col sm={8}>
                <h3>User Login</h3>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="email" sm={2}></Label>
              <Col sm={8} className="my-3">
                <Input
                  id="email"
                  type="text"
                  autoFocus
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="password" sm={2}></Label>
              <Col sm={8} className="my-3">
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Col>
            </FormGroup>

            <FormGroup row className="my-3">
              <Label sm={2}></Label>
              <Col sm={8}>
                <Button className="loginbutton">Login</Button>
              </Col>
            </FormGroup>

            <FormGroup row className="my-3">
              <Label row sm={2}></Label>
              <Col sm={8}>
                <em>
                  Don't have an account? <Link to="register">Sign up here</Link>
                </em>
              </Col>
            </FormGroup>
          </fieldset>
        </Form>
      </Card>
    </div>
  );
}
