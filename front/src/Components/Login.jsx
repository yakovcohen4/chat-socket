import React, { useRef, useState } from 'react';

function Login() {
  /***** useState *****/
  const [error, setError] = useState();

  /***** REFS *****/
  const userNameInput = useRef('');

  const login = () => {
    const userName = userNameInput.current.value;

    sessionStorage.setItem('userName', userName);
  };

  return (
    <div className="body">
      <div className="header">
        <div>
          Chat<span>App</span>
        </div>
      </div>

      <div className="user-input">
        <input
          ref={userNameInput}
          type="text"
          placeholder="Username"
          name="user"
          required
        />
        <input type="button" value="Log In" onClick={login}></input>
        <p>{error && <span className="err-mes">{error}</span>}</p>
      </div>
    </div>
  );
}

export default Login;
