import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

// Components
import Chat from './Chat';

function App() {
  const [state, setState] = useState({ message: '', name: '' });
  const [chat, setChat] = useState([]);

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
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = e => {
    e.preventDefault();
    const { name, message } = state;
    socketRef.current.emit('message', { name, message });
    setState({ message: '', name });
    console.log(state);
  };

  return (
    <div>
      <form onSubmit={onMessageSubmit}>
        <h1>Messenger</h1>
        <div className="name-field">
          <label htmlFor="name">name: </label>
          <input
            name="name"
            onChange={e => onTextChange(e)}
            value={state.name}
            label="Name"
          />
        </div>
        <div>
          <label htmlFor="name">message: </label>
          <input
            name="message"
            onChange={e => onTextChange(e)}
            value={state.message}
            id="outlined-multiline-static"
            variant="outlined"
            label="Message"
          />
        </div>
        <button>Send Message</button>
      </form>
      <Chat chat={chat} />
    </div>
  );
}

export default App;
