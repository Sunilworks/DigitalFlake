// ForgotPassword.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./forgot.css"

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate=useNavigate()
  const handleResetPassword = async () => {
    try {
      const response = await axios.post("http://localhost:8080/forgot-password", { email });
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage("Failed to send the reset link.");
    }
  };

  return (
    <div className="forgot-container">
      <h2 className="h2" style={{marginTop:'100px'}}>Did you forgot your password?</h2>
      <p className="p">Enter your email address we will send you reset link</p> 
      <label htmlFor="email">Email Address </label><br />
      <input
      className="forgot-email"
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div>
      <button className="reset-btn" onClick={handleResetPassword}>Send Reset Link</button>
      </div>
      <p>{message}</p>
      <div>
        <p className="back-to-login" onClick={()=>{navigate('/')}}>Back to login</p>
      </div>
    </div>
  );
}

export default ForgotPassword;
