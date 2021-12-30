import React, { useState } from 'react';

// Components
import Chat from './Chat';
import MessageForm from './MessageForm';

function App() {
  const [chat, setChat] = useState([]);

  return (
    <div>
      <MessageForm setChat={setChat} />
      <Chat chat={chat} />
    </div>
  );
}

export default App;
