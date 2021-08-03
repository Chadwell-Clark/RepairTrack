import React from "react";
import IssuesList from "./IssueTicket/IssuesList";

export default function Landing() {
  return (
    <span
    // style={{
    //   backgroundColor: "#34f35a",
    //   position: "fixed",
    //   left: 0,
    //   right: 0,
    //   top: "50%",
    //   marginTop: "-0.5rem",
    //   textAlign: "center",
    // }}
    >
      {/* <h1 className="m-5 text-center">
        <strong>Issue Tickets</strong>
      </h1> */}
      <IssuesList />
    </span>
  );
}
