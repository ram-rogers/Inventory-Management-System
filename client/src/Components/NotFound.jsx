import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/back");
  };

  return (
    <div className="bg-gray-900 h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-white mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-gray-300">Oops! Looks like you've hit a dead end.</p>
      <button
        className="mt-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={goBack}
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFoundPage;
