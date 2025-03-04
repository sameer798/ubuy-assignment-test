import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { FaGoogle, FaPaypal, FaApple, FaFacebook } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";

function Login({ setWelcome }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const emailHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setError("");

    // Validate email?
    if (!validateEmail(enteredEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Validate password
    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // For Sign Up, validate confirm password
    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    alert("Form submitted successfully!");
    navigate("/welcome");
    setWelcome(true);

    localStorage.setItem("welcome", "eccepted");

    setEnteredEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex items-center justify-center pt-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Welcome</h2>

          <div className="flex justify-between w-full mb-4">
            <button
              className={`p-3 w-[50%] rounded-l-md font-semibold ${
                isLogin
                  ? "bg-[#ffb100] text-black"
                  : "bg-[#eeeeee] text-[#999999]"
              }`}
              onClick={() => {
                setIsLogin(true);
                setShowSignUpPassword(false);
                setError("");
              }}
            >
              Login
            </button>
            <button
              className={`p-3 w-[50%] rounded-r-md font-semibold ${
                !isLogin
                  ? "bg-[#ffb100] text-black"
                  : "bg-[#eeeeee] text-[#999999]"
              }`}
              onClick={() => {
                setIsLogin(false);
                setShowSignUpPassword(false);
                setError("");
              }}
            >
              Sign Up
            </button>
          </div>

          <form className="space-y-6" onSubmit={submitHandler}>
            <div className="mb-2">
              <input
                value={enteredEmail}
                type="email"
                autoComplete="email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
                placeholder="Enter your email"
                onChange={emailHandler}
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
              <ul className="w-full sm:w-[40%] flex justify-between mb-2 sm:mr-2 items-center p-[12px]">
                <li className="flex-1">
                  <button
                    type="button"
                    className="w-full bg-[#ffb100] rounded-l-md p-[10px] font-semibold"
                    onClick={() => setShowSignUpPassword(true)}
                  >
                    Password
                  </button>
                </li>
                <li className="flex-1">
                  <button className="w-full bg-[#eeeeee] rounded-r-md p-[10px] font-semibold text-[#999999]">
                    OTP
                  </button>
                </li>
              </ul>

              {isLogin && (
                <div className="relative rounded-md shadow-sm w-full sm:w-[60%]">
                  <input
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your password"
                    onChange={passwordHandler}
                    value={password}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <EyeIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </div>
              )}

              {!isLogin && showSignUpPassword && (
                <div className="w-full sm:w-[60%]">
                  <div className="relative rounded-md shadow-sm mb-2">
                    <input
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your password"
                      onChange={passwordHandler}
                      value={password}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeSlashIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      ) : (
                        <EyeIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  </div>
                  <div className="relative rounded-md shadow-sm">
                    <input
                      type="password"
                      autoComplete="new-password"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Confirm your password"
                      onChange={confirmPasswordHandler}
                      value={confirmPassword}
                    />
                  </div>
                </div>
              )}
            </div>

            {!isLogin && (
              <ReCAPTCHA sitekey="6LcwFukqAAAAALyTcrN1SzHMf1Joz3ypdOEuIyfN" />
            )}

            {!isLogin && (
              <div className="flex mb-3 ">
                <input
                  className="form-control checkbox checkbox-primary"
                  type="checkbox"
                  id="example-checkbox"
                />
                <label
                  htmlFor="example-checkbox"
                  className="ml-2 text-[12px] text-[#999999] font-medium"
                >
                  Join Our Mailing List - Get updates on Rollbacks, special
                  pricing, hot new items, gift ideas, and more.
                </label>
              </div>
            )}

            
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {isLogin && (
              <p className="text-right underline text-sm text-[#999999] font-bold hover:cursor-pointer">
                Forgot Your Password?
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-[#ffb100] text-black p-2 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
            </div>

            <div className="border border-gray-200 flex flex-col justify-between p-4 rounded-md sm:flex-row">
              <div className="flex justify-center space-x-2 text-2xl">
                <FaGoogle className="text-red-500 hover:bg-[#ffb100] hover:rounded-full hover:p-1 hover:cursor-pointer" />
                <FaPaypal className="text-blue-500 hover:bg-[#ffb100] hover:rounded-full hover:p-1 hover:cursor-pointer" />
                <FaApple className="text-gray-500 hover:bg-[#ffb100] hover:rounded-full hover:p-1 hover:cursor-pointer" />
                <FaFacebook className="text-blue-600 hover:bg-[#ffb100] hover:rounded-full hover:p-1 hover:cursor-pointer" />
              </div>

              <div>
                <p className="font-bold text-center mt-2 sm:mt-0">
                  {isLogin ? "Login" : "Sign Up"} with Social Accounts
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
