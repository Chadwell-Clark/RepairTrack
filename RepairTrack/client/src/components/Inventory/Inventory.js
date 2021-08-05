import React from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

const Inventory = ({ inventory }) => {
  return (
    <tr>
      <td>{inventory.model}</td>
      <td>{inventory.manufacturer}</td>
      <td>{inventory.serialNumber}</td>
      <td>
        <Button color="primary" tag={Link} to={`/inventory/${inventory.id}`}>
          Issues
        </Button>{" "}
      </td>
      <td>{/* <Button color="success">New Issue</Button>{" "} */}</td>
      <td></td>
    </tr>
  );
};

export default Inventory;
