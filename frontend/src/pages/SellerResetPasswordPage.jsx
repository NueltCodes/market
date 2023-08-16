import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { server } from "../server";
import styles from "../styles/styles";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SellerResetPasswordPage = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setTimeout(() => {
        setError(false); // Passing the event object
      }, 10000);
      return;
    }

    try {
      const response = await axios.post(`${server}/shop/reset-password`, {
        token,
        password,
      });
      console.log(response);
      if (response.data.message === "Password reset successful") {
        setSuccess(true);
      }
    } catch (error) {
      setError("Your token has expired!");
      setTimeout(() => {
        setError(false); // Passing the event object
      }, 10000);
      return;
    }
  };

  if (success) {
    return (
      <div className="w-screen h-screen flex justify-center items-center mx-auto p-3">
        <div>
          <p className="text-center font-bold text-lg">
            Password reset successful. You can now go to the login page on the
            app and login with your new password.{" "}
            <Link to="/shop-login" className="text-blue-600 pl-2">
              Login
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          New password
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleResetPassword}>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="confirm-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            {error && <p className="text-[crimson]">{error}</p>}

            {error === "Your token has expired!" && (
              <div className="text-sm">
                <Link to="/shop-resetPassword" className="text-blue-600 pl-2">
                  Token expired?
                </Link>
              </div>
            )}
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
            <div className={`${styles.normalFlex} w-full`}>
              <h4>Remebered password?</h4>
              <Link to="/shop-login" className="text-blue-600 pl-2">
                Login In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerResetPasswordPage;
