import React from 'react';

function ListOfUsers() {
  const listOfUsers = ['yakov', 'rama', 'yakov33'];
  const userName = sessionStorage.getItem('userName'); // get username
  const arrWithoutUsername = listOfUsers.filter(user => user !== userName);
  return (
    <ul>
      {arrWithoutUsername.map(user => {
        return (
          <li>
            <div>
              <h3>
                <span className="status black"></span>
                {user}
              </h3>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default ListOfUsers;
