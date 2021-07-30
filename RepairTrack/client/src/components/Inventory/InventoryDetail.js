import React, { useState, useEffect } from "react";
import { getInventoryById } from "../../modules/inventoryManager";
import { Button, Table, Card } from "reactstrap";
import { Link, useParams } from "react-router-dom";

import IssueTicketList from "../IssueTicket/IssueTicketList";

const InventoryDetail = () => {
  const [inventoryItem, setInventoryItem] = useState([]);
  const [issuetickets, setIssueTickets] = useState([]);

  const { invId } = useParams();

  //   const getInventoryItem = () => {
  //     getInventoryById().then((res) => setInventoryItem(res));
  //   };

  useEffect(() => {
    getInventoryById(invId).then(setInventoryItem);

    // getIssueTicketsByInventoryId(id).then(setIssueTickets);
  }, [invId]);

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
          <div className="row">
            <h3 className="col">
              Serial Number: <strong>{inventoryItem.serialNumber}</strong>
            </h3>
            <Button
              className="col-2"
              color="primary"
              tag={Link}
              to={`/issueTicket/add/${invId}`}
            >
              New Issue Ticket
            </Button>{" "}
          </div>
        </div>
      </Card>
      <IssueTicketList inventoryId={invId} inventoryItem={inventoryItem} />
    </div>
  );
};

export default InventoryDetail;
