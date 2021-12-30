import React, { useState } from 'react';

//Components
import Messages from './Messages';
import SendMessage from './SendMessage';
import ListOfUsers from './ListOfUsers';

function Chat() {
  const [chat, setChat] = useState([]);

  return (
    <div className="chat-room">
      <div className="messages-list">
        <Messages chat={chat} />
      </div>
      <div className="message-input">
        <SendMessage setChat={setChat} />
      </div>
      <div className="members-list">
        <h2>Contact List</h2>
        <ListOfUsers />
      </div>
    </div>
  );
}

export default Chat;
