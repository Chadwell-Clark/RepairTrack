import React, { useState, useEffect } from "react";
import { getIssueTicketsByInventoryId } from "../../modules/issueTicketManager";
import { Button, Card } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import IssueTicket from "./IssueTicket";

const IssueTicketList = ({ inventoryItem }) => {
  const [issueTickets, setIssueTickets] = useState([]);
  const { invId } = useParams();
  useEffect(() => {
    getIssueTicketsByInventoryId(invId).then(setIssueTickets);
  }, []);

  if (!issueTickets) {
    return null;
  } else if (issueTickets.length === 0) {
    return (
      <Card>
        <h3>
          {`There are no issue tickets for ${inventoryItem.manufacturer} ${inventoryItem.model} Serial # : ${inventoryItem.serialNumber}`}{" "}
        </h3>
        <Button
          className="col"
          color="primary"
          tag={Link}
          to={`/issueTicket/add/${invId}`}
        >
          New Issue Ticket
        </Button>{" "}
      </Card>
    );
  }

  return (
    <div>
      <div className="row mt-4 ">
        <h4 className="col-2">Issue Tickets</h4>
        <Button
          className="col-2"
          color="primary"
          tag={Link}
          to={`/issueTicket/add/${invId}`}
        >
          New Issue Ticket
        </Button>{" "}
      </div>
      {issueTickets.map((item) => (
        <IssueTicket issueTicket={item} inventoryId={invId} key={item.id} />
      ))}
    </div>
  );
};

export default IssueTicketList;
