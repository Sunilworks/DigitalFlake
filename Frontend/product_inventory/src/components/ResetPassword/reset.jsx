// ResetPassword.js
import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

function ResetPassword({ match }) {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { token } = useParams();
  const handlePasswordReset = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/reset-password/${token}`, {
        password,
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage("Password reset successfull.");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handlePasswordReset}>Reset Password</button>
      <p>{message}</p>
    </div>
  );
}

export default ResetPassword;
