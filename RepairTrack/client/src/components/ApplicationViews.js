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
import InventoryEdit from "./Inventory/InventoryEdit";
import UserProfileList from "./UserProfile/UserProfileList";
import UserProfileDetail from "./UserProfile/UserProfileDetail";

export default function ApplicationViews({ isLoggedIn, isAdmin }) {
  return (
    <main className="main">
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
          {isLoggedIn ? (
            <InventoryList isAdmin={isAdmin} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>

        <Route path="/inventory/:invId(\d+)">
          {isLoggedIn ? (
            <InventoryDetail isAdmin={isAdmin} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>

        <Route exact path="/inventory/add">
          {isLoggedIn && isAdmin ? (
            <InventoryForm />
          ) : (
            [isLoggedIn && !isAdmin ? <IssuesList /> : <Redirect to="/login" />]
          )}
        </Route>

        {/* <Route exact path="/inventory/add">
          {isLoggedIn ? <InventoryForm /> : <Redirect to="/login" />}
        </Route> */}

        <Route exact path="/inventory/edit/:invId(\d+)">
          {isLoggedIn ? <InventoryEdit /> : <Redirect to="/login" />}
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

        <Route exact path="/userProfile">
          {isLoggedIn && isAdmin ? (
            <UserProfileList />
          ) : (
            [isLoggedIn && !isAdmin ? <Landing /> : <Redirect to="/login" />]
          )}
        </Route>
        <Route path="/userProfile/:id(\d+)">
          {isLoggedIn && isAdmin ? (
            <UserProfileDetail />
          ) : (
            [isLoggedIn && !isAdmin ? <Landing /> : <Redirect to="/login" />]
          )}
        </Route>
        <Route path="/userProfile/:id(\d+)">
          {isLoggedIn && isAdmin ? (
            <UserProfileDetail />
          ) : (
            [isLoggedIn && !isAdmin ? <Landing /> : <Redirect to="/login" />]
          )}
        </Route>
      </Switch>
    </main>
  );
}
