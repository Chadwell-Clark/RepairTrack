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

  const { id } = useParams();

  const handleDelete = (e) => {
    e.preventDefault();
    deleteRepairNote(repairNote.id).then(
      history.push(`/issueTicket/${repairNote.issueTicket?.id}`)
    );
  };
  //   console.log(id);

  useEffect(() => {
    getRepairNoteById(id).then(setRepairNote);
  }, [id]);
  //   console.log("Repair Note", repairNote);

  if (!repairNote) {
    return null;
  }

  return (
    <div className="container">
      <Card>
        <CardBody>
          <div className="row align-items-start">
            <h4 className="col">
              IssueTicket # <strong>{repairNote.issueTicket?.id}</strong>
            </h4>{" "}
            <h4 className="col">
              Manufacturer:{" "}
              <strong>{repairNote.issueTicket?.inventory.manufacturer}</strong>
            </h4>
            <h4 className="col">
              Model: <strong>{repairNote.issueTicket?.inventory.model}</strong>
            </h4>
            <div className="col">Image goes here</div>
            <h4 className="col">
              Serial Number:{" "}
              <strong>{repairNote.issueTicket?.inventory.serialNumber}</strong>
            </h4>
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
            <h4 className="col-9">PartsOrdered: </h4>
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
              tag={Link}
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
