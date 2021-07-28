import React from "react";
import { Button, Card, Alert } from "reactstrap";
import { Link, useHistory } from "react-router-dom";

const IssueTicket = ({ issueTicket }) => {
  //   const history = useHistory();

  return (
    <Card className="my-4">
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-4">
              <h4 className=" text-start">
                IssueTicket#: <strong>{issueTicket.id}</strong>
              </h4>
            </div>
            <div className="col-md-4">
              <h4 className="text-center">
                CreationDate: <strong>{issueTicket.dateCreated}</strong>
              </h4>
            </div>
            <div className="col-md-4">
              <>
                {issueTicket.isResolved == 0 ? (
                  <Alert className="text-center" color="danger">
                    <strong>Unresolved</strong>
                  </Alert>
                ) : (
                  <Alert className="text-center" color="success">
                    <strong>Resolved</strong>
                  </Alert>
                )}
              </>
            </div>
          </div>
          <div className="row">
            <div className="col-md-10">
              <div className="text-start">
                {" "}
                Description: <strong>{issueTicket.issue}</strong>
              </div>
            </div>
            <div className="col-md-1">
              <div className="row">
                <Button
                  className=""
                  color="primary"
                  tag={Link}
                  to={`/IssueTicket/${issueTicket.id}`}
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

export default IssueTicket;
