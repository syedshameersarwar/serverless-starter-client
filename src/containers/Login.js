import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useFormFields } from "../libs/hooksLib";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Login.css";

const Login = props => {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () =>
    fields.email.length > 0 && fields.password.length > 0;

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await Auth.signIn(fields.email, fields.password);
      props.userHasAuthenticated(true);
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  };

  return (
    <div className='Login'>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId='email' bsSize='large'>
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type='email'
            value={fields.email}
            onChange={handleFieldChange}
          />
        </FormGroup>

        <FormGroup controlId='password' bsSize='large'>
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type='password'
            value={fields.password}
            onChange={handleFieldChange}
          />
        </FormGroup>

        <LoaderButton
          block
          bsSize='large'
          disabled={!validateForm()}
          type='submit'
          isLoading={isLoading}
        >
          Login
        </LoaderButton>
      </form>
    </div>
  );
};

export default Login;
