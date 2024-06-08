import React, { useEffect, useState } from "react";
import InventoryService from "../../services/InventoryService.js";
import InventoryIcon from "@mui/icons-material/Inventory";

export default function Inventory() {
  const [materials, setMaterials] = useState([]);
  const [addInv, setAddInv] = useState(true);
  const [newMaterial, setNewMaterial] = useState({
    locationNbr: "",
    materialId: "",
    resetQty: "",
    orderQty: "",
    availableQuantity: "",
    updateDateTime: "",
  });
  const [editingMaterial, setEditingMaterial] = useState(null);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleToggle = () => {
    setAddInv(!addInv);
  };

  const fetchMaterials = () => {
    InventoryService.getAllInventory().then((response) => {
      setMaterials(response.data);
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMaterial({ ...newMaterial, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingMaterial) {
      InventoryService.updateInventory(editingMaterial.id, newMaterial).then(
        () => {
          fetchMaterials();
          resetForm();
        }
      );
    } else {
      InventoryService.createInventory(newMaterial).then(() => {
        fetchMaterials();
        resetForm();
      });
    }
  };

  const handleEdit = (material) => {
    setEditingMaterial(material);
    setNewMaterial(material);
  };

  const handleDelete = (id) => {
    InventoryService.deleteInventory(id).then(() => {
      fetchMaterials();
    });
  };

  const resetForm = () => {
    setEditingMaterial(null);
    setNewMaterial({
      materialId: "",
      availableQuantity: "",
      updateDateTime: "",
    });
  };

  return (
    <div className="container mx-auto px-8 py-8 text-white bg-gray-900 h-full">
      <h2 className="text-2xl font-bold mb-6"></h2>

      {addInv ? (
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleToggle}
        >
          Add Inventory
        </button>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mb-6 p-4 border rounded shadow text-gray-500 `"
        >
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="materialId"
              placeholder="Material ID"
              value={newMaterial.materialId}
              onChange={handleInputChange}
              className="border p-2 rounded"
              required
            />

            <input
              type="number"
              name="availableQuantity"
              placeholder="Available Quantity"
              value={newMaterial.availableQuantity}
              onChange={handleInputChange}
              className="border p-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            {editingMaterial ? "Update Inventory" : "Add Inventory"}
          </button>

          <button
            className="mt-4 bg-red-500 ml-5 text-white px-4 py-2 rounded ml-4"
            onClick={() => {
              resetForm();
              handleToggle();
            }}
          >
            Close
          </button>
        </form>
      )}
      <table className="min-w-full border rounded shadow mt-10 text-white bg-gray-900 ">
        <thead>
          <tr className="bg-gray-800">
            <th className="py-2 px-4 text-left">ID</th>
            <th className="py-2 px-4 text-left">Material ID</th>
            <th className="py-2 px-4 text-left">Available Quantity</th>
            <th className="py-2 px-4 text-left">Total Sales</th>
            <th className="py-2 px-4 text-left">Update Date Time</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((material, index) => (
            <tr key={material.id} className="border-t border-gray-700">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{material.materialId}</td>
              <td className="py-2 px-4">{material.availableQuantity}</td>
              <td className="py-2 px-4">{material.totalSales}</td>
              <td className="py-2 px-4">{material.updateDateTime}</td>
              <td className="py-2 px-4 flex space-x-2">
                <button
                  onClick={() => {
                    handleEdit(material);
                    handleToggle();
                  }}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(material.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
