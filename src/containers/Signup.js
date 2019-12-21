import React, { useState } from "react";
import { Auth } from "aws-amplify";
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import "./Signup.css";

const Signup = props => {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: ""
  });
  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  };

  const validateConfirmationForm = () => fields.confirmationCode.length > 0;

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const newUser = await Auth.signUp({
        username: fields.email,
        password: fields.password
      });
      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      if (e.code === "UsernameExistsException") {
        alert(
          "You are already registered. Resending the verification code to " +
            fields.email
        );
        await Auth.resendSignUp(fields.email);
        setNewUser({ username: fields.email, password: fields.password });
      } else alert(e.message);
      setIsLoading(false);
    }
  };

  const handleConfirmationSubmit = async e => {
    e.preventDefault();

    setIsLoading(true);

    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);

      props.userHasAuthenticated(true);
      props.history.push("/");
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  };

  const renderConfirmationSignup = () => (
    <form onSubmit={handleConfirmationSubmit}>
      <FormGroup controlId='confirmationCode' bsSize='large'>
        <ControlLabel>Confirmation Code</ControlLabel>
        <FormControl
          autoFocus
          type='tel'
          onChange={handleFieldChange}
          value={fields.confirmationCode}
        />
        <HelpBlock>Please check your email for the code.</HelpBlock>
      </FormGroup>

      <LoaderButton
        block
        type='submit'
        bsSize='large'
        isLoading={isLoading}
        disabled={!validateConfirmationForm()}
      >
        Verify
      </LoaderButton>
    </form>
  );

  const renderForm = () => (
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

      <FormGroup controlId='confirmPassword' bsSize='large'>
        <ControlLabel>Confirm Password</ControlLabel>
        <FormControl
          type='password'
          value={fields.confirmPassword}
          onChange={handleFieldChange}
        />
      </FormGroup>

      <LoaderButton
        block
        type='submit'
        bsSize='large'
        isLoading={isLoading}
        disabled={!validateForm()}
      >
        Signup
      </LoaderButton>
    </form>
  );

  return (
    <div>{newUser === null ? renderForm() : renderConfirmationSignup()}</div>
  );
};

export default Signup;
