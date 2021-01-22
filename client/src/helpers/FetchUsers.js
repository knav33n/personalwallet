export const FetchUsers = () =>
  fetch("http://localhost:4650/users").then((resp) => resp.json());
