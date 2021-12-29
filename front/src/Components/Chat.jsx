import React from 'react';
import { nanoid } from 'nanoid';

function Chat({ chat }) {
  return (
    <div className="chat-comp">
      <h1>Chat</h1>
      {chat.map(({ name, message }) => (
        <div key={nanoid()} className="message">
          <h3>
            {name}: <span>{message}</span>
          </h3>
        </div>
      ))}
    </div>
  );
}

export default Chat;
