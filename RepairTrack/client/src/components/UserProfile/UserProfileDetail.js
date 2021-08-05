import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import { useParams } from "react-router-dom";

import { getUserById } from "../../modules/userProfileManager";

const UserDetails = () => {
  const [user, setUser] = useState();
  const { id } = useParams();

  useEffect(() => {
    getUserById(id).then(setUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) {
    return null;
  }

  // const dateString = user.createDateTime.toString();
  // const shortDate = dateString.split("T");
  // const ymd = shortDate[0].split("-");
  // const YYYY = ymd[0];
  // const MM = ymd[1];
  // const DD = ymd[2];

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-6 mt-3">
          <Card>
            <CardHeader>
              <div className="row justify-content-between">
                <h3 className="d-flex align-items-center ml-3">
                  <strong>{user.fullName}</strong>
                </h3>
              </div>
            </CardHeader>
            <CardBody>
              {/* <h4 className="mb-4">
                DisplayName: <strong>{user.displayName}</strong>
              </h4> */}
              <h4 className="mb-4">
                Email: <strong>{user.email}</strong>
              </h4>
              {/* <CardFooter> */}
              <div className="row">
                <h4 className="mx-1">{user.userType.name}</h4>
              </div>
              {/* </CardFooter> */}
            </CardBody>
          </Card>
          <div className="row justify-content-around">
            {/* <Button
              className="col-2"
              color="warning"
              tag={Link}
              to={`/userProfile/edit/${user.id}`}
              //
            >
              Edit
            </Button>{" "}
            <Button
              className="col-2"
              color="danger"
              tag={Link}
              to={`/userProfile/${user.id}`}
              //
            >
              Delete
            </Button>{" "} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
