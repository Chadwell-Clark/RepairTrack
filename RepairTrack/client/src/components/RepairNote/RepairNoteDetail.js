import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Badge,
  Label,
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
  const { repId, issId, invId } = useParams();

  const handleDelete = (e) => {
    e.preventDefault();
    deleteRepairNote(repairNote.id).then(
      history.push(`/issueTicket/${invId}/${issId}`)
    );
  };
  //   console.log(id);

  const partsOrdered = () => {
    if (repairNote.partsOrdered === 0) {
      ordered = <strong>Parts Not Ordered</strong>;
    } else if (repairNote.partsOrdered === 1) {
      ordered = <strong>Parts Ordered</strong>;
    } else if (repairNote.partsOrdered === 2) {
      ordered = <strong>Parts Not Needed</strong>;
    } else {
      ordered = <strong>Parts In Stock</strong>;
    }
  };

  useEffect(() => {
    getRepairNoteById(repId).then(setRepairNote);
    //   .then(setIssueId(repairNote.issueTicket?.id));
  }, [repId]);
  //   console.log("Repair Note", repairNote);

  if (!repairNote) {
    return null;
  }
  partsOrdered();

  return (
    <div className="container">
      <Card className="my-3 border-0 shadow">
        <CardBody>
          <div className="row ">
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
            <div className="col">
              <img
                className="img-fluid"
                src={
                  (require = `
              /images/${repairNote?.issueTicket?.inventory?.imageLoc}
                 `)
                }
              />
            </div>
          </div>
          <div className="row ">
            <h5 className="col">
              Serial Number:{" "}
              <strong>{repairNote.issueTicket?.inventory.serialNumber}</strong>
            </h5>
          </div>
          <div className="row ">
            <h5 className="col">
              Issue: <strong>{repairNote.issueTicket?.issue}</strong>
            </h5>
            {/* <Button
              className=""
              color="primary"
              tag={Link}
              to={`/repairNote/add/${invId}/${issId}`}
            >
              New Repair Note
            </Button>{" "} */}
          </div>
        </CardBody>
      </Card>
      <Card className="border-0">
        <div className="row justify-content-center">
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
      {/* {RepairNote.id !== undefined ? (
        <RepairNotesList RepairNote={RepairNote} />
      ) : null} */}
      <Card className="my-3 border-0 shadow">
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
            {/* <div className="col">?</div> */}
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
        <CardBody>
          <div className="row justify-content-between">
            <h4 className="col-4">Parts: {ordered} </h4>
            <Button
              className="col-2"
              color="warning"
              tag={Link}
              to={`/repairNote/edit/${invId}/${issId}/${repId}`}
              //   type="submit"
              //   onClick={handleClick}
            >
              Edit
            </Button>{" "}
            <Button
              className="col-2"
              color="danger"
              //   tag={Link}
              //   to={``}
              //   type="submit"
              onClick={handleDelete}
            >
              Delete
            </Button>{" "}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default RepairNoteDetail;
