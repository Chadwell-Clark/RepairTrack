import React from "react";
import IssuesList from "./IssueTicket/IssuesList";

export default function Landing() {
  return (
    <span
    // style={{
    //   position: "fixed",
    //   left: 0,
    //   right: 0,
    //   top: "50%",
    //   marginTop: "-0.5rem",
    //   textAlign: "center",
    // }}
    >
      <h1 className="m-5 text-center">
        <strong>Hello Chadwell this is Gamma</strong>
      </h1>
      <IssuesList />
    </span>
  );
}
