import React,{useState} from 'react';
import { useNavigate } from "react-router-dom";
import digital from './images/image289.jpg'
import './signIn.css'
function SignIn() {
    let [data, setdata] = useState({
        email: "",
        password: "",
      });
    
      let [error, setError] = useState("");
      const navigate = useNavigate();
      function navigateSignup(){
        navigate('/signup')
      }
    
      async function formSubmit(e) {
        e.preventDefault();
    
        if (!data.email && !data.password) {
          setError("Filled should be not empty");
        } else if (!data.email) {
          setError("Email should not be empty");
        } else if (!data.password) {
          setError("passwordd should not be empty");
        } else if (data.password.length < 3) {
          setError("password should not be less than 3 character");
        } else if (data.password.length > 10) {
          setError("password should not be more than 10 character");
        } else {
          try {
            let response = await fetch("http://localhost:8080/signin", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: data.email,
                password: data.password,
              }),
            });
    
            const responseData = await response.json();
    
            if (response.ok) {
              setError("");
    
              const token = responseData;
    
              sessionStorage.setItem("token", token);
              navigate("/home");
            alert("Success")
            } else {
              setError("Invalid credential");
            }
          } catch (error) {
            setError("An error occurred. Please try again later");
          }
        }
    
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    
  return (
    <div className="signin-container">
      <form onSubmit={formSubmit}>
      <div className="login-form">
        {/* Login form */}
        
        <img className='logo' src={digital} alt="Logo" />
       <p style={{paddingLeft:'150px'}}>Welcome to digital flake admin</p>
        <div className="form-container">
          <div className='input-container'>
          <label for="username" className="custom-label">Username : </label> <br />
          <input type="text" className='email' id='username' placeholder="Email"
           value={data.email}
           onChange={(e) => setdata({ ...data, email: e.target.value })} />
           <br />
           <label for="password" className="custom-label">Password : </label> <br />
          <input type="password" className='password' id='password' placeholder="Password" 
           value={data.password}
           onChange={(e) => setdata({ ...data, password: e.target.value })}/> 
          <div className='forgot'>
            <p style={{color:'blue',marginLeft:'65%',cursor:'pointer'}} onClick={()=>{navigate('/forgot-password')}}>forgot password?</p>
          </div>
          <button className='login-button' type='submit'>Login</button>
          <div>
          <p style={{paddingLeft:'100px'}}>Don't have an account <b style={{color:'blue',cursor:'pointer'}} onClick={navigateSignup}>Sign-up</b></p>
          </div>
          </div>
          
        </div>
      </div>
      <div className="image-background">
        {/* Image background */}
      </div>
      </form>
    </div>
  );
}

export default SignIn;
