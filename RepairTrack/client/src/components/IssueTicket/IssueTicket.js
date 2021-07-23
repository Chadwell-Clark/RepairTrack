import React from "react";
import { Button, Card } from "reactstrap";
import { Link, useHistory } from "react-router-dom";

const IssueTicket = ({ issueTicket }) => {
  //   const history = useHistory();

  return (
    <Card>
      <div class="row">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-4">
              <Card class="text-center">1</Card>
            </div>
            <div class="col-md-4">
              <Card class="text-center">2</Card>
            </div>
            <div class="col-md-4">
              <Card class="text-center">3</Card>
            </div>
          </div>
          <div class="row">
            <div class="col-md-10">
              <Card class="text-center">4</Card>
            </div>
            <div class="col-md-2">
              <Card class="text-center">5</Card>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <Card class="text-center">6</Card>
        </div>
        <div class="col-md-4">
          <Card class="text-center">7</Card>
        </div>
        <div class="col-md-4">
          <Card class="text-center">8</Card>
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
