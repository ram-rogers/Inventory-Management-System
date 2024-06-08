import React, { useState } from "react";
import Inventory from "./Inventory";
import PendingOrders from "./PendingOrders";
import { useNavigate } from "react-router-dom";
import UserDetails from "./UserDetails";

export const Admin = () => {
  const [view, setView] = useState({
    inventory: true,
    orders: false,
    users: false,
  });
  const navigate = useNavigate();

  function showInventory() {
    setView({ inventory: true, orders: false, users: false });
  }

  function showOrders() {
    setView({ inventory: false, orders: true, users: false });
  }

  function showUsers() {
    setView({ inventory: false, orders: false, users: true });
  }

  const handleLogout = () => {
    toast.success("Logout Success");
    localStorage.removeItem("username");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
    console.log("Logout logic goes here");
  };

  return (
    <div className="flex h-full w-full">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white h-screen">
        <div className="p-4 text-center text-2xl font-semibold">
          Admin Dashboard
        </div>
        <nav>
          <ul>
            <li className="p-4 hover:bg-gray-700" onClick={showInventory}>
              <a href="#" className="flex items-center">
                <span className="material-icons">inventory</span>
                <span className="ml-2">Inventory</span>
              </a>
            </li>

            <li className="p-4 hover:bg-gray-700" onClick={showOrders}>
              <a href="#" className="flex items-center">
                <span className="material-icons">pending</span>
                <span className="ml-2">Orders</span>
              </a>
            </li>

            <li className="p-4 hover:bg-gray-700" onClick={showUsers}>
              <a href="#" className="flex items-center">
                <span className="material-icons">people</span>
                <span className="ml-2">Users</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <button
        to="/login"
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded absolute top-0 right-0 m-4"
      >
        Logout
      </button>

      {/* Main Content */}
      <div className="">
        {view.inventory && <Inventory />}
        {view.orders && <PendingOrders />}
        {view.users && <UserDetails />}
      </div>
    </div>
  );
};

export default Admin;
