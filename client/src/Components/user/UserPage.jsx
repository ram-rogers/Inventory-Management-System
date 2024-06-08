// App.js
import React, { useState } from "react";
import Login from "../Login";
import Register from "../Register";
import UserDashboard from "./UserDashboard";
import NotFoundPage from "../NotFound";

function UserPage() {
  let name = localStorage.getItem("username");

  const [username, setUsername] = useState(name);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-4xl text-center">Inventory Management System</h1>
      <div className="">
        {username && <UserDashboard username={username} />}
        {!username && <NotFoundPage />}
      </div>
    </div>
  );
}

export default UserPage;
