import React from "react";
import { Button, Card, Alert } from "reactstrap";
import { Link, useHistory } from "react-router-dom";

const IssueTicket = ({ issueTicket }) => {
  //   const history = useHistory();

  return (
    <Card className="my-4">
      <div class="row">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-4">
              <h4 class=" text-start">
                IssueTicket#: <strong>{issueTicket.id}</strong>
              </h4>
            </div>
            <div class="col-md-4">
              <h4 class="text-center">
                CreationDate: <strong>{issueTicket.createDateTime}</strong>
              </h4>
            </div>
            <div class="col-md-4">
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
          <div class="row">
            <div class="col-md-10">
              <div class="text-start">
                {" "}
                Description: <strong>{issueTicket.issue}</strong>
              </div>
            </div>
            <div className="col-md-1">
              <div class="row">
                <Button
                  className=""
                  color="primary"
                  tag={Link}
                  to={`/inventory`}
                  //   type="submit"
                  //   onClick={handleClick}
                >
                  Details
                </Button>{" "}
              </div>
              <div class="row">
                <> </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>

    // <div className="container">
    //   <Card className="">
    //     <div className="row align-items-start">
    //       <h4 className="col">
    //         IssueTicket#: <strong>{issueTicket.id}</strong>
    //       </h4>{" "}
    //       <h4 className="col">
    //         CreationDate: <strong>{issueTicket.createDateTime}</strong>
    //       </h4>
    //       <div className="row align-items-center">
    //         <Button
    //           className="col-1"
    //           color="primary"
    //           tag={Link}
    //           to={`/inventory`}
    //           //   type="submit"
    //           //   onClick={handleClick}
    //         >
    //           Details
    //         </Button>{" "}
    //       </div>
    //       <div className="row align-items-end">
    //         <h4 className="col">
    //           Description: <strong>{issueTicket.issue}</strong>
    //         </h4>
    //       </div>
    //     </div>
    //   </Card>
    // </div>
  );
};

export default IssueTicket;
