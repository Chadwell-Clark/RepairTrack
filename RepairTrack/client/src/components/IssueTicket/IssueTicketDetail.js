import React, { useState, useEffect } from "react";
import { Button, Table, Card } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { getIssueandInventoryByIssueTicketId } from "../../modules/issueTicketManager";
import RepairNotesList from "../RepairNote/RepairNoteList";

const IssueTicketDetail = ({ setIssueId }) => {
  const [issueTicket, setIssueTicket] = useState({});

  const { id } = useParams();
  //   console.log(id);
  //   setIssueId(id);

  useEffect(() => {
    getIssueandInventoryByIssueTicketId(id).then(setIssueTicket);
    setIssueId(id);
  }, [id]);
  //   console.log("setissue", issueTicket);

  if (!issueTicket) {
    return null;
  }

  return (
    <div className="container">
      <Card>
        <div className="row align-items-start">
          <h3 className="col">
            IssueTicket# <strong>{issueTicket.id}</strong>
          </h3>{" "}
          <h3 className="col">
            Manufacturer: <strong>{issueTicket.inventory?.manufacturer}</strong>
          </h3>
          <h3 className="col">
            Model: <strong>{issueTicket.inventory?.model}</strong>
          </h3>
          <div className="col">Image goes here</div>
          <h3>
            Serial Number:{" "}
            <strong>{issueTicket.inventory?.serialNumber}</strong>
          </h3>
        </div>
      </Card>
      {issueTicket.id !== undefined ? (
        <RepairNotesList issueTicket={issueTicket} />
      ) : null}
    </div>
  );
};

export default IssueTicketDetail;
