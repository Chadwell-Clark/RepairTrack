import React, { useState, useEffect } from "react";
import { getAllIssueTickets } from "../../modules/issueTicketManager";
// import { Button, Table } from "reactstrap";
// import { Link } from "react-router-dom";
import IssueTicket from "./IssueTicket";
import { Card } from "reactstrap";

const IssuesList = ({ inventoryId, inventoryItem }) => {
  const [issueTickets, setIssueTickets] = useState([]);

  useEffect(() => {
    getAllIssueTickets().then(setIssueTickets);
  }, []);

  if (!issueTickets) {
    return null;
  }
  return (
    <div className="container">
      <h1 className="my-4 text-center">
        <strong>Issue Tickets</strong>
      </h1>
      {issueTickets.map((item) => (
        <IssueTicket issueTicket={item} key={item.id} />
      ))}
    </div>
  );
};

export default IssuesList;
