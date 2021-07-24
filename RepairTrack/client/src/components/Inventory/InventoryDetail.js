import React, { useState, useEffect } from "react";
import { getInventoryById } from "../../modules/inventoryManager";
import { Button, Table, Card } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { getIssueTicketsByInventoryId } from "../../modules/issueTicketManager";
import IssueTicketList from "../IssueTicket/IssueTicketList";

const InventoryDetail = () => {
  const [inventoryItem, setInventoryItem] = useState([]);
  const [issuetickets, setIssueTickets] = useState([]);

  const { id } = useParams();

  //   const getInventoryItem = () => {
  //     getInventoryById().then((res) => setInventoryItem(res));
  //   };

  useEffect(() => {
    getInventoryById(id).then(setInventoryItem);
    // getIssueTicketsByInventoryId(id).then(setIssueTickets);
  }, [id]);

  if (!inventoryItem) {
    return null;
  }

  return (
    <div className="container">
      <Card>
        <div className="row align-items-start">
          <h3 className="col">
            Manufacturer: <strong>{inventoryItem.manufacturer}</strong>
          </h3>{" "}
          <h3 className="col">
            Model: <strong>{inventoryItem.model}</strong>
          </h3>
          <div className="col">Image goes here</div>
          <h3>
            Serial Number: <strong>{inventoryItem.serialNumber}</strong>
          </h3>
        </div>
      </Card>
      <IssueTicketList inventoryId={id} inventoryItem={inventoryItem} />
    </div>
  );
};

export default InventoryDetail;
