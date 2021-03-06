import React, { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { logout } from "../modules/authManager";

export default function Header({ isLoggedIn, isAdmin }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="">
      <Navbar color="light" light expand="md">
        <img
          className="img-fluid "
          src={
            // eslint-disable-next-line no-native-reassign
            (require = `
              /images/vt5l.png
                 `)
          }
          alt="Tube Icon"
        ></img>
        <NavbarBrand className="mx-5" tag={RRNavLink} to="/">
          <strong>
            <h2>RepairTrack</h2>
          </strong>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <div className="row">
            <Nav className="d-flex justify-content-center" navbar>
              {/* When isLoggedIn === true, we will render these links */}
              {isLoggedIn && (
                <>
                  <NavItem className="mx-4">
                    <NavLink tag={RRNavLink} to="/inventory">
                      <h3>Inventory</h3>
                    </NavLink>
                  </NavItem>
                  <NavItem className="mx-4">
                    <NavLink
                      tag={RRNavLink}
                      className="nav-link"
                      to="/issueTicket"
                      activeClassName="active"
                    >
                      <h3>Issue Tickets</h3>
                    </NavLink>
                  </NavItem>
                  {/* <NavItem>
                  <NavLink tag={RRNavLink} className="nav-link" to="/post/add">
                    New Post
                  </NavLink>
                </NavItem> */}
                  {isAdmin && (
                    <>
                      <NavItem className="mx-4">
                        <NavLink tag={RRNavLink} to="/userProfile">
                          <h3>Users</h3>
                        </NavLink>
                      </NavItem>
                    </>
                  )}
                  <NavItem className="mx-4">
                    <a
                      aria-current="page"
                      className="nav-link"
                      style={{ cursor: "pointer" }}
                      onClick={logout}
                      href="/"
                    >
                      <h3>Logout</h3>
                    </a>
                  </NavItem>
                </>
              )}
              {!isLoggedIn && (
                <>
                  <NavItem>
                    <NavLink className="mx-4" tag={RRNavLink} to="/login">
                      <h3>Login</h3>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="mx-4" tag={RRNavLink} to="/register">
                      <h3>Register</h3>
                    </NavLink>
                  </NavItem>
                </>
              )}
            </Nav>
          </div>
        </Collapse>
        <img
          className="img-fluid "
          src={
            // eslint-disable-next-line no-native-reassign
            (require = `
              /images/vt5r.png
                 `)
          }
          alt="Tube Icon"
        ></img>
      </Navbar>
    </div>
  );
}
