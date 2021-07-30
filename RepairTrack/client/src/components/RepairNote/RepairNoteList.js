import React, { useState, useEffect } from "react";
import { getRepairNotesByIssueTicketId } from "../../modules/repairNoteManager";
import { Button, Card } from "reactstrap";
import { Link, useParams } from "react-router-dom";

import RepairNote from "./RepairNote";

const RepairNoteList = ({ issueTicket }) => {
  const [repairNotes, setRepairNotes] = useState([]);
  const { invId, issId } = useParams();

  useEffect(() => {
    getRepairNotesByIssueTicketId(issueTicket.id).then(setRepairNotes);
  }, []);

  if (repairNotes.length === 0 || repairNotes === null) {
    return (
      <Card className="border-0 shadow my-4">
        <div className="row">
          <h3 className="col-8">
            {`There are no Repair Notes for IssueTicket #${issueTicket.id}`}{" "}
          </h3>
          <Button
            className="col-2"
            color="primary"
            tag={Link}
            to={`/repairNote/add/${invId}/${issId}`}
          >
            New Repair Note
          </Button>{" "}
        </div>
      </Card>
    );
  }

  return (
    <div>
      <h3 className="text-center">
        <strong>Repair Notes</strong>
      </h3>
      {repairNotes.map((item) => (
        <RepairNote issueTicket={issueTicket} repairNote={item} key={item.id} />
      ))}
    </div>
  );
};

export default RepairNoteList;
