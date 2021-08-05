import React, { useEffect, useState } from "react";

import { getAllUsers } from "../../modules/userProfileManager";
import { Table } from "reactstrap";
import User from "./UserProfile";

const UserProfileList = () => {
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    getAllUsers().then((users) => setUsers(users));
  };

  //   const handleChange = (e) => {
  //     setState(e.target.value);
  //   };
  //   const handleClick = (e) => {
  //     e.preventDefault();
  //     searchVideos(criterion, true).then((videos) => setVideos(videos));
  //   };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <h2>User Profiles</h2>
        <Table>
          <thead>
            <tr>
              <th>
                <h5>Name</h5>
              </th>
              <th></th>

              <th>
                <h5>User Type</h5>
              </th>
              <th></th>
              <th></th>
              <th>
                {/* <Button
                  color="danger"
                  tag={Link}
                  to={`/users/deactivated`}
                  //   type="submit"
                  //   onClick={handleClick}
                >
                  Deactivated Users
                </Button> */}
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <User user={user} key={user.id} />
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default UserProfileList;
