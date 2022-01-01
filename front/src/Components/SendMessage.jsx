import React, { useState } from 'react';

function SendMessage({ socketRef, room }) {
  const name = sessionStorage.getItem('userName');

  const [state, setState] = useState({ message: '' });

  const onTextChange = e => {
    setState({ ...state, message: e.target.value });
  };

  const onMessageSubmit = e => {
    e.preventDefault();
    const { message } = state;
    if (message === '') return;
    socketRef.current.emit('message', { name, message, room });
    setState({ message: '', name });
  };
  return (
    <div>
      <form onSubmit={onMessageSubmit}>
        <div className="send-message">
          <input
            name="message"
            onChange={e => onTextChange(e)}
            value={state.message}
            minLength={1}
            id="input-message"
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
