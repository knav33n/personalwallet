import React, { useEffect, useState } from "react";
import { FetchUsers } from "../../helpers/FetchUsers";

const ManageFunds = ({ fundTransferMethod }) => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ user_id: "", amount: 0 });
  const { user_id, amount } = form;

  const [messages, setMessages] = useState({
    success: "",
    errors: [],
  });
  const { success, errors } = messages;

  useEffect(() => {
    FetchUsers().then((resp) => {
      setUsers(resp);
    });
  }, []);

  const handleSubmit = () => {
    const uri = `http://localhost:4650/${
      fundTransferMethod === "add" ? "add-funds" : "spend-funds"
    }`;
    const requestOptions = {
      method: "PUT",
      body: JSON.stringify(form),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    fetch(uri, requestOptions)
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.error || resp.errors) {
          console.log(resp);
          if (resp.error) {
            setMessages({ success: "", errors: [resp.error] });
          } else {
            setMessages({ success: "", errors: resp.errors });
          }
        } else {
          setForm({
            user_id: "",
            amount: 0,
          });
          setMessages({ success: "Funds updated successfully!!", errors: [] });
        }
      })
      .catch((e) => {
        console.log("error");
        setMessages({ success: "", errors: resp.errors });
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="user">User</label>
        <select
          id="user"
          value={user_id}
          onChange={(e) => setForm({ ...form, user_id: e.target.value })}
        >
          <option>Select a wallet</option>
          {users.map((u) => (
            <option key={u.phone} value={u.id}>{u.username}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          value={amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />
      </div>
      {errors &&
        errors.map((error) => <p className="error">{error.message}</p>)}
      {success && <p className="success">{success}</p>}
      <button>Submit</button>
    </form>
  );
};

export default ManageFunds;
