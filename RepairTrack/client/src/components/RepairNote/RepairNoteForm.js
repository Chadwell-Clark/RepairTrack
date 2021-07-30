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

import { getIssueandInventoryByIssueTicketId } from "../../modules/issueTicketManager";
import { getCurrentUser } from "../../modules/userManager";
import { addRepairNote } from "../../modules/repairNoteManager";

const RepairNoteForm = () => {
  const newRepairNote = {
    note: "",
    partsNeeded: "",
    partsOrdered: 0,
  };
  const [issueTicket, setIssueTicket] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [repairNote, setRepairNote] = useState(newRepairNote);
  const history = useHistory();
  const { invId, issId } = useParams();

  const handleChange = (e) => {
    const repairNoteCopy = { ...repairNote };
    repairNoteCopy[e.target.id] = e.target.value;
    setRepairNote(repairNoteCopy);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (repairNote.note === "") {
      window.alert("Repair Note Required");
    } else {
      repairNote.issueTicketId = issId;
      repairNote.userProfileId = currentUser.id;

      addRepairNote(repairNote).then((res) => {
        history.push(`/repairNote/${invId}/${issId}/${res}`); //would like to push to Id
      });
    }
  };

  useEffect(() => {
    if (issId !== undefined && issId !== 0 && currentUser !== {}) {
      getIssueandInventoryByIssueTicketId(issId).then(setIssueTicket);
      getCurrentUser().then(setCurrentUser);
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
            <div className="row">
              <h5>
                Issue: <strong>{issueTicket.issue}</strong>
              </h5>
            </div>
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <Form>
            <h5 ml-5>{`New Repair Note  For Issue Ticket # ${issId}`}</h5>
            <FormGroup row>
              <Label for="note" sm={2}>
                Notes on Repair:
              </Label>
              <Col sm={10}>
                <Input
                  id="note"
                  type="textarea"
                  rows="10"
                  value={repairNote.note}
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
                  value={repairNote.partsNeeded}
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
                  className="caret"
                  id="partsOrdered"
                  type="select"
                  value={repairNote.partsNeeded}
                  onChange={handleChange}
                >
                  <option value="0">Parts not Ordered</option>
                  <option value="1">Parts Ordered</option>
                  <option value="2">Parts not Needed</option>
                  <option value="3">Parts in Stock</option>
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
                  Save Repair Note
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default RepairNoteForm;
