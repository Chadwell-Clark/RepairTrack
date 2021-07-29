import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Badge,
} from "reactstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  getRepairNoteById,
  deleteRepairNote,
} from "../../modules/repairNoteManager";

const RepairNoteDetail = () => {
  const [repairNote, setRepairNote] = useState({});
  const history = useHistory();
  let ordered = "";
  const { id } = useParams();

  const handleDelete = (e) => {
    e.preventDefault();
    deleteRepairNote(repairNote.id).then(
      history.push(`/issueTicket/${repairNote.issueTicket?.id}`)
    );
  };
  //   console.log(id);

  const partsOrdered = () => {
    if (repairNote.partsOrdered === 0) {
      ordered = "<strong>Parts Not Ordered</strong>";
    } else if (repairNote.partsOrdered === 1) {
      ordered = <strong>Parts Ordered</strong>;
    } else {
      ordered = "<strong>Parts Not Needed</strong>";
    }
  };

  useEffect(() => {
    getRepairNoteById(id).then(setRepairNote);
  }, [id]);
  //   console.log("Repair Note", repairNote);

  if (!repairNote) {
    return null;
  }
  partsOrdered();

  return (
    <div className="container">
      <Card>
        <CardBody>
          <div className="row align-items-start">
            <h5 className="col">
              IssueTicket # <strong>{repairNote.issueTicket?.id}</strong>
            </h5>{" "}
            <h5 className="col">
              Manufacturer:{" "}
              <strong>{repairNote.issueTicket?.inventory.manufacturer}</strong>
            </h5>
            <h5 className="col">
              Model: <strong>{repairNote.issueTicket?.inventory.model}</strong>
            </h5>
            <div className="col">Image goes here</div>
            <h5 className="col">
              Serial Number:{" "}
              <strong>{repairNote.issueTicket?.inventory.serialNumber}</strong>
            </h5>
            {/* <Button
              className="col"
              color="primary"
              tag={Link}
              to={`/repairNote`}
            >
              New Issue
            </Button>{" "} */}
            <Button
              className="col"
              color="primary"
              tag={Link}
              to={`/repairNote/add`}
            >
              New Repair Note
            </Button>{" "}
            <h5>
              Issue: <strong>{repairNote.issueTicket?.issue}</strong>
            </h5>
          </div>
        </CardBody>
      </Card>
      {/* {RepairNote.id !== undefined ? (
        <RepairNotesList RepairNote={RepairNote} />
      ) : null} */}
      <Card>
        <CardHeader>
          <div className="row align-items-start">
            <h4 className="col">
              RepairNote# <strong>{repairNote.id}</strong>
            </h4>{" "}
            <h4 className="col">
              Technician: <strong>{repairNote.userProfile?.fullName}</strong>
            </h4>
            <h4 className="col">
              Date Created: <strong>{repairNote.dateCreated}</strong>
            </h4>
            <div className="col">?</div>
          </div>
        </CardHeader>
        <CardBody>
          <h4>
            Notes: <strong>{repairNote.note}</strong>
          </h4>
        </CardBody>
        <CardBody>
          <h4>
            Parts Needed: <strong>{repairNote.partsNeeded}</strong>
          </h4>
        </CardBody>
        <CardFooter>
          <div className="row">
            <h4 className="col-9">PartsOrdered: {ordered}</h4>
            <Button
              className="col"
              color="warning"
              tag={Link}
              to={`/repairNote/edit/${repairNote.id}`}
              //   type="submit"
              //   onClick={handleClick}
            >
              Edit
            </Button>{" "}
            <Button
              className="col"
              color="danger"
              //   tag={Link}
              //   to={``}
              //   type="submit"
              onClick={handleDelete}
            >
              Delete
            </Button>{" "}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RepairNoteDetail;
