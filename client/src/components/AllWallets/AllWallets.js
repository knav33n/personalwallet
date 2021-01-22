import React, { useEffect, useState } from "react";
import { FetchUsers } from "../../helpers/FetchUsers";

const AllWallets = () => {
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    FetchUsers().then((resp) => setWallets(resp));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>User Id</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Balance (Rs)</th>
        </tr>
      </thead>
      <tbody>
        {wallets &&
          wallets.map((w) => (
            <tr key={w.phone}>
              <td>{w.id}</td>
              <td>{w.username}</td>
              <td>{w.phone}</td>
              <td>{w.balance / 100}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default AllWallets;
