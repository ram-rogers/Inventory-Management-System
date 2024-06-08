// src/components/InventoryList.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const InventoryList = ({ addToCart }) => {
  const [inventories, setInventories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/inventories")
      .then((response) => setInventories(response.data))
      .catch((error) => console.error("Error fetching inventories:", error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="inventory-list mb-8">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900 dark:text-gray-100">
          Available Inventories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inventories.map((inventory) => (
            <div
              key={inventory.id}
              className="p-6 bg-white dark:bg-gray-700 shadow-lg rounded-lg transform transition duration-500 hover:scale-105"
            >
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                {inventory.materialId}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Available Quantity: {inventory.availableQuantity}
              </p>
              <button
                onClick={() => addToCart(inventory)}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InventoryList;
