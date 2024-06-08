import React, { useEffect, useState } from "react";
import InventoryService from "../../services/InventoryService.js";

const UserDetails = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    InventoryService.viewUsers()
      .then((response) => {
        console.log(response.data); // Log the response to inspect the structure
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Users:", error);
      });
  };

  const makeAdmin = (id) => {
    InventoryService.makeAdmin(id)
      .then((response) => {
        console.log(response.data);
        fetchUsers();
      })
      .catch((error) => {
        console.error("Error Changing Role:", error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mx-8 p-4 mt-10 ">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
        User Details
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-900 shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-left">
                S.No
              </th>
              <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-left">
                Name
              </th>
              <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-left">
                Email
              </th>
              <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-left">
                DOB
              </th>
              <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-left">
                Contact
              </th>
              <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-left">
                Role
              </th>
              <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-left">
                Change Role
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <td className="py-2 px-4 text-gray-700 dark:text-gray-300">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 text-gray-700 dark:text-gray-300">
                    {user.name}
                  </td>
                  <td className="py-2 px-4 text-gray-700 dark:text-gray-300">
                    {user.email}
                  </td>
                  <td className="py-2 px-4 text-gray-700 dark:text-gray-300">
                    {user.dob}
                  </td>
                  <td className="py-2 px-4 text-gray-700 dark:text-gray-300">
                    {user.contact}
                  </td>
                  <td className="py-2 px-4 text-gray-700 dark:text-gray-300">
                    {user.role}
                  </td>
                  <td className="py-2 px-4 text-gray-700 dark:text-gray-300">
                    <button
                      onClick={() => makeAdmin(user.id)}
                      disabled={user.role === "admin"}
                      className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 ${
                        user.role === "admin" ? "cursor-not-allowed" : ""
                      }`}
                    >
                      Approve
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
                  No Users
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDetails;
