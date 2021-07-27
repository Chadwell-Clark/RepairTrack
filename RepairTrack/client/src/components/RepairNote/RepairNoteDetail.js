import React, { useState, useEffect } from "react";
import { Button, Table, Card } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { getRepairNoteById } from "../../modules/repairNoteManager";

const RepairNoteDetail = () => {
  const [repairNote, setRepairNote] = useState({});

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    getRepairNoteById(id).then(setRepairNote);
  }, [id]);
  console.log("Repair Note", repairNote);

  if (!repairNote) {
    return null;
  }

  return (
    <div className="container">
      <Card>
        <div className="row align-items-start">
          <h3 className="col">
            IssueTicket# <strong>{repairNote.issueTicket?.id}</strong>
          </h3>{" "}
          <h3 className="col">
            Manufacturer:{" "}
            <strong>{repairNote.issueTicket?.inventory.manufacturer}</strong>
          </h3>
          <h3 className="col">
            Model: <strong>{repairNote.issueTicket?.inventory.model}</strong>
          </h3>
          <div className="col">Image goes here</div>
          <h3>
            Serial Number:{" "}
            <strong>{repairNote.issueTicket?.inventory.serialNumber}</strong>
          </h3>
        </div>
      </Card>
      {/* {RepairNote.id !== undefined ? (
        <RepairNotesList RepairNote={RepairNote} />
      ) : null} */}
      <Card>
        <div className="row align-items-start">
          <h3 className="col">
            RepairNote# <strong>{repairNote.id}</strong>
          </h3>{" "}
          <h3 className="col">
            Technician: <strong>{repairNote.userProfile?.fullName}</strong>
          </h3>
          <h3 className="col">
            Date Created: <strong>{repairNote.createDateTime}</strong>
          </h3>
          <div className="col">?</div>
          <h3>
            Notes: <strong>{repairNote.note}</strong>
          </h3>
        </div>
      </Card>
    </div>
  );
};

export default RepairNoteDetail;
