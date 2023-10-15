import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function Homepage() {
  const [user, setUser] = useState("");

  useEffect(() => {
    fetch("/api/users/")
      .then((res) => res.json())
      .then((body) => setUser(body["user"]));
  }, []);

  return (
    <div>
      <p>Homepage</p>
      <p>Hello {user}</p>
    </div>
  );
}

ReactDOM.render(<Homepage />, document.getElementById("page"));
