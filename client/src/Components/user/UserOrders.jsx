// src/components/UserOrders.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const UserOrders = ({ username }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/orders/${username}`
        );
        setOrders(response.data);
      } catch (error) {
        setError(
          error.response ? error.response.data : "Error fetching orders"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container p-4 text-white bg-gray-900">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-900 shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-left">
                Order ID
              </th>
              <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-left">
                Material ID
              </th>
              <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-left">
                Quantity
              </th>

              <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-left">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <td className="py-2 px-4 text-gray-700 dark:text-gray-300">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 text-gray-700 dark:text-gray-300">
                    {order.materialId}
                  </td>
                  <td className="py-2 px-4 text-gray-700 dark:text-gray-300">
                    {order.quantity}
                  </td>

                  <td className="py-2 px-4 text-gray-700 dark:text-gray-300">
                    {order.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  No orders.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserOrders;
