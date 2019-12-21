import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Home.css";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

const Home = props => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const onLoad = async () => {
      if (!props.isAuthenticated) return;

      try {
        const notes = await loadNotes();
        setNotes(notes);
      } catch (e) {
        alert(e);
      }

      setIsLoading(false);
    };

    onLoad();
  }, [props.isAuthenticated]);

  const renderNotesList = notes =>
    [{}].concat(notes).map((note, i) =>
      i !== 0 ? (
        <LinkContainer key={note.noteId} to={`/notes/${note.noteId}`}>
          <ListGroupItem header={note.content.trim().split("\n")[0]}>
            {"Created: " + new Date(note.createdAt).toLocaleString()}
          </ListGroupItem>
        </LinkContainer>
      ) : (
        <LinkContainer key='new' to='/notes/new'>
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Create a new note
            </h4>
          </ListGroupItem>
        </LinkContainer>
      )
    );

  const loadNotes = () => API.get("notes", "/notes");

  const renderLander = () => (
    <div className='lander'>
      <h1>Scratch</h1>
      <p>A simple note taking app</p>

      <div>
        <Link to='/login' className='btn btn-info btn-lg'>
          Login
        </Link>
        <Link to='/signup' className='btn btn-success btn-lg'>
          Signup
        </Link>
      </div>
    </div>
  );

  const renderNotes = () => (
    <div className='notes'>
      <PageHeader>Your Notes</PageHeader>
      <ListGroup>{!isLoading && renderNotesList(notes)}</ListGroup>
    </div>
  );

  return (
    <div className='Home'>
      {props.isAuthenticated ? renderNotes() : renderLander()}
    </div>
  );
};

export default Home;
