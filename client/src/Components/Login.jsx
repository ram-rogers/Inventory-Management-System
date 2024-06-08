import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/user/login",
        formData
      );

      if (response.status === 200) {
        const userResponse = await axios.get(
          `http://localhost:8080/user/${formData.email}`
        );
        console.log(userResponse.data.role);

        toast.success(`Welcome ${userResponse.data.name}`);
        localStorage.setItem("username", userResponse.data.name);

        if (userResponse.data.role === "admin") {
          setTimeout(() => {
            navigate("/admin");
          }, 2000);
        } else {
          setTimeout(() => {
            navigate("/home");
          }, 2000);
        }
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Login failed");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center text-white bg-gray-900">
      <div className="min-h-screen flex items-center justify-center text-white py-12 px-4 sm:px-6 lg:px-8">
        <ToastContainer position="top-center" autoClose={5000} />

        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="h-15 w-15 pr-10"
              src="https://raw.githubusercontent.com/knztnt/InvSys/master/client/src/navbar-logo-blue.png"
              alt="Workflow"
            />
          </div>
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-100">
              Login to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={handleChange}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                />
              </div>

              <div className="pt-2">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={handleChange}
                  className="appearance-none rounded-none relative rounded-t-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isLoading ? "Loading..." : "Login"}
              </button>
            </div>
          </form>
          <div className="text-sm text-center mt-4">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Register here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
