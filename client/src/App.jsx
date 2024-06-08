import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom/dist";
import "./App.css";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Sign from "./Components/Sign";

import { Admin } from "./Components/admin/Admin";
import NotFoundPage from "./Components/NotFound";
import UserPage from "./Components/user/UserPage";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="text-white bg-gray-900 min-h-screen">
      <header className="">
        <Router>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route
              path="/register"
              element={<Register isLoggedIn={isLoggedIn} />}
            />

            <Route path="/admin" element={<Admin />} />
            <Route path="/home" element={<UserPage />} />

            <Route path="*" element={<Sign />} />
            <Route path="/back" element={<Sign />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
