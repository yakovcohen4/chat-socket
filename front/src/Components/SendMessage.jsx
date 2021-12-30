import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

function SendMessage({ setChat }) {
  const name = sessionStorage.getItem('userName');

  const [state, setState] = useState({ message: '' });

  const [users, setUsers] = useState('');
  console.log(users);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect('http://localhost:4000', {
      auth: { user: name },
    });

    socketRef.current.on('messageBack', ({ name, message }) => {
      setChat(prevState => {
        return [...prevState, { name, message }];
      });
    });

    socketRef.current.on('online', ({ listOfUsers }) => {
      setUsers(listOfUsers);
    });
    // });

    // return () => socketRef.current.disconnect();
  }, []);

  const onTextChange = e => {
    setState({ ...state, message: e.target.value });
  };

  const onMessageSubmit = e => {
    e.preventDefault();
    const { message } = state;
    if (message === '') return;
    socketRef.current.emit('message', { name, message });
    setState({ message: '', name });
    console.log(state);
  };
  return (
    <div>
      <form onSubmit={onMessageSubmit}>
        <div className="send-message">
          {/* <label htmlFor="input-message">message: </label> */}
          <input
            name="message"
            onChange={e => onTextChange(e)}
            value={state.message}
            minLength={1}
            id="input-message"
            // className="send-message"
          />
          <button className="send-btn">
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </form>
    </div>
  );
}

export default SendMessage;
