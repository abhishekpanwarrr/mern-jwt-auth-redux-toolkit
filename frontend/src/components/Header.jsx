import React from "react";
import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import {useSelector,useDispatch} from "react-redux"
import { useLoginMutation, useLogoutMutation } from "../slices/usersApiSlice";
import {logout} from"../slices/authSlice"
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"

const Header = () => {
  const dispatch = useDispatch()
  const {userInfo} = useSelector(state => state.auth)
  const [logoutApiCall] = useLogoutMutation()
  const navigate = useNavigate()

  const handleLogout = async() => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate("/")
    } catch (error) {
      console.log("Errror",error);
      toast.error(error.message || error.error)
    }
  }
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>MERN Auth</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {
                userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                ) :(
                  <>
                  <LinkContainer to="/login">
                  <Nav.Link>
                    <FaSignInAlt /> Sign In
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/signup">
                  <Nav.Link>
                    <FaSignOutAlt /> Sign Up
                  </Nav.Link>
                </LinkContainer>
                </>
                )
              }
             
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
