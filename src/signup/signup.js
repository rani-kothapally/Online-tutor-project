import React, { useState } from "react";
import ReactDOM from "react-dom";


export default function Signup() {
  // React States
  const [errormessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === name && (
      <div className="error">{ }</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className='form'>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className='input-container'>
          <label>Confirm password</label>
          <input type='confirm password' name='confirm' required />
          {renderErrorMessage('confirm')}
        </div>
        <div className='input-container'>
          <label>Email</label>
          <input type='email' name='email' required />
          {renderErrorMessage('email')}
        </div>
        <div className='button-container'>
          <input type='submit' />
        </div>
      </form>

    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Signup</div>
        {isSubmitted ? <div>User is successfully siggned in</div> : renderForm}
      </div>
    </div>
  );
}
