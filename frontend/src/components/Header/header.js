import React from 'react'

import { Container, Form, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const linkStyle = {
  color: 'white',
  textDecoration: 'none', // To remove the underline
};

const header = () => {
  return (
    <Navbar bg='primary' expand="lg" variant='dark'>
      <Container>
        <Navbar.Brand>
          <Link to={'/'} style={linkStyle}>Note Zipper</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
            </Form>
            <Nav.Link href="/mynotes">
              <Link to={'/mynotes'} style={linkStyle}>My Notes</Link>
            </Nav.Link>
            <NavDropdown title="Name" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action4">
                My Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Logout
              </NavDropdown.Item>
            </NavDropdown>


          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default header
