import React, { useState, useEffect } from "react";
import { getIssueTicketsByInventoryId } from "../../modules/issueTicketManager";
// import { Button, Table } from "reactstrap";
// import { Link } from "react-router-dom";
import IssueTicket from "./IssueTicket";

const IssueTicketList = ({ inventoryId, inventoryItem }) => {
  const [issueTickets, setIssueTickets] = useState([]);

  useEffect(() => {
    getIssueTicketsByInventoryId(inventoryId).then(setIssueTickets);
  }, []);

  if (issueTickets.length == 0) {
    return (
      <div>
        <h3>
          {`There are no issue tickets for ${inventoryItem.manufacturer} ${inventoryItem.model} Serial # : ${inventoryItem.serialNumber}`}{" "}
        </h3>
      </div>
    );
  }

  return (
    <div>
      <h4>Issue Tickets</h4>
      {issueTickets.map((item) => (
        <IssueTicket issueTicket={item} key={item.id} />
      ))}
    </div>
  );
};

export default IssueTicketList;
