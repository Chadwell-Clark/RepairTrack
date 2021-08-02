import React, { useState, useEffect } from "react";
import {
  getInventoryById,
  deleteInventory,
} from "../../modules/inventoryManager";
import { Button, Table, Card } from "reactstrap";
import { Link, useParams, useHistory } from "react-router-dom";

import IssueTicketList from "../IssueTicket/IssueTicketList";

const InventoryDetail = ({ isAdmin }) => {
  const [inventoryItem, setInventoryItem] = useState([]);
  const [issuetickets, setIssueTickets] = useState([]);

  const { invId } = useParams();
  const history = useHistory();
  const handleDelete = (e) => {
    e.preventDefault();
    deleteInventory(invId).then(history.push(`/inventory`));
  };

  useEffect(() => {
    getInventoryById(invId).then(setInventoryItem);

    // getIssueTicketsByInventoryId(id).then(setIssueTickets);
  }, [invId]);

  if (!inventoryItem) {
    return null;
  }

  return (
    <div className="container">
      <Card className="my-4 border-0 shadow-sm">
        <div className="row align-items-start">
          <h3 className="col">
            Manufacturer: <strong>{inventoryItem.manufacturer}</strong>
          </h3>{" "}
          <h3 className="col">
            Model: <strong>{inventoryItem.model}</strong>
          </h3>
          <div className="col">
            <img
              className="d-flex justify-content-end"
              src={
                (require = `
              ./images/${inventoryItem.imageLoc}
                 `)
              }
            />
          </div>
          <div className="row">
            <h3 className="col">
              Serial Number: <strong>{inventoryItem.serialNumber}</strong>
            </h3>
          </div>
        </div>
      </Card>
      <Card className="border-0 shadow-sm">
        <div className="row justify-content-around ">
          <Button
            className="col-2"
            color="warning"
            tag={Link}
            to={`/inventory/edit/${invId}`}
          >
            Edit Inventory Item
          </Button>{" "}
          <Button className="col-2" color="danger" onClick={handleDelete}>
            Delete Inventory Item
          </Button>{" "}
        </div>
      </Card>
      <IssueTicketList inventoryId={invId} inventoryItem={inventoryItem} />
    </div>
  );
};

export default InventoryDetail;
