import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { FaGoogle, FaPaypal, FaApple, FaFacebook } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import "./LoginStyle.css";

function Login({ setWelcome }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isPassword, setIsPassword] = useState(true);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [optInputState, setOtpInputState] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [errorOtp, setErrorOtp] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [errorRecaptcha, setErrorRecaptcha] = useState("");

  const emailHandler = (e) => {
    setEnteredEmail(e.target.value);
    if (errorEmail) {
      setErrorEmail("");
    }
  };

  const otpHandler = (e) => {
    setEnteredOtp(e.target.value);
    if (errorOtp) {
      setErrorOtp("");
    }
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (errorPassword) {
      setErrorPassword("");
    }
  };

  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
    if (errorConfirmPassword) {
      setErrorConfirmPassword("");
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
    if (errorRecaptcha) {
      setErrorRecaptcha("");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // Reset error messages
    setErrorEmail("");
    setErrorPassword("");
    setErrorConfirmPassword("");
    setErrorOtp("");
    setErrorRecaptcha("");

    // Validate email
    if (!validateEmail(enteredEmail)) {
      setErrorEmail("Please enter a valid email address.");
      return;
    }

    // Validate password
    if (!validatePassword(password)) {
      setErrorPassword("Password must be at least 6 characters long.");
      return;
    }

    // For Sign Up, validate confirm password
    if (!isLogin && password !== confirmPassword) {
      setErrorConfirmPassword("Passwords do not match.");
      return;
    }

    // Validate OTP if in OTP state
    if (optInputState && !enteredOtp) {
      setErrorOtp("OTP is required.");
      return;
    }

    // Validate ReCAPTCHA if registering
    if (!isLogin && !recaptchaValue) {
      setErrorRecaptcha("Please verify that you are not a robot.");
      return;
    }

    alert("Form submitted successfully!");
    navigate("/welcome");
    setWelcome(true);

    localStorage.setItem("welcome", "accepted");

    // Reset fields
    setEnteredEmail("");
    setPassword("");
    setConfirmPassword("");
    setEnteredOtp("");
    setRecaptchaValue(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex items-center justify-center pt-10 px-1 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Welcome</h2>

          <div className="flex justify-between w-full mb-4">
            <button
              className={`p-3 w-[50%] rounded-l-sm font-semibold transition duration-300 ease-in-out ${
                isLogin ? "bg-[#ffb100] text-black" : "bg-[#eeeeee] text-[#999999]"
              }`}
              onClick={() => {
                setIsLogin(true);
                setShowSignUpPassword(false);
                setErrorEmail("");
                setErrorPassword("");
                setErrorConfirmPassword("");
                setErrorOtp("");
                setErrorRecaptcha("");
              }}
            >
              Login
            </button>
            <button
              className={`p-3 w-[50%] rounded-r-sm font-semibold transition duration-300 ease-in-out ${
                !isLogin ? "bg-[#ffb100] text-black" : "bg-[#eeeeee] text-[#999999]"
              }`}
              onClick={() => {
                setIsLogin(false);
                setOtpInputState(false);
                setShowSignUpPassword(true);
                setIsPassword(true);
                setErrorEmail("");
                setErrorPassword("");
                setErrorConfirmPassword("");
                setErrorOtp("");
                setErrorRecaptcha("");
              }}
            >
              Sign Up
            </button>
          </div>

          <form className="space-y-6" onSubmit={submitHandler}>
            <div className="form-floating mb-5">
              <input
                value={enteredEmail}
                type="email"
                autoComplete="email"
                className={`form-control required-entry validate-email email w-full p-1 px-3 border border-gray-300 rounded-md focus:outline-none ${enteredEmail ? "has-value" : ""}`}
                onChange={emailHandler}
              />
              <label htmlFor="email" className="absolute left-3 top-2 text-gray-500 transition-all duration-200 transform origin-left scale-100">Email Address *</label>
              {errorEmail && <p className="text-red-500 text-sm">{errorEmail}</p>}
            </div>

            <div className="flex max-w-2 mb-3">
              <div className="flex-1">
                <button
                  type="button"
                  className={`w-full rounded-l-sm p-[10px] font-semibold transition duration-300 ease-in-out ${isPassword ? "bg-[#ffb100] text-black" : "bg-[#eeeeee] text-[#999999]"}`}
                  onClick={() => {
                    setShowSignUpPassword(true);
                    setIsPassword(true);
                    setOtpInputState(false);
                  }}
                >
                  Password
                </button>
              </div>
              <div className="flex-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsPassword(false);
                    setShowSignUpPassword(false);
                    setOtpInputState(true);
                  }}
                  className={`w-full rounded-r-sm p-[10px] font-semibold transition duration-300 ease-in-out ${!isPassword ? "bg-[#ffb100] text-black" : "bg-[#eeeeee] text-[#999999]"}`}
                >
                  OTP
                </button>
              </div>
            </div>

            {isLogin && optInputState && (
              <div className="form-floating mb-5">
                <input
                  value={enteredOtp}
                  onChange={otpHandler}
                  type="text"
                  className={`form-control required-entry validate-email email w-full p-1 px-3 border border-gray-300 rounded-md focus:outline-none ${enteredEmail ? "has-value" : ""}`}
                />
                <label htmlFor="otp" className="absolute left-3 top-2 text-gray-500 transition-all duration-200 transform origin-left scale-100">OTP*</label>
                {errorOtp && <p className="text-red-500 text-sm">{errorOtp}</p>}
              </div>
            )}

            {!isLogin && optInputState && (
              <div className="form-floating mb-5">
                <input
                  value={enteredOtp}
                  onChange={otpHandler}
                  type="text"
                  className={`form-control required-entry validate-email email w-full p-1 px-3 border border-gray-300 rounded-md focus:outline-none ${enteredEmail ? "has-value" : ""}`}
                />
                <label htmlFor="otp" className="absolute left-3 top-2 text-gray-500 transition-all duration-200 transform origin-left scale-100">OTP*</label>
                {errorOtp && <p className="text-red-500 text-sm">{errorOtp}</p>}
              </div>
            )}

            {!optInputState && isLogin && isPassword && (
              <div className="form-floating mb-5">
                <input
                  value={password}
                  onChange={passwordHandler}
                  type={showPassword ? "text" : "password"}
                  className={`form-control required-entry validate-email email w-full p-1 px-3 border border-gray-300 rounded-md focus:outline-none ${password ? "has-value" : ""}`}
                />
                <label htmlFor="password" className="absolute left-3 top-2 text-gray-500 transition-all duration-200 transform origin-left scale-100">Enter Password*</label>
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 pt-1 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  )}
                </button>
                {errorPassword && <p className="text-red-500 text-sm">{errorPassword}</p>}
              </div>
            )}

            {!isLogin && showSignUpPassword && isPassword && (
              <div className="w-full sm:w-[100%]">
                <div className="form-floating mb-5">
                  <input
                    value={password}
                    onChange={passwordHandler}
                    type={showPassword ? "text" : "password"}
                    className={`form-control required-entry validate-email email w-full p-1 px-3 border border-gray-300 rounded-md focus:outline-none ${password ? "has-value" : ""}`}
                  />
                  <label htmlFor="password" className="absolute left-3 top-2 text-gray-500 transition-all duration-200 transform origin-left scale-100">Enter Password*</label>
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 pt-1 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    )}
                  </button>
                  {errorPassword && <p className="text-red-500 text-sm">{errorPassword}</p>}
                </div>

                <div className="form-floating mb-5">
                  <input
                    value={confirmPassword}
                    onChange={confirmPasswordHandler}
                    type={showConfirmPassword ? "text" : "password"}
                    className={`form-control required-entry validate-email email w-full p-1 px-3 border border-gray-300 rounded-md focus:outline-none ${confirmPassword ? "has-value" : ""}`}
                  />
                  <label htmlFor="confirm-password" className="absolute left-3 top-2 text-gray-500 transition-all duration-200 transform origin-left scale-100">Confirm Password*</label>
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 pt-1 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    )}
                  </button>
                  {errorConfirmPassword && <p className="text-red-500 text-sm">{errorConfirmPassword}</p>}
                </div>
              </div>
            )}

            {!isLogin && isPassword && (
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

            {!isLogin && (
              <div className="mb-4">
                <ReCAPTCHA
                  className="mb-0"
                  sitekey="6LdCPesqAAAAABq8f8rH3fSj3BZwdOAlXMNbEJ5L"
                  onChange={handleRecaptchaChange}
                />
                {errorRecaptcha && <p className="text-red-500 text-sm">{errorRecaptcha}</p>}
              </div>
            )}

            {isLogin && (
              <p className="text-right underline text-sm text-[#999999] font-bold hover:cursor-pointer">
                <a
                  href="https://accounts.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {isPassword ? "Forgot Password?" : "Get OTP?"}
                </a>
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-[#ffb100] text-black p-2 font-semibold rounded-sm focus:outline-none hover:cursor-pointer transition duration-300 ease-in-out"
            >
              {isLogin ? "Login" : "Register"}
            </button>

            <div className="border border-gray-200 flex flex-col justify-between p-4 rounded-md sm:flex-row">
              <div className="flex justify-center space-x-2 text-2xl">
                <a
                  href="https://www.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGoogle className="text-red-500 hover:bg-[#ffb100] hover:rounded-full hover:p-1 hover:cursor-pointer transition duration-300 ease-in-out" />
                </a>
                <a
                  href="https://www.paypal.com/in/home"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaPaypal className="text-blue-500 hover:bg-[#ffb100] hover:rounded-full hover:p-1 hover:cursor-pointer transition duration-300 ease-in-out" />
                </a>
                <a
                  href="https://www.apple.com/in/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaApple className="text-gray-500 hover:bg-[#ffb100] hover:rounded-full hover:p-1 hover:cursor-pointer transition duration-300 ease-in-out" />
                </a>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook className="text-blue-600 hover:bg-[#ffb100] hover:rounded-full hover:p-1 hover:cursor-pointer transition duration-300 ease-in-out" />
                </a>
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