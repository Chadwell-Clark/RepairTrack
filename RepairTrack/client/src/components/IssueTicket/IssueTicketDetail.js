import React, { useState, useEffect } from "react";
import { getInventoryById } from "../../modules/inventoryManager";
import { Button, Table, Card } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { getIssueTicketsByInventoryId } from "../../modules/issueTicketManager";
import IssueTicketList from "../IssueTicket/IssueTicketList";

const IssueTicketDetail = () => {
  const [issueTicketItem, setIssueTicketItem] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    getIssueandInventoryByIssueTicketId(id).then(setIssueTicketItem);
  }, [id]);

  if (!issueTicketItem) {
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
            Manufacturer:{" "}
            <strong>{issueTicketItem.inventory.manufacturer}</strong>
          </h3>
          <h3 className="col">
            Model: <strong>{issueTicketItem.inventory.model}</strong>
          </h3>
          <div className="col">Image goes here</div>
          <h3>
            Serial Number:{" "}
            <strong>{issueTicketItem.inventory.serailNumber}</strong>
          </h3>
        </div>
      </Card>
      <RepairNotesList issueTicketId={id} issueTicketItem={issueTicketItem} />
    </div>
  );
};

export default IssueTicketDetail;
