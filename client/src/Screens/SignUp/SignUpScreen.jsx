import React, { useState } from 'react';
import axios from 'axios'

const SignUpForm = () => {
  const [image,setImage] = useState(null)
  const [userSignUpData, setUserSignUpData] = useState({
    userName: '',
    userEmail: '',
    userPassword: '',
    userMobile: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserSignUpData(prevState => ({
      ...prevState, 
      [name]: value
    }));
  };
  const handleImageChange = (event) => {
    setImage(event.target.files[0])
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    formData.append('userName', userSignUpData.userName);
    formData.append('userEmail', userSignUpData.userEmail);
    formData.append('userPassword', userSignUpData.userPassword);
    formData.append('userMobile', userSignUpData.userMobile);

    try {
      const response = await axios.post('http://localhost:7000/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Upload successful:', response.data);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="userName">Name:</label>
        <input
          type="text"
          id="userName"
          name="userName"
          value={userSignUpData.userName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="userEmail">Email:</label>
        <input
          type="email"
          id="userEmail"
          name="userEmail"
          value={userSignUpData.userEmail}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="userPassword">Password:</label>
        <input
          type="password"
          id="userPassword"
          name="userPassword"
          value={userSignUpData.userPassword}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="userMobile">Mobile:</label>
        <input
          type="text"
          id="userMobile"
          name="userMobile"
          value={userSignUpData.userMobile}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="image">Profile Picture:</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
