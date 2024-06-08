import React from "react";

import { Link } from "react-router-dom";

const Sign = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 text-gray-100">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition duration-500">
        <img
          className="mx-auto h-15 w-15"
          src="https://raw.githubusercontent.com/knztnt/InvSys/master/client/src/navbar-logo-blue.png"
          alt="Workflow"
        />
        <div className="flex items-center justify-center gap-9">
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sign;
