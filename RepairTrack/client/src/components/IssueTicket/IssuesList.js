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

  //   if (issueTickets.length == 0) {
  //     return (
  //       <div>
  //         <h3>
  //           {`There are no issue tickets for ${inventoryItem.manufacturer} ${inventoryItem.model} Serial # : ${inventoryItem.serialNumber}`}{" "}
  //         </h3>
  //       </div>
  //     );
  //   }
  if (!issueTickets) {
    return null;
  }
  return (
    <div className="container">
      <h4>Issue Tickets</h4>
      {issueTickets.map((item) => (
        <IssueTicket issueTicket={item} key={item.id} />
      ))}
    </div>
  );
};

export default IssuesList;
