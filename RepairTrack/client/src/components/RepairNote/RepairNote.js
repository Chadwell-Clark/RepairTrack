import React from "react";
import { Button, Card, Alert } from "reactstrap";
import { Link, useHistory } from "react-router-dom";

const RepairNote = ({ repairNote }) => {
  //   const history = useHistory();

  return (
    <Card className="my-4">
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-4">
              <h4 className=" text-start">
                RepairNote#: <strong>{repairNote.id}</strong>
              </h4>
            </div>
            <div className="col-md-4">
              <h4 className="text-center">
                CreationDate: <strong>{repairNote.dateCreated}</strong>
              </h4>
            </div>
          </div>
          <div className="row">
            <div className="col-md-10">
              <div className="text-start">
                {" "}
                Description: <strong>{repairNote.note}</strong>
              </div>
            </div>
            <div className="col-md-1">
              <div className="row">
                <Button
                  className=""
                  color="primary"
                  tag={Link}
                  to={`/repairNote/${repairNote.id}`}
                  //   type="submit"
                  //   onClick={handleClick}
                >
                  Details
                </Button>{" "}
              </div>
              <div className="row">
                <> </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RepairNote;
