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
import { useHistory } from "react-router-dom";

import { getInventoryById } from "../../modules/inventoryManager";
// import { getCurrentUser } from "../../modules/userManager";
import { addIssueTicket } from "../../modules/issueTicketManager";

const IssueTicketForm = ({ inventoryId }) => {
  const newIssueTicket = {
    issue: "",
    partsNeeded: "",
    partsOrdered: 0,
  };
  const [issueTicket, setIssueTicket] = useState(newIssueTicket);
  const [currentUser, setCurrentUser] = useState({});
  const [inventory, setInventory] = useState({});

  const history = useHistory();

  const handleChange = (e) => {
    const issueTicketCopy = { ...issueTicket };
    issueTicketCopy[e.target.id] = e.target.value;
    setIssueTicket(issueTicketCopy);
  };

  const handleClick = (e) => {
    e.preventDefault();
    //   if (repairNote.note === "") {
    //     window.alert("Repair Note Required");
    //   } else {
    //     repairNote.issueTicketId = issueId;
    //     //   repairNote.userProfileId = currentUser.id;
    //     debugger;
    //     addIssueTicket(issueTicket).then((res) => {
    //       history.push(`/issueTicket/${res}`); //would like to push to Id
    //     });
    //   }
  };

  useEffect(() => {
    if (inventoryId !== 0) {
      getInventoryById(inventoryId).then(setInventory);
      //   getCurrentUser().then(setCurrentUser);
    }
  }, []);

  if (!issueTicket || !currentUser) {
    return null;
  }

  return (
    <div className="container">
      <Card>
        <CardBody>
          <div className="row align-items-start">
            <h5 className="col">
              IssueTicket # <strong>{issueTicket?.id}</strong>
            </h5>{" "}
            <h5 className="col">
              Manufacturer:{" "}
              <strong>{issueTicket?.inventory?.manufacturer}</strong>
            </h5>
            <h5 className="col">
              Model: <strong>{issueTicket?.inventory?.model}</strong>
            </h5>
            <div className="col">Image goes here</div>
          </div>
          <div className="row">
            <h5 className="col">
              Technician: <strong>{currentUser?.fullName}</strong>
            </h5>
            <h5 className="col">
              Serial Number:{" "}
              <strong>{issueTicket?.inventory?.serialNumber}</strong>
            </h5>
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <Form>
            <h5
              ml-5
            >{`New Repair Note  For Inventory Item # ${inventoryId}`}</h5>
            <FormGroup row>
              <Label for="note" sm={2}>
                Notes on Repair:
              </Label>
              <Col sm={10}>
                <Input
                  id="note"
                  type="textarea"
                  rows="10"
                  value={issueTicket.note}
                  onChange={handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
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
            </FormGroup>
            <FormGroup row>
              <Label for="partsOrdered" sm={2}>
                Parts Ordered:
              </Label>
              <Col sm={10}>
                <Input
                  id="partsOrdered"
                  type="select"
                  value={issueTicket.partsNeeded}
                  onChange={handleChange}
                >
                  <option value="0">Parts not Ordered</option>
                  <option value="1">Parts Ordered</option>
                  <option value="2">Parts not Needed</option>
                </Input>
              </Col>
            </FormGroup>
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
