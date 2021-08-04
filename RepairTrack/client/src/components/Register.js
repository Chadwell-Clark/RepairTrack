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
            <h3>Please Register for Access</h3>
            <FormGroup className="my-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                type="text"
                autoFocus
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FormGroup>

            <FormGroup className="my-3">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                type="text"
                onChange={(e) => setLastName(e.target.value)}
              />
            </FormGroup>

            <FormGroup className="my-3">
              <Label for="email">Email</Label>
              <Input
                id="email"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>

            <FormGroup className="my-3">
              <Label for="password">Password</Label>
              <Input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>

            <FormGroup className="my-3">
              <Label for="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormGroup>

            <FormGroup className="my-3">
              <Button className="loginbutton">Register</Button>
            </FormGroup>
          </fieldset>
        </Form>
      </Card>
    </div>
  );
}
