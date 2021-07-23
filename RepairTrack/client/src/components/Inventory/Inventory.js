import React from "react";
import { Button } from "reactstrap";
import { Link, useHistory } from "react-router-dom";

const Inventory = ({ inventory }) => {
  const history = useHistory();

  //   const handleDeactivate = (e) => {
  //     e.preventDefault();
  //     var deactivateConfirm = window.confirm(
  //       `Deactivate Inventory ${Inventory.displayName}?`
  //     );
  //     if (deactivateConfirm == true) {
  //       // deactivateInventory(Inventory).then(() => {
  //       history.push("/Inventorys/deactivated");
  //       // });
  //     } else {
  //       history.push("Inventorys");
  //     }
  //   };

  return (
    <tr>
      <td>{inventory.model}</td>
      <td>{inventory.manufacturer}</td>
      <td>{inventory.serialNumber}</td>
      <td>
        <Button
          color="primary"
          tag={Link}
          to={`/`}
          //   type="submit"
          //   onClick={handleClick}
        >
          Details
        </Button>{" "}
      </td>
      <td>
        <Button color="success">New Issue</Button>{" "}
      </td>
      <td></td>
    </tr>
  );
};

export default Inventory;
