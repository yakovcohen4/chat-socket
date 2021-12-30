import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//Style
import '../login-style.css';

function Login() {
  /***** useState *****/
  const [error, setError] = useState();

  /***** REFS *****/
  const userNameInput = useRef('');

  /***** useNavigate *****/
  const navigate = useNavigate();

  const login = async () => {
    const userName = userNameInput.current.value;

    try {
      if (!userName) {
        throw new Error('Username missing');
      }
      const response = await axios.post(`http://localhost:4000/users/login/`, {
        userName: userName,
      });

      if (response.status === 200) {
        sessionStorage.setItem('userName', userName);
        navigate('/chat');
      }
    } catch (error) {
      if (!error.response) {
        setError(error.message);
      }
      setError(error.response.data.error);
    }
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
          minLength={1}
          required
        />
        <input type="button" value="Log In" onClick={login}></input>
        <p>{error && <span className="err-mes">{error}</span>}</p>
      </div>
    </div>
  );
}

export default Login;
