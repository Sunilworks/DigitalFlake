import React,{useState,useRef} from 'react';
import { useNavigate } from "react-router-dom";
import digital from '../signInPage/images/image289.jpg'
import './signup.css'
function SignUp() {
    const [errs, setErrs] = useState("");
  const [data, setdata] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  let navigate = useNavigate();
  const mathchPassword = useRef();

  async function submitHandler(e) {
    e.preventDefault();
    // let confirmPass = mathchPassword.current.value;
    if (
      !data.name &&
      !data.email &&
      !data.phone &&
      !data.password
    ) {
      setErrs("All fields are required");
    } else if (!data.name) {
      setErrs(`Name shouldn't be empty`);
    } else if (!data.email) {
      setErrs(`Email shouldn't be empty`);
    } else if (!data.phone) {
      setErrs(`Phone Number shouldn't be empty`);
    }  else if (data.password.length < 3) {
      setErrs(`Passwords should not be less than 3 character`);
    } else if (data.password.length > 10) {
      setErrs(`Passwords should not be more than 10 character`);
    } else {
      try {
        const response = await fetch("http://localhost:8080/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: data.phone,
            password: data.password,
          }),
        });

        if (response.ok) {
            alert('Successfully registered')
          setErrs("");
          navigate("/");
          await response.json();
        } else {
          //..............................................................

          await response.text();
          if (response.status === 400) {
            setErrs("User already exists");
          }
        }
      } catch (error) {
        console.log("errdesc" + error);
      }
    }

    setTimeout(() => {
      setErrs("");
    }, 3000);
  }

    
  return (
    <div className="signin-container">
      <form onSubmit={submitHandler}>
      <div className="login-form">
        {/* Login form */}
        
        <img className='logo' src={digital} alt="Logo" />
       <p style={{paddingLeft:'150px'}}>Welcome to digital flake admin</p>
       <p style={{color:'red'}}>{errs}</p>
        <div className="form-container">
          <div className='signup-container'>
          <label htmlFor="name" style={{marginTop:'0px'}} className="custom-label">Name : </label> <br />
          <input type="text" className='email' id='name' placeholder="Name"
           value={data.name}
           onChange={(e) => setdata({ ...data, name: e.target.value })} />
           <br />
           <label htmlFor="email" className="custom-label">Email : </label> <br />
          <input type="email" className='password' id='email' placeholder="Email" 
           value={data.email}
           onChange={(e) => setdata({ ...data, email: e.target.value })}/> 
            <label htmlFor="phone" className="custom-label">Phone : </label> <br />
          <input type="tel" className='email' id='phone' placeholder="Phone number"
           value={data.phone}
           onChange={(e) => setdata({ ...data, phone: e.target.value })} />
            <label htmlFor="password" className="custom-label">Password : </label> <br />
          <input type="password" className='email' id='password' placeholder="Password"
           value={data.password}
           onChange={(e) => setdata({ ...data, password: e.target.value })} />
          
          <div className='forgot'>
            <p style={{color:'blue',marginLeft:'65%'}}>forgot password?</p>
          </div>
          <button className='signup-button' type='submit'>Sign Up</button>
         
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

export default SignUp;
