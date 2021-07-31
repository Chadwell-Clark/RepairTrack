import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Landing from "./Landing";
import InventoryList from "./Inventory/InventoryList";
import InventoryDetail from "./Inventory/InventoryDetail";
import IssueTicketDetail from "./IssueTicket/IssueTicketDetail";
import IssueTicketForm from "./IssueTicket/IssueTicketForm";
import RepairNoteDetail from "./RepairNote/RepairNoteDetail";
import RepairNoteForm from "./RepairNote/RepairNoteForm";
import RepairNoteEdit from "./RepairNote/RepairNoteEdit";
import IssuesList from "./IssueTicket/IssuesList";
import IssueTicketEdit from "./IssueTicket/IssueTicketEdit";
import InventoryForm from "./Inventory/InventoryForm";

export default function ApplicationViews({ isLoggedIn, isAdmin }) {
  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Landing /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route exact path="/inventory">
          {isLoggedIn ? <InventoryList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/inventory/:invId(\d+)">
          {isLoggedIn ? <InventoryDetail /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/inventory/add">
          {isLoggedIn ? <InventoryForm /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/issueTicket">
          {isLoggedIn ? <IssuesList /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/issueTicket/:invId(\d+)/:issId(\d+)">
          {isLoggedIn ? <IssueTicketDetail /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/issueTicket/add/:invId(\d+)">
          {isLoggedIn ? <IssueTicketForm /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/issueTicket/edit/:invId(\d+)/:issId(\d+)">
          {isLoggedIn ? <IssueTicketEdit /> : <Redirect to="/login" />}
        </Route>

        <Route path="/repairNote/:invId(\d+)/:issId(\d+)/:repId(\d+)">
          {isLoggedIn ? <RepairNoteDetail /> : <Redirect to="/login" />}
        </Route>

        <Route path="/repairNote/add/:invId(\d+)/:issId(\d+)">
          {isLoggedIn ? <RepairNoteForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/repairNote/edit/:invId(\d+)/:issId(\d+)/:repId(\d+)">
          {isLoggedIn ? <RepairNoteEdit /> : <Redirect to="/login" />}
        </Route>

        {/* <Route exact path="/users">
          {isLoggedIn && isAdmin ? (
            <UserList />
          ) : (
            [isLoggedIn && !isAdmin ? <Hello /> : <Redirect to="/login" />]
          )}
        </Route>
        <Route path="/users/:id(\d+)">
          {isLoggedIn && isAdmin ? (
            <UserDetails />
          ) : (
            [isLoggedIn && !isAdmin ? <Hello /> : <Redirect to="/login" />]
          )}
        </Route> */}
      </Switch>
    </main>
  );
}
