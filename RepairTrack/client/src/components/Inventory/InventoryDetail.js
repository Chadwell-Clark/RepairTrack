import React, { useState, useEffect } from "react";
import {
  getInventoryById,
  deleteInventory,
} from "../../modules/inventoryManager";
import { Button, Card } from "reactstrap";
import { Link, useParams, useHistory } from "react-router-dom";

import IssueTicketList from "../IssueTicket/IssueTicketList";

const InventoryDetail = ({ isAdmin }) => {
  const [inventoryItem, setInventoryItem] = useState([]);

  const { invId } = useParams();
  const history = useHistory();

  // const handleDelete = (e) => {
  //   e.preventDefault();
  //   deleteInventory(invId)
  //   .then(() => history.push(`/inventory`));
  // };

  const handleDelete = (e) => {
    e.preventDefault();
    var deleteConfirm = window.confirm(
      ` Are You Sure You Want To Delete Inventory # ${invId}?`
    );
    if (deleteConfirm === true) {
      deleteInventory(invId).then(() => history.push(`/inventory`));
    } else {
      history.push(() => `/inventory/${invId}`);
    }
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
      <Card className="my-4 p-3 border-0 shadow-sm">
        <div className="row align-items-start">
          <h3 className="col">
            Manufacturer: <strong>{inventoryItem.manufacturer}</strong>
          </h3>{" "}
          <h3 className="col">
            Model: <strong>{inventoryItem.model}</strong>
          </h3>
          <div className="col">
            <img
              className="img-fluid"
              src={
                // eslint-disable-next-line no-native-reassign
                (require = `
              /images/${inventoryItem.imageLoc}
                 `)
              }
              alt="Not Available"
            />
          </div>
          <div className="row">
            <h3 className="col">
              Serial Number: <strong>{inventoryItem.serialNumber}</strong>
            </h3>
            {inventoryItem?.firmWare ? (
              <h3 className="col">
                Firmware: <strong>{inventoryItem.firmWare}</strong>
              </h3>
            ) : (
              ""
            )}
          </div>
        </div>
      </Card>
      <Card className=" my-3 border-0 ">
        <div className="row justify-content-around ">
          {isAdmin ? (
            <>
              {isAdmin ? (
                <Button
                  className="col-2"
                  color="success"
                  tag={Link}
                  to={`/inventory/add`}
                >
                  New Inventory Item
                </Button>
              ) : (
                ""
              )}
              <Button
                className="col-2"
                color="warning"
                tag={Link}
                to={`/inventory/edit/${invId}`}
              >
                Edit Inventory Item
              </Button>
              <Button className="col-2" color="danger" onClick={handleDelete}>
                Delete Inventory Item
              </Button>
            </>
          ) : (
            ""
          )}
        </div>
      </Card>
      <IssueTicketList inventoryId={invId} inventoryItem={inventoryItem} />
    </div>
  );
};

export default InventoryDetail;
