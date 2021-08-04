import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Col,
} from "reactstrap";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { getInventoryById } from "../../modules/inventoryManager";
// import { getCurrentUser } from "../../modules/userManager";
import { addIssueTicket } from "../../modules/issueTicketManager";

const IssueTicketForm = () => {
  const newIssueTicket = {
    issue: "",
    isResolved: false,
  };
  const [issueTicket, setIssueTicket] = useState(newIssueTicket);
  const [inventory, setInventory] = useState({});

  const history = useHistory();
  const { invId } = useParams();

  const handleChange = (e) => {
    const issueTicketCopy = { ...issueTicket };
    issueTicketCopy[e.target.id] = e.target.value;
    setIssueTicket(issueTicketCopy);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (issueTicket.issue === "") {
      window.alert("Issue Required");
    } else {
      issueTicket.inventoryId = invId;
      issueTicket.isResolved = false;
      //   repairNote.userProfileId = currentUser.id;

      addIssueTicket(issueTicket).then((res) => {
        history.push(`/issueTicket/${invId}/${res}`); //would like to push to Id
      });
    }
  };

  useEffect(() => {
    if (invId !== 0) {
      getInventoryById(invId).then(setInventory);
      //   getCurrentUser().then(setCurrentUser);
    }
  }, []);

  if (!inventory) {
    return null;
  }

  return (
    <div className="container">
      <Card>
        <CardBody>
          <div className="row align-items-start">
            <h5 className="col">
              Inventory # <strong>{inventory?.id}</strong>
            </h5>{" "}
            <h5 className="col">
              Manufacturer: <strong>{inventory?.manufacturer}</strong>
            </h5>
            <h5 className="col">
              Model: <strong>{inventory?.model}</strong>
            </h5>
            <div className="col">
              <img
                className="img-fluid"
                src={
                  (require = `
              /images/${inventory?.imageLoc}
                 `)
                }
              />
            </div>
          </div>
          <div className="row">
            {/* <h5 className="col">
              Technician: <strong>{currentUser?.fullName}</strong>
            </h5> */}
            <h5 className="col">
              Serial Number: <strong>{inventory?.serialNumber}</strong>
            </h5>
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <Form>
            <h5>{`New Issue Ticket For Inventory Item # ${invId}`}</h5>
            <FormGroup row>
              <Label for="issue" sm={2}>
                Issue:
              </Label>
              <Col sm={10}>
                <Input
                  id="issue"
                  type="textarea"
                  rows="10"
                  value={issueTicket.issue}
                  onChange={handleChange}
                  autoFocus
                />
              </Col>
            </FormGroup>
            {/* <FormGroup row>
              <Label for="partsNeeded" sm={2}>
                Parts Needed:
              </Label>
              <Col sm={10}>
                <Input
                  id="partsNeeded"
                  type="textarea"
                  rows="6"
                  value={issueTicket.partsNeeded}
                  onChange={handleChange}
                />
              </Col>
            </FormGroup> */}
            {/* <FormGroup row>
              <Label for="isResolved" sm={2}>
                Parts Ordered:
              </Label>
              <Col sm={10}>
                <Input
                  id="isResolved"
                  type="select"
                  value={issueTicket.isResolved}
                  onChange={handleChange}
                >
                  <option value="0">Unresolved</option>
                  <option value="1">Resolved</option>
                </Input>
              </Col>
            </FormGroup> */}
            <FormGroup row>
              <Label sm={2}></Label>
              <Col sm={10}>
                <Button
                  className=""
                  color="success"
                  type="submit"
                  onClick={handleClick}
                >
                  Save IssueTicket
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default IssueTicketForm;
