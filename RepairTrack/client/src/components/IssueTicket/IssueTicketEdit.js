import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { getIssueandInventoryByIssueTicketId } from "../../modules/issueTicketManager";
import { editIssueTicket } from "../../modules/issueTicketManager";
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

const IssueTicketEdit = () => {
  const [issueTicket, setIssueTicket] = useState({});
  const { invId, issId } = useParams();
  const history = useHistory();

  const handleChange = (e) => {
    const issueTicketCopy = { ...issueTicket };
    issueTicketCopy[e.target.id] = e.target.value;
    setIssueTicket(issueTicketCopy);
  };

  const handleChecked = (e) => {
    console.log(`CheckToggled ${e.target.checked}`);
    const issueTicketCopy = { ...issueTicket };
    issueTicketCopy.isResolved = e.target.checked;
    setIssueTicket(issueTicketCopy);
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (issueTicket.issue === "") {
      window.alert("Issue Required");
    } else {
      editIssueTicket(issueTicket).then(() => {
        history.push(`/issueTicket/${invId}/${issId}`); //would like to push to Id
      });
    }
  };

  useEffect(() => {
    if (issId !== 0) {
      getIssueandInventoryByIssueTicketId(issId).then(setIssueTicket);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!issueTicket) {
    return null;
  }

  return (
    <div className="container">
      <Card className="mt-3">
        <CardBody>
          <div className="row align-items-start">
            <h5 className="col">
              Inventory # <strong>{issueTicket?.inventory?.id}</strong>
            </h5>{" "}
            <h5 className="col">
              Manufacturer:{" "}
              <strong>{issueTicket?.inventory?.manufacturer}</strong>
            </h5>
            <h5 className="col">
              Model: <strong>{issueTicket?.inventory?.model}</strong>
            </h5>
            <div className="col">
              <img
                className="img-fluid"
                src={
                  // eslint-disable-next-line no-native-reassign
                  (require = `
              /images/${issueTicket?.inventory?.imageLoc}
                 `)
                }
                alt="Not available"
              />
            </div>
          </div>
          <div className="row">
            <h5 className="col">
              Serial Number:{" "}
              <strong>{issueTicket?.inventory?.serialNumber}</strong>
            </h5>
          </div>
        </CardBody>
      </Card>
      <Card className="mt-3">
        <CardBody>
          <Form>
            <FormGroup row>
              <Label sm={2}></Label>
              <Col sm={8} className="my-3">
                <h5>{`Edit Issue Ticket # ${issId} For Inventory Item # ${invId}`}</h5>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="issue" sm={2}></Label>
              <Col sm={8}>
                <Input
                  id="issue"
                  type="textarea"
                  rows="8"
                  placeholder="Please describe the Issue in detail - Required"
                  value={issueTicket.issue}
                  onChange={handleChange}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="isResolved" sm={2}></Label>
              <Col sm={8} className="my-3">
                Issue Resolved
                <Input
                  className="isResolved"
                  id="isResolved"
                  type="checkbox"
                  checked={issueTicket.isResolved}
                  // value={!issueTicket.isResolved}
                  onChange={handleChecked}
                ></Input>
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
                  Save Issue Ticket Edit
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default IssueTicketEdit;
