import React, { useState, useEffect } from "react";
import { getRepairNotessByIssueTicketId } from "../../modules/repairNoteManager";
import { Button, Table } from "reactstrap";
import { Link } from "react-router-dom";
import RepairNote from "./RepairNote";

const RepairNoteList = ({ issueTicketId, issueTicketItem }) => {
  const [repairNotess, setRepairNotes] = useState([]);

  //   const getIssueTicket = () => {
  //     getAllIssueTicket().then((res) => setIssueTicket(res));
  //   };

  useEffect(() => {
    getRepairNotesByIssueTicketId(issueTicketId).then(setRepairNotes);
  }, []);

  if (repairNotes.length == 0) {
    return (
      <div>
        <h3>
          {`There are no Repair Notes for ${issueTicketItem.Id} ${issueTicketItem.model} Serial # : ${issueTicketItem.serialNumber}`}{" "}
        </h3>
      </div>
    );
  }

  return (
    <div>
      <h4>RepairNotes</h4>
      {repairNotess.map((item) => (
        <RepairNote repairNote={item} key={item.id} />
      ))}
    </div>
  );
};

export default RepairNoteList;
