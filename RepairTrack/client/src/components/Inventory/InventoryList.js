import React, { useState, useEffect } from "react";
import { getAllInventory } from "../../modules/inventoryManager";
import { Button, Table } from "reactstrap";
import { Link } from "react-router-dom";
import Inventory from "./Inventory";

const InventoryList = () => {
  const [inventory, setInventory] = useState([]);

  const getInventory = () => {
    getAllInventory().then((res) => setInventory(res));
  };

  useEffect(() => {
    getInventory();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <h2 className="justify-content-center">Inventory</h2>
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
              {/* <th>
                <Button
                  color="info"
                  tag={Link}
                  to={`/`}
                  //   type="submit"
                  //   onClick={handleClick}
                >
                  Details
                </Button>
                <Button
                  color="success"
                  tag={Link}
                  to={`/`}
                  //   type="submit"
                  //   onClick={handleClick}
                >
                  New Issue
                </Button>
              </th> */}
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <Inventory inventory={item} key={item.id} />
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default InventoryList;
