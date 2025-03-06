// useLoginLogic.js

import { useState } from "react";

const useLoginLogic = (navigate) => {
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

  const validateOtp = (otp) => {
    return otp.length > 0;
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

    if (optInputState) {
      // Validate OTP if in OTP state
      if (!validateOtp(enteredOtp)) {
        setErrorOtp("OTP is required.");
        return;
      }
    } else {
      // Validate password if not in OTP state
      if (!validatePassword(password)) {
        setErrorPassword("Password must be at least 6 characters long.");
        return;
      }

      // For Sign Up, validate confirm password
      if (!isLogin && password !== confirmPassword) {
        setErrorConfirmPassword("Passwords do not match.");
        return;
      }
    }

    // Validate ReCAPTCHA if registering
    if (!isLogin && !recaptchaValue) {
      setErrorRecaptcha("Please verify that you are not a robot.");
      return;
    }

    alert("Form submitted successfully!");
    navigate("/welcome");

    // Reset fields
    setEnteredEmail("");
    setPassword("");
    setConfirmPassword("");
    setEnteredOtp("");
    setRecaptchaValue(null);
  };

  return {
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    isLogin,
    setIsLogin,
    isPassword,
    setIsPassword,
    setPassword,
    setEnteredOtp,
    showSignUpPassword,
    setShowSignUpPassword,
    enteredEmail,
    password,
    confirmPassword,
    errorEmail,
    errorPassword,
    errorConfirmPassword,
    optInputState,
    enteredOtp,
    errorOtp,
    recaptchaValue,
    errorRecaptcha,
    emailHandler,
    otpHandler,
    passwordHandler,
    confirmPasswordHandler,
    handleRecaptchaChange,
    submitHandler,
    setOtpInputState,
  };
};

export default useLoginLogic;