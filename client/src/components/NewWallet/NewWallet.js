import React, { useState } from "react";

function NewWallet() {
  const [form, setForm] = useState({
    username: "",
    phone: "",
    balance: 0,
  });

  const [messages, setMessages] = useState({
    success: "",
    errors: [],
  });
  const { username, phone, balance } = form;
  const { success, errors } = messages;

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessages({ success: "", errors: [] });
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    fetch("http://localhost:4650/user", requestOptions)
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.errors) {
          setMessages({ success: "", errors: resp.errors });
        } else {
          setForm({
            username: "",
            phone: "",
            balance: 0,
          });
          setMessages({ success: "New wallet was created!", errors: [] });
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
        <label htmlFor="name">Name *</label>
        <input
          id="name"
          value={username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="phone">Phone *</label>
        <input
          id="phone"
          value={phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="amount">Amount *</label>
        <input
          id="amount"
          value={balance}
          onChange={(e) => setForm({ ...form, balance: e.target.value })}
        />
      </div>
      {errors && errors.map((error) => <p className="error">{error.message}</p>)}
      {success && <p className="success">{success}</p>}
      <br />
      <button>submit</button>
    </form>
  );
}

export default NewWallet;
