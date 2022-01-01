import React, { useEffect, useState } from 'react';

function ListOfUsers({ users, rooms, setRoom }) {
  const userName = sessionStorage.getItem('userName'); // get username

  let arrWithoutUsername = users.filter(user => user.name !== userName);

  return (
    <ul>
      {arrWithoutUsername.map(user => {
        return (
          <li key={user.id}>
            <div>
              <h3>
                <span className="status black"></span>
                {user.name}
              </h3>
            </div>
          </li>
        );
      })}
      {rooms.map(room => {
        return (
          <div key={room} className="room" onClick={() => setRoom(room)}>
            {room}
          </div>
        );
      })}
    </ul>
  );
}

export default ListOfUsers;
