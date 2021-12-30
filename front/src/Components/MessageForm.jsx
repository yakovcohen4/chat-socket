import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

function MessageForm({ setChat }) {
  const name = sessionStorage.getItem('userName');

  const [state, setState] = useState({ message: '' });

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect('http://localhost:4000');

    socketRef.current.on('messageBack', ({ name, message }) => {
      setChat(prevState => {
        return [...prevState, { name, message }];
      });
    });

    // return () => socketRef.current.disconnect();
  }, []);

  const onTextChange = e => {
    setState({ ...state, message: e.target.value });
  };

  const onMessageSubmit = e => {
    e.preventDefault();
    const { message } = state;
    socketRef.current.emit('message', { name, message });
    setState({ message: '', name });
    console.log(state);
  };
  return (
    <div>
      <form onSubmit={onMessageSubmit}>
        <h1>Messenger</h1>
        <div>
          <label htmlFor="input-message">message: </label>
          <input
            name="message"
            onChange={e => onTextChange(e)}
            value={state.message}
            id="input-message"
            variant="outlined"
          />
        </div>
        <button>Send Message</button>
      </form>
    </div>
  );
}

export default MessageForm;
