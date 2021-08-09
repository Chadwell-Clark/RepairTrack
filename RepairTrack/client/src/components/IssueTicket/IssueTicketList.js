import React, { useState, useEffect } from "react";
import { getIssueTicketsByInventoryId } from "../../modules/issueTicketManager";
import { Button, Card } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import IssueTicket from "./IssueTicket";

const IssueTicketList = ({ inventoryItem }) => {
  const [issueTickets, setIssueTickets] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { invId } = useParams();

  useEffect(() => {
    getIssueTicketsByInventoryId(invId)
      .then(setIssueTickets)
      .then(setIsLoaded(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!issueTickets) {
    return null;
  } else if (isLoaded && !(issueTickets.length === 0)) {
    return (
      <div>
        <div className="row mt-4 ">
          <h1 className=" text-center">
            <strong>Issue Tickets</strong>
          </h1>
          <div className="col-5"></div>
          <Button
            className=" col-2  d-flex justify-content-center"
            color="primary"
            tag={Link}
            to={`/issueTicket/add/${invId}`}
          >
            New Issue Ticket
          </Button>{" "}
          <div className="col-5"></div>
        </div>
        {issueTickets.map((item) => (
          <IssueTicket issueTicket={item} inventoryId={invId} key={item.id} />
        ))}
      </div>
    );
  } else if (issueTickets.length === 0) {
    return (
      <>
        <Card className="p-3 my-3 border-0 shadow">
          <h3>
            {`There are no issue tickets for ${inventoryItem.manufacturer} ${inventoryItem.model} Serial # ${inventoryItem.serialNumber}`}{" "}
          </h3>
          <div className="row">
            <div className="col-5"></div>
            <div className="col-5"></div>
          </div>
        </Card>
        <Card className="p-3  border-0">
          <div className=" row justify-content-center">
            <div className="col-5"></div>
            <Button
              className="col-2"
              color="primary"
              tag={Link}
              to={`/issueTicket/add/${invId}`}
            >
              New Issue Ticket
            </Button>{" "}
            <div className="col-5"></div>
          </div>
        </Card>
      </>
    );
  }
};

export default IssueTicketList;
