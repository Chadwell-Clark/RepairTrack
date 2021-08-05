import React from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

const UserProfile = ({ user }) => {
  // const handleDeactivate = (e) => {
  //   e.preventDefault();
  //   var deactivateConfirm = window.confirm(
  //     `Deactivate user ${user.displayName}?`
  //   );
  //   if (deactivateConfirm == true) {
  //     // deactivateUser(user).then(() => {
  //     history.push("/users/deactivated");
  //     // });
  //   } else {
  //     history.push("users");
  //   }
  // };

  return (
    <tr>
      <td>{user.fullName}</td>
      <td>{user.displayName}</td>
      <td>{user.userType.name}</td>
      <td>
        <Button
          color="primary"
          tag={Link}
          to={`/userProfile/${user.id}`}
          //
        >
          Details
        </Button>{" "}
      </td>
      {/* <td>
        <Button color="info">Edit</Button>{" "}
      </td> */}
      <td>
        {/* <Button color="danger" onClick={handleDeactivate}>
          Deactivate
        </Button> */}
      </td>
    </tr>
  );
};

export default UserProfile;
