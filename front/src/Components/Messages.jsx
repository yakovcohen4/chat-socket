import React from 'react';
import { nanoid } from 'nanoid';

function Messages({ chat, room }) {
  const userName = sessionStorage.getItem('userName'); // get username - me or you ?
  return (
    <div className="chat-comp" id="chat">
      <h1>Messages {room}</h1>
      {chat[room].map(({ name, message }) => (
        <div key={nanoid()}>
          <li
            className={
              message === 'connect' || message === 'disconnect'
                ? 'connect'
                : userName === name
                ? 'me'
                : 'you'
            }
          >
            <div>
              <div>{userName === name ? 'you' : name}</div>
            </div>
            <div>{message}</div>
          </li>
        </div>
      ))}
    </div>
  );
}

export default Messages;
