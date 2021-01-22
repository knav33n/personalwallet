import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

const AllTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4650/transactions")
      .then((resp) => resp.json())
      .then((resp) => setTransactions(resp));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Date</th>
          <th>Amount (Rs)</th>
          <th>Balance (Rs)</th>
        </tr>
      </thead>
      <tbody>
        {transactions &&
          transactions.map((t) => (
            <tr key={`${t.id}${t.createdAt}`}>
              <td>{t.personal_wallet.username}</td>
              <td>{dayjs(t.createdAt).format("DD/MM/YYYY h:mm a")}</td>
              <td>
                {t.transaction_type === "add_funds" ? "+" : "-"}
                {t.amount / 100}
              </td>
              <td>{t.final_balance / 100}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default AllTransactions;
