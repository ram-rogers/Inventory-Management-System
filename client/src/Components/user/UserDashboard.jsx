// src/components/UserDashboard.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InventoryList from "./InventoryList";
import OrderCart from "./OrderCart";
import UserOrders from "./UserOrders";
import { toast } from "react-toastify";

const UserDashboard = ({ username }) => {
  const [cartItems, setCartItems] = useState([]);
  const [showOrders, setShowOrders] = useState(false);
  const navigate = useNavigate();

  const showOrdersTable = () => {
    setShowOrders(true);
  };

  const removeFromCart = (indexToRemove) => {
    const updatedCartItems = cartItems.filter(
      (_, index) => index !== indexToRemove
    );
    setCartItems(updatedCartItems);
  };

  const addToCart = (inventory) => {
    const existingItem = cartItems.find(
      (item) => item.materialId === inventory.materialId
    );
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.materialId === inventory.materialId
            ? { ...item, orderQty: item.orderQty + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...inventory, orderQty: 1 }]);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handleLogout = () => {
    toast.success("Logout Success");
    localStorage.removeItem("username");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
    console.log("Logout logic goes here");
  };

  return (
    <div className="user-dashboard p-4 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl mb-4 text-center">Welcome, {username}</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <InventoryList addToCart={addToCart} />
        <OrderCart
          cartItems={cartItems}
          username={username}
          clearCart={clearCart}
          removeFromCart={removeFromCart}
        />

        {showOrders ? (
          <UserOrders username={username} />
        ) : (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded m-4 w-2/4"
            onClick={showOrdersTable}
          >
            View Your Orders
          </button>
        )}
      </div>
      <button
        to="/login"
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded absolute top-0 right-0 m-4 "
      >
        Logout
      </button>
    </div>
  );
};

export default UserDashboard;
