import React, { useState, useEffect } from "react";
import { getRepairNotesByIssueTicketId } from "../../modules/repairNoteManager";
// import { Button, Table } from "reactstrap";

import RepairNote from "./RepairNote";

const RepairNoteList = ({ issueTicket }) => {
  const [repairNotes, setRepairNotes] = useState([]);
  useEffect(() => {
    getRepairNotesByIssueTicketId(issueTicket.id).then(setRepairNotes);
  }, []);

  if (repairNotes.length === 0 || repairNotes === null) {
    return (
      <div>
        <h3>
          {`There are no Repair Notes for IssueTicket #${issueTicket.id} ${issueTicket.inventory?.manufacturer} ${issueTicket.inventory?.model} Serial # ${issueTicket.inventory?.serialNumber}`}{" "}
        </h3>
      </div>
    );
  }

  return (
    <div>
      <h4>RepairNotes</h4>
      {repairNotes.map((item) => (
        <RepairNote repairNote={item} key={item.id} />
      ))}
    </div>
  );
};

export default RepairNoteList;
