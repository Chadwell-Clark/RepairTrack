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
      <h4>Issue Tickets</h4>
      {issueTickets.map((item) => (
        <IssueTicket issueTicket={item} inventoryId={invId} key={item.id} />
      ))}
    </div>
  );
};

export default IssueTicketList;
