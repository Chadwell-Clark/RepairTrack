import React, { useState, useEffect } from "react";
import { Button, Table, Card } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { getIssueandInventoryByIssueTicketId } from "../../modules/issueTicketManager";
import RepairNotesList from "../RepairNote/RepairNoteList";

const IssueTicketDetail = () => {
  const [issueTicket, setIssueTicket] = useState({});

  const { issId, invId } = useParams();
  //   console.log(id);
  //   setIssueId(id);

  useEffect(() => {
    getIssueandInventoryByIssueTicketId(issId).then(setIssueTicket);
  }, [issId]);
  //   console.log("setissue", issueTicket);

  if (!issueTicket) {
    return null;
  }

  return (
    <div className="container">
      <Card className="my-4 shadow">
        <div className="row align-items-start">
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
          <div className="col">Image goes here</div>
          <div className="row">
            <h5 className="col-8">
              Serial # <strong>{issueTicket.inventory?.serialNumber}</strong>
            </h5>
            {/* <Button
              className="col-2"
              color="primary"
              tag={Link}
              to={`/repairNote/add/${invId}/${issId}`}
            >
              New Repair Note
            </Button>{" "} */}
          </div>
          <h5>
            Issue: <strong>{issueTicket.issue}</strong>
          </h5>
        </div>
      </Card>
      <Card className="my-4 border-0">
        <div className="row justify-content-around">
          <Button
            className="col-2"
            color="danger"
            tag={Link}
            to={`/repairNote/add/${invId}/${issId}`}
          >
            Delete Issue Ticket
          </Button>{" "}
          <Button
            className="col-2"
            color="warning"
            tag={Link}
            to={`/repairNote/edit/${invId}/${issId}`}
          >
            Edit Issue Ticket
          </Button>{" "}
          <Button
            className="col-2"
            color="primary"
            tag={Link}
            to={`/repairNote/add/${invId}/${issId}`}
          >
            New Repair Note
          </Button>{" "}
        </div>
      </Card>
      {/* <Card className="my-4 shadow"> */}
      {issueTicket.id !== undefined ? (
        <RepairNotesList issueTicket={issueTicket} />
      ) : null}
      {/* </Card> */}
    </div>
  );
};

export default IssueTicketDetail;
