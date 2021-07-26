import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Landing from "./Landing";
import InventoryList from "./Inventory/InventoryList";
import InventoryDetail from "./Inventory/InventoryDetail";
import IssueTicketDetail from "./IssueTicket/IssueTicketDetail";

export default function ApplicationViews({ isLoggedIn, isAdmin }) {
  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Landing /> : <Redirect to="/login" />}
        </Route>

        {/* <Route exact path="/tags">
          
          {isLoggedIn && isAdmin ? (
            <TagList />
          ) : (
            [isLoggedIn && !isAdmin ? <Hello /> : <Redirect to="/login" />]
          )}
        </Route>

        <Route exact path="/tags/add">
         
          {isLoggedIn && isAdmin ? (
            <TagForm />
          ) : (
            [isLoggedIn && !isAdmin ? <Hello /> : <Redirect to="/login" />]
          )}
        </Route> */}

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        {/* <Route exact path="/category">
         
          {isLoggedIn && isAdmin ? (
            <CategoryList />
          ) : (
            [isLoggedIn && !isAdmin ? <Hello /> : <Redirect to="/login" />]
          )}
        </Route>

        <Route path="/category/add">
         
          {isLoggedIn && isAdmin ? (
            <CategoryForm />
          ) : (
            [isLoggedIn && !isAdmin ? <Hello /> : <Redirect to="/login" />]
          )}
        </Route> */}

        <Route exact path="/inventory">
          {isLoggedIn ? <InventoryList /> : <Redirect to="/login" />}
        </Route>
        <Route path="/inventory/:id(\d+)">
          {isLoggedIn ? <InventoryDetail /> : <Redirect to="/login" />}
        </Route>
        <Route path="/IssueTicket/:id(\d+)">
          {isLoggedIn ? <IssueTicketDetail /> : <Redirect to="/login" />}
        </Route>
        {/* <Route exact path="/myPost">
          {isLoggedIn ? <MyPost /> : <Redirect to="/login" />}
        </Route>
        <Route path="/post/add">
          {isLoggedIn ? <PostForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/post/:id(\d+)" exact>
          {isLoggedIn ? <PostDetails /> : <Redirect to="/login" />}
        </Route> */}

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
        </Route>
        <Route path="/users/deactivated">
          {isLoggedIn && isAdmin ? (
            <DeactivatedUsers />
          ) : (
            [isLoggedIn && !isAdmin ? <Hello /> : <Redirect to="/login" />]
          )}
        </Route> */}
      </Switch>
    </main>
    //EXACT PATH can be used when routes begin the same
  );
}
