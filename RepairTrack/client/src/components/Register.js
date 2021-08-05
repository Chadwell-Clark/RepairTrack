import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Card, Col } from "reactstrap";
import { useHistory } from "react-router-dom";
import { register } from "../modules/authManager";
// import logo1 from "../images/logo1.png";

export default function Register() {
  const history = useHistory();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } else {
      const userProfile = {
        firstName,
        lastName,
        email,
      };
      register(userProfile, password).then(() => history.push("/"));
    }
  };

  return (
    <div className="container-sm">
      <Card className="my-4 border-0 shadow">
        <Form onSubmit={registerClick} className="form ">
          {/* <img className="logo1" src={logo1} alt="logo1" /> */}
          <fieldset className="loginform m-3">
            <FormGroup row>
              <Label sm={2}></Label>
              <Col sm={8}>
                <h3>Please Register for Access</h3>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="firstName" sm={2}></Label>
              <Col sm={8} className="my-3">
                <Input
                  id="firstName"
                  type="text"
                  autoFocus
                  placeholder="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="lastName" sm={2}></Label>
              <Col sm={8} className="my-3">
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="email" sm={2}></Label>
              <Col sm={8} className="my-3">
                <Input
                  id="email"
                  type="text"
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

            <FormGroup row>
              <Label for="confirmPassword" sm={2}></Label>
              <Col sm={8} className="my-3">
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Col>
            </FormGroup>

            <FormGroup row className="my-3">
              <Label sm={2}></Label>
              <Col sm={8}>
                <Button className="loginbutton">Register</Button>
              </Col>
            </FormGroup>
          </fieldset>
        </Form>
      </Card>
    </div>
  );
}
