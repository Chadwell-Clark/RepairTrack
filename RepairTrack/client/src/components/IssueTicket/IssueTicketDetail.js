import React, { useState, useEffect } from "react";
import { Button, Alert, Card } from "reactstrap";
import { Link, useParams, useHistory } from "react-router-dom";
import {
  getIssueandInventoryByIssueTicketId,
  deleteIssueTicket,
} from "../../modules/issueTicketManager";
import RepairNoteList from "../RepairNote/RepairNoteList";

const IssueTicketDetail = ({ isAdmin }) => {
  const [issueTicket, setIssueTicket] = useState({});

  const { issId, invId } = useParams();
  const history = useHistory();

  const handleDelete = (e) => {
    e.preventDefault();
    var deleteConfirm = window.confirm(
      ` Are You Sure You Want To Delete Issue Ticket # ${issueTicket.id}?`
    );
    if (deleteConfirm === true) {
      deleteIssueTicket(issueTicket.id).then(() =>
        history.push(`/inventory/${invId}`)
      );
    } else {
      history.push(() => `/issueTicket/${invId}/${issId}`);
    }
  };

  useEffect(() => {
    getIssueandInventoryByIssueTicketId(issId).then(setIssueTicket);
  }, [issId]);

  if (!issueTicket) {
    return null;
  }

  return (
    <div className="container">
      <Card className="my-4 shadow border-0">
        <div className="row p-2 align-items-start">
          <h5 className="col">
            IssueTicket# <strong>{issueTicket.id}</strong>
          </h5>{" "}
          <h5 className="col">
            {/* Manufacturer:  */}
            <strong>{issueTicket.inventory?.manufacturer}</strong>
          </h5>
          <h5 className="col">
            {/* Model:  */}
            <strong>{issueTicket.inventory?.model}</strong>
          </h5>
          <div className="col">
            <img
              className="img-fluid"
              src={
                // eslint-disable-next-line no-native-reassign
                (require = `
              /images/${issueTicket.inventory?.imageLoc}
                 `)
              }
              alt="Not available"
            />
          </div>
          <div className="row">
            <h5 className="col-5">
              Serial # <strong>{issueTicket.inventory?.serialNumber}</strong>
            </h5>
            {issueTicket.isResolved === false ? (
              <Alert className="text-center col-2" color="danger">
                <strong>Unresolved</strong>
              </Alert>
            ) : (
              <Alert className="text-center col-2" color="success">
                <strong>Resolved</strong>
              </Alert>
            )}
          </div>
          <h5>
            Issue: <strong>{issueTicket.issue}</strong>
          </h5>
        </div>
      </Card>
      <Card className="my-4 border-0">
        <div className="row justify-content-around">
          {isAdmin ? (
            <Button className="col-2" color="danger" onClick={handleDelete}>
              Delete Issue Ticket
            </Button>
          ) : (
            ""
          )}
          <Button
            className="col-2"
            color="warning"
            tag={Link}
            to={`/issueTicket/edit/${invId}/${issId}`}
          >
            Edit Issue Ticket
          </Button>{" "}
        </div>
      </Card>

      {issueTicket.id !== undefined ? (
        <RepairNoteList issueTicket={issueTicket} />
      ) : null}
    </div>
  );
};

export default IssueTicketDetail;
