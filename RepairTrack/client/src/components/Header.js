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
        <NavbarBrand className="mx-5" tag={RRNavLink} to="/">
          <strong>RepairTrack</strong>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto d-flex justify-content-around" navbar>
            {/* When isLoggedIn === true, we will render these links */}
            {isLoggedIn && (
              <>
                {/* <NavItem>
                  <NavLink tag={RRNavLink} to="/">
                    Home
                  </NavLink>
                </NavItem> */}
                <NavItem>
                  <NavLink tag={RRNavLink} to="/inventory">
                    Inventory
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={RRNavLink}
                    className="nav-link"
                    to="/issuetickets"
                  >
                    Issue Tickets
                  </NavLink>
                </NavItem>
                {/* <NavItem>
                  <NavLink tag={RRNavLink} className="nav-link" to="/post/add">
                    New Post
                  </NavLink>
                </NavItem> */}
                {/* {isAdmin && (
                  <>
                    <NavItem>
                      <NavLink tag={RRNavLink} to="/tags">
                        Tag Management
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={RRNavLink} to="/category">
                        Categories
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={RRNavLink} to="/users">
                        User Profiles
                      </NavLink>
                    </NavItem>
                  </>
                )} */}
                <NavItem>
                  <a
                    aria-current="page"
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                    onClick={logout}
                    href="/"
                  >
                    Logout
                  </a>
                </NavItem>
              </>
            )}
            {!isLoggedIn && (
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">
                    Register
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
