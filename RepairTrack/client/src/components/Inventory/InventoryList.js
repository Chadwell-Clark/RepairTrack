import React, { useState, useEffect } from "react";
import { getAllInventory } from "../../modules/inventoryManager";
import { Button, Table, Card } from "reactstrap";
import { Link } from "react-router-dom";
import Inventory from "./Inventory";

const InventoryList = ({ isAdmin }) => {
  const [inventory, setInventory] = useState([]);

  const getInventory = () => {
    getAllInventory().then((res) => setInventory(res));
  };

  useEffect(() => {
    getInventory();
  }, []);

  return (
    <div className="container">
      <Card className="mt-3 border-0">
        <div className="row justify-content-around">
          <h2 className="col-8">Inventory</h2>
          {isAdmin ? (
            <Button
              className="col-2"
              color="success"
              tag={Link}
              to={`inventory/add`}
            >
              New Inventory Item
            </Button>
          ) : (
            ""
          )}
          <div className="col-1"> </div>
        </div>
      </Card>
      <Table>
        <thead>
          <tr>
            <th>
              <h5>Model</h5>
            </th>
            <th>
              <h5>Manufacturer</h5>
            </th>
            <th>
              <h5>Serial#</h5>
            </th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <Inventory inventory={item} key={item.id} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default InventoryList;
