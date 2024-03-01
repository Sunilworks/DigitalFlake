import React, { useState } from "react";
import './registerProduct.css';
import { useNavigate } from "react-router-dom";
import Sidebar from '../side_navbar/SideNavbar'
function Postform() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
 
  const [form,setForm]=useState({myFile:""})
  const handleForm=(e)=>{
    console.log(e.target.value,e.target.name)
    setForm({
        ...form,
        [e.target.name]:e.target.value

    })
}
const handleFileUpload=async(e)=>{
  const file=e.target.files[0]
  const base64=await convertToBase64(file)
  setForm({...form,myFile:base64})
}
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:8080/userpost', {
      method: 'POST',
      body: form,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Data sent successfully:', data);
    } else {
      console.error('Failed to send data to the API:', data);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}; 
  function handleCancel() {
    navigate("/home");
  }

  return (
    <>
      <Sidebar />
      <div className="prnta">
        <div className="headersec">
          <h3>Create Product</h3>
          <section className="btnsec">
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleSubmit} >Next</button>
          </section>
        </div>
        {error !== "" && <div className="editerror">{error}</div>}

        <form className="frma" method="POST" onSubmit={handleSubmit}>
          <div className="leftsec">
            <label>Category</label>
            <br></br>
            <input
              type="text"
              placeholder="category"
              name="category"
              onChange={handleForm}
            ></input>
            <br />
            <label>Product_Name</label>
            <br />
            <textarea
              className="txtarea"
              placeholder="product"
              name="product_name"
              onChange={handleForm}
            ></textarea>
            
            <label>Status</label>
            <br />
            <select
              className="selection"
              name="status"
              onChange={handleForm}
            >
              <option disabled selected value="" className="default">
                Select
              </option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <div className="rightsec">
            <div className="date">
              <div className="startdate">
                <br />
                <label>MRP</label>
            <input
              type="number"
              placeholder="MRP"
              name="mrp"
              onChange={handleForm}
            ></input>  
              </div>
              <label>pack size</label>
            <input
              type="text"
              placeholder="Pack Size"
              name="pack_size"
              onChange={handleForm}
            ></input> 
            </div>
            
            <div>
              <label>
                Upload Image
                <input
                  className="imagefile"
                  type="file"
                  name="image"
                  onChange={(e)=>handleFileUpload(e)}
                ></input>
              </label>
              {/* <div className="copyimg">
                {" "}
                {selectedFile && (
                  <img className="imgsec" src="" alt="uploaded" />
                )}
              </div> */}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Postform;


function convertToBase64(file){
  return new Promise((resolve,reject)=>{
     const fileReader=new FileReader()
     fileReader.readAsDataURL(file)
     fileReader.onload=()=>{
         resolve(fileReader.result)
     }
     fileReader.onerror=(error)=>{
         reject(error)
     }
  })
}