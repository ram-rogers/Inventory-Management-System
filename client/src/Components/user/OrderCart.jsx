import React, { useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const OrderCart = ({ cartItems, username, clearCart, removeFromCart }) => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handlePlaceOrder = async () => {
    const items = cartItems.map((item) => ({
      materialId: item.materialId,
      quantity: item.orderQty,
    }));

    try {
      setIsLoading(true);
      const response = await axios.post(
        `http://localhost:8080/api/orders?username=${username}`,
        items,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("Order placed successfully");
      clearCart();
      // Show success toast
      toast.success("Order placed successfully");
      setTimeout(() => {
        location.reload();
      }, 2000);
      console.log("Order placed successfully:", response.data);
    } catch (error) {
      setMessage(
        "Error placing order: " +
          (error.response ? error.response.data : error.message)
      );
      console.error(
        "Error placing order:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 ">
      <div className="order-cart bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
          Your Cart
        </h2>
        <ul className="mb-6">
          {cartItems.length === 0 ? (
            <li className="text-gray-500 dark:text-gray-400 text-center">
              Your Cart is Empty
            </li>
          ) : (
            cartItems.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-2"
              >
                <div>
                  <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                    {item.materialId}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">
                    Quantity: {item.orderQty}
                  </span>
                </div>
                <button
                  onClick={() => removeFromCart(index)}
                  className="ml-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Remove
                </button>
              </li>
            ))
          )}
        </ul>

        <button
          type="submit"
          disabled={isLoading}
          onClick={handlePlaceOrder}
          className="w-full py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition duration-300"
        >
          {isLoading ? "Loading..." : "Place Order"}
        </button>
        {message && (
          <p className="mt-4 text-center text-green-600 dark:text-green-400">
            {message}
          </p>
        )}

        {/* ToastContainer for showing toast notifications */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default OrderCart;
