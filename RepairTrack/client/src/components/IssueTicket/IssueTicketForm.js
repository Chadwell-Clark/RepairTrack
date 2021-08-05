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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!inventory) {
    return null;
  }

  return (
    <div className="container">
      <Card className="my-3">
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
                  // eslint-disable-next-line no-native-reassign
                  (require = `
              /images/${inventory?.imageLoc}
                 `)
                }
                alt="Not Available"
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
      <Card className="my-3">
        <CardBody>
          <Form>
            <FormGroup row>
              <Label sm={2}></Label>
              <Col sm={8} className="my-3">
                <h5>{`New Issue Ticket For Inventory Item # ${invId}`}</h5>
              </Col>
            </FormGroup>
            {/* <h5>{`New Issue Ticket For Inventory Item # ${invId}`}</h5> */}
            <FormGroup row>
              <Label for="issue" sm={2}></Label>
              <Col sm={8}>
                <Input
                  id="issue"
                  type="textarea"
                  rows="6"
                  placeholder="Please describe the Issue in detail - Required"
                  value={issueTicket.issue}
                  onChange={handleChange}
                  autoFocus
                />
              </Col>
            </FormGroup>

            <FormGroup row className="my-3">
              <Label sm={2}></Label>
              <Col sm={8}>
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
