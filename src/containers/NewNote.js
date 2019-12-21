import React, { useRef, useState } from "react";
import { API } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./NewNote.css";
import { s3Upload } from "../libs/awsLib";

const NewNote = props => {
  const file = useRef(null);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => content.length > 0;

  const handleFileChange = e => {
    file.current = e.target.files[0];
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }
    setIsLoading(true);

    try {
      const attachment = file.current ? await s3Upload(file.current) : null;
      await createNote({ content, attachment });
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  };

  const createNote = note => {
    return API.post("notes", "/notes", {
      body: note
    });
  };

  return (
    <div className='NewNote'>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId='content'>
          <FormControl
            value={content}
            componentClass='textarea'
            onChange={e => setContent(e.target.value)}
          />
        </FormGroup>

        <FormGroup controlId='file'>
          <ControlLabel>Attachment</ControlLabel>
          <FormControl onChange={handleFileChange} type='file' />
        </FormGroup>

        <LoaderButton
          block
          type='submit'
          bsSize='large'
          bsStyle='primary'
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoaderButton>
      </form>
    </div>
  );
};

export default NewNote;
