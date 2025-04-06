
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Create() {
  const [formdata, setFormData] = useState({
    name: "",
    ingredients: "",
    timeToCook: "",
    steps: "",
    image: null,
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formdata,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formdata,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("You need to log in first", {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored',
      });
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    const formattedData = new FormData();
    formattedData.append("name", formdata.name);
    formattedData.append("ingredients", formdata.ingredients);
    formattedData.append("timeToCook", formdata.timeToCook);
    formattedData.append("steps", formdata.steps);

    if (formdata.image) {
      formattedData.append("image", formdata.image);
    }

    try {
      const response = await axios.post('http://localhost:3000/recipes', formattedData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        },
      });

      if (response.status === 200) {
        toast.success("Recipe Created. Go to home page", {
          position: toast.POSITION.TOP_CENTER,
          theme: 'colored',
        });
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      console.log("Error occurred in creating:", error);
      toast.error("Error, data is not valid", {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored',
      });
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/bg..jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        paddingTop: "30px",
        paddingBottom: "30px",
      }}
    >
      <h1 style={{ textAlign: "center", color: "white", textDecoration: "underline" }}>
        Create Recipe
      </h1>

      <div
        className='container'
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
          maxWidth: "700px",
          margin: "auto",
        }}
      >
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className='form-group'>
            <label>Enter Recipe name:</label>
            <input type='text' name='name' className='form-control' onChange={handleInput} required />
          </div>
          <br />
          <div className='form-group'>
            <label>Enter Recipe ingredients (comma-separated):</label>
            <input type='text' name='ingredients' className='form-control' onChange={handleInput} required />
          </div>
          <br />
          <div className='form-group'>
            <label>Time to cook:</label>
            <input type='text' name='timeToCook' className='form-control' onChange={handleInput} required />
          </div>
          <br />
          <div className='form-group'>
            <label>Enter steps required to make (separate by full stops '.'): </label>
            <textarea name="steps" className='form-control' onChange={handleInput} required></textarea>
          </div>
          <br />
          <div className='form-group'>
            <label>Upload Recipe Image:</label>
            <input type="file" name="image" className='form-control' onChange={handleFileChange} required />
          </div>
          <br />
          <button type='submit' className='btn btn-success w-100'>Submit Recipe</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Create;
