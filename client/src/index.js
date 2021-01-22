import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, NavLink, Route, Switch } from "react-router-dom";
import "reset-css";
import AllTransactions from "./components/AllTransactions/AllTransactions";
import AllWallets from "./components/AllWallets/AllWallets";
import CheckBalance from "./components/CheckBalance/CheckBalance";
import ManageFunds from "./components/ManageFunds/ManageFunds";
import NewWallet from "./components/NewWallet/NewWallet";
import "./index.scss";

const App = () => {
  return (
    <Router>
      <header>Personal Wallet</header>
      <section className="app" style={{ display: "flex" }}>
        <aside className="sidebar">
          <NavLink exact={true} to="/">All Wallets</NavLink>
          <NavLink to="/new-wallet">New Wallet</NavLink>
          <NavLink to="/check-balance">Check Balance</NavLink>
          <NavLink to="/add-funds">Add Funds</NavLink>
          <NavLink to="/spend-funds">Spend Funds</NavLink>
          <NavLink to="/all-transactions">All Transactions</NavLink>
        </aside>
        <main className="main">
          <Switch>
            <Route exact path="/">
              <AllWallets />
            </Route>
            <Route path="/all-transactions">
              <AllTransactions />
            </Route>
            <Route path="/spend-funds">
              <ManageFunds fundTransferMethod="remove" />
            </Route>
            <Route path="/add-funds">
              <ManageFunds fundTransferMethod="add" />
            </Route>
            <Route path="/check-balance">
              <CheckBalance />
            </Route>
            <Route path="/new-wallet">
              <NewWallet />
            </Route>
          </Switch>
        </main>
      </section>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("personal-wallet"));
