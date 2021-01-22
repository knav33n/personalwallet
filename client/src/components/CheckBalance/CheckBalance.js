import React, { useEffect, useState } from "react";
import { FetchUsers } from "../../helpers/FetchUsers";

const CheckBalance = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [userBalance, setUserBalance] = useState();

  useEffect(() => {
    FetchUsers().then((resp) => {
      setUsers(resp);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserBalance();
    fetch(`http://localhost:4650/balance/${selectedUser}`)
      .then((resp) => resp.json())
      .then((resp) => {
        setSelectedUser();
        setUserBalance(resp);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="user">User</label>
        <select
          id="user"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option>Select a wallet</option>
          {users.map((u) => (
            <option key={u.phone} value={u.id}>{u.username}</option>
          ))}
        </select>
      </div>
      {userBalance && (
        <p className="success">
          Balance of {userBalance.username} is {userBalance.balance / 100}
        </p>
      )}
      <button>Get Balance</button>
    </form>
  );
};

export default CheckBalance;
