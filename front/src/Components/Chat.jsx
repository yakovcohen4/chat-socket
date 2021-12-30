import React, { useState } from 'react';

//Components
import Messages from './Messages';
import SendMessage from './SendMessage';

function Chat() {
  const [chat, setChat] = useState([]);

  return (
    <div className="chat">
      <Messages chat={chat} />
      <SendMessage setChat={setChat} />
    </div>
  );
}

export default Chat;
