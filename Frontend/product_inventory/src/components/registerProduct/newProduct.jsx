import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../side_navbar/SideNavbar';
import "./registerProduct.css"
const ProductForm = () => {
  const [formData, setFormData] = useState({
    id: '',
    category: '',
    product_name: '',
    mrp: '',
    pack_size: '',
    image: null,
    status: 'active',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
      console.log(formData)
    }
    try {
      const response = await axios.post('http://localhost:8080/categorypost', formDataToSend);
      if (response.status === 200) {
        // Successful response (status code 200)
        const data = response.data;
        // Handle the data here
        console.log('Data received:', data);
      } else {
        // Handle other successful status codes if needed
        console.log('Received a status code:', response.status);
      }
    } catch (error) {
      // Error occurred
      console.error('An error occurred:', error);
    
      if (error.response) {
        // Server responded with an error status code (e.g., 4xx, 5xx)
        console.error('Server responded with status code:', error.response.status);
        console.error('Error data:', error.response.data);
      }
    }
    
  
  };

  return (
    <>
    <Sidebar/>
    <div className='product-form-container'>
    <form className='product-form' onSubmit={handleSubmit}>
      <label className='product-label'>
        ID:
        <input className='product-form-input' type="text" name="id" value={formData.id} onChange={handleInputChange} />
      </label>
      <br />

      <label className='product-label'>
        Category:
        <input className='product-form-input' type="text" name="category" value={formData.category} onChange={handleInputChange} />
      </label>
      <br />

      <label className='product-label'>
        Product Name:
        <input className='product-form-input' type="text" name="product_name" value={formData.product_name} onChange={handleInputChange} />
      </label>
      <br />

      <label className='product-label'>
        MRP:
        <input className='product-form-input' type="number" name="mrp" value={formData.mrp} onChange={handleInputChange} />
      </label>
      <br />

      <label className='product-label'>
        Pack Size:
        <input className='product-form-input' type="number" name="pack_size" value={formData.pack_size} onChange={handleInputChange} />
      </label>
      <br />

      <label className='product-label'>
        Image:
        <input className='product-form-input' type="file" name="image" accept="image/*" onChange={handleImageChange} />
      </label>
      <br />

      <label className='product-label'>
        Status:
        <select name="status" value={formData.status} onChange={handleInputChange}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </label>
      <br />

      <button type="submit">Submit</button>
    </form>
    </div>
    
  </>
  );
};

export default ProductForm;
