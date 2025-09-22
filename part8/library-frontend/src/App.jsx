import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recommends from "./components/Recommends";
import Notification from "./components/Notification";
import { useApolloClient } from "@apollo/client";

const App = () => {
  const [page, setPage] = useState("authors");
  const [notification, setNotification] = useState({ message: null, isError: false });
  const notify = (message, isError = false) => {
    setNotification({ message, isError });
    setTimeout(() => setNotification({ message: null, isError: false }), 5000);
  };

  const [token, setToken] = useState(null);

  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("authors");
    notify("Logged out successfully", false);
  }

  return (
    <div>
      <Notification message={notification.message} isError={notification.isError} />
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ?
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={() => logout()}>logout</button>
          </>
          :
          <button onClick={() => setPage("login")}>login</button>
        }
      </div>

      <Authors show={page === "authors"} notify={notify} token={token} />

      <Books show={page === "books"} notify={notify} />

      <NewBook show={page === "add"} notify={notify} />

      <Recommends show={page === "recommend"} notify={notify} />

      <Login show={page === "login"} setToken={setToken} setPage={setPage} notify={notify} />
    </div>
  );
};

export default App;
