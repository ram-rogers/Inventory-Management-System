import React, { useEffect, useState } from "react";
import InventoryService from "../../services/InventoryService.js";

const PendingOrders = () => {
  const [pendingOrders, setPendingOrders] = useState([]);

  const fetchPendingOrders = () => {
    InventoryService.orders()
      .then((response) => {
        console.log(response.data); // Log the response to inspect the structure
        setPendingOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pending orders:", error);
      });
  };

  const approveOrder = (orderId) => {
    InventoryService.approveOrder(orderId)
      .then((response) => {
        console.log(response.data);
        fetchPendingOrders();
      })
      .catch((error) => {
        console.error("Error approving order:", error);
      });
  };

  useEffect(() => {
    fetchPendingOrders();
  }, []);

  return (
    <div className="container mx-8 p-4 mt-10 ">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
        Orders Awaiting Approval
      </h2>
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
                Ordered By
              </th>
              <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-left">
                Status
              </th>

              <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {pendingOrders.length > 0 ? (
              pendingOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <td className="py-2 px-4 text-gray-700 dark:text-gray-300">
                    {order.id}
                  </td>
                  <td className="py-2 px-4 text-gray-700 dark:text-gray-300">
                    {order.materialId}
                  </td>
                  <td className="py-2 px-4 text-gray-700 dark:text-gray-300">
                    {order.quantity}
                  </td>
                  <td className="py-2 px-4 text-gray-700 dark:text-gray-300">
                    {order.name || "Unknown"}
                  </td>
                  <td className="py-2 px-4 text-gray-700 dark:text-gray-300">
                    {order.status}
                  </td>

                  <td className="py-2 px-4 text-gray-700 dark:text-gray-300">
                    <button
                      onClick={() => approveOrder(order.id)}
                      disabled={order.status === "Approved"}
                      className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 ${
                        order.status === "Approved" ? "cursor-not-allowed" : ""
                      }`}
                    >
                      {order.status === "Approved" ? "Approve" : "Approve"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  No pending orders.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingOrders;
