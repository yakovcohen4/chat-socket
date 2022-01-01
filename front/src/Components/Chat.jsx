import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

//Components
import Messages from './Messages';
import SendMessage from './SendMessage';
import ListOfUsers from './ListOfUsers';

function Chat() {
  const name = sessionStorage.getItem('userName');

  const [users, setUsers] = useState([]);

  const rooms = ['general', 'room1', 'room2'];
  const [currentRoom, setRoom] = useState('general');

  // chat
  const [chat, setChat] = useState({ general: [], room1: [], room2: [] });

  const socketRef = useRef();

  // setTimeout(() => {
  useEffect(() => {
    console.log('ya');
    socketRef.current = io.connect('http://localhost:4000', {
      auth: { user: name, room: currentRoom },
    });

    socketRef.current.on('online', connectedUsers => {
      console.log(connectedUsers);
      setUsers(connectedUsers);
    });

    // rooms
    socketRef.current.on('create', ({ currentRoom }) => {
      console.log(currentRoom);
      // setUsers(connectedUsers);
    });

    socketRef.current.on('messageBack', ({ name, message, room }) => {
      console.log(name, message, room);
      switch (room) {
        case 'general':
          setChat(prevState => {
            return {
              ...prevState,
              general: [...prevState.general, { name, message }],
            };
          });
          break;
        case 'room1':
          setChat(prevState => {
            return {
              ...prevState,
              room1: [...prevState.room1, { name, message }],
            };
          });
          break;
        case 'room2':
          setChat(prevState => {
            return {
              ...prevState,
              room2: [...prevState.room2, { name, message }],
            };
          });
          break;
        default:
          return chat;
      }
    });

    // return () => socketRef.current.disconnect();
  }, []);

  return (
    <div className="chat-room">
      <div className="messages-list">
        <Messages chat={chat} room={currentRoom} />
      </div>
      <div className="message-input">
        <SendMessage socketRef={socketRef} room={currentRoom} />
      </div>
      <div className="members-list">
        <h2>Contact List</h2>
        <ListOfUsers users={users} rooms={rooms} setRoom={setRoom} />
      </div>
    </div>
  );
}

export default Chat;
