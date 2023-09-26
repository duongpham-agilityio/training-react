import { useEffect, useState } from "react";
import "./App.css";

import { URL } from "./constants";

function App() {
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    const fetcher = async () =>
      fetch(`${URL.BaseURL}/user`)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setUser(res);
        });

    fetcher();
  }, []);

  if (!user) return <p>Loading...</p>;

  return <p>Name: {user.username}</p>;
}

export default App;
