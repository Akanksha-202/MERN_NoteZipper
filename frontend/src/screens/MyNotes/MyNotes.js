import React from "react";
import { Accordion, Badge, Button, Card, useAccordionButton } from "react-bootstrap";
import MainScreen from "../../components/MainScreen/MainScreen";
import { Link } from "react-router-dom";
import notes from '../../data/notes'

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log('totally custom!'),
  );

  return (
    <div
      style={{border:"none"}}
      onClick={decoratedOnClick}
    >
      {children}
    </div>
  );
}




function MyNotes() {
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      // Handle the delete operation here
    }
  };

  return (
    <MainScreen title={`Welcome Back Akanksha Jha...`}>
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }}>
          Create new Note
        </Button>
      </Link>
      <Accordion>
        {notes.map((note, index) => (
          <Card key={note._id} style={{ margin: 10 }}>
            <Card.Header style={{ display: "flex" }}>
              <span
                style={{
                  color: "black",
                  textDecoration: "none",
                  flex: 1,
                  cursor: "pointer",
                  alignSelf: "center",
                  fontSize: 18,
                }}
              >
                <CustomToggle variant="link" eventKey={index.toString()}>
                  {note.title}
                </CustomToggle>
              </span>
              <div>
                <Button href={`/note/${note._id}`}>Edit</Button>
                <Button
                  variant="danger"
                  className="mx-2"
                  onClick={() => deleteHandler(note._id)}
                >
                  Delete
                </Button>
              </div>
            </Card.Header>
            <Accordion.Collapse eventKey={index.toString()}>
              <Card.Body>
                <h4>
                  <Button variant="success" size="sm">
                    Category - {note.category}
                  </Button>
                </h4>
                <blockquote className="blockquote mb-0">
                  <p>{note.content}</p>
                  <footer className="blockquote-footer">
                    {/* Created on {note.createdAt.substring(0, 10)} */}
                  </footer>
                </blockquote>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
    </MainScreen>
  );
}

export default MyNotes;

