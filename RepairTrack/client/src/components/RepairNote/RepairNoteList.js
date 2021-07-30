import React, { useState, useEffect } from "react";
import { getRepairNotesByIssueTicketId } from "../../modules/repairNoteManager";
import { Button, Table } from "reactstrap";
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
      <div>
        <h3>
          {`There are no Repair Notes for IssueTicket #${issueTicket.id} ${issueTicket.inventory?.manufacturer} ${issueTicket.inventory?.model} Serial # ${issueTicket.inventory?.serialNumber}`}{" "}
        </h3>
        <Button
          className="col"
          color="primary"
          tag={Link}
          to={`/repairNote/add/${invId}/${issId}`}
        >
          New Repair Note
        </Button>{" "}
      </div>
    );
  }

  return (
    <div>
      <h4>RepairNotes</h4>
      {repairNotes.map((item) => (
        <RepairNote issueTicket={issueTicket} repairNote={item} key={item.id} />
      ))}
    </div>
  );
};

export default RepairNoteList;
