import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import './LoginScreenStyle.css';

function LoginScreen({ setUserData }) {
  const [userdata, setUserdata] = useState({
    userEmail: '',
    password: ''
  });
  const navigation = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserdata((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User entered data is:", userdata);
    axios.post('http://localhost:7000/login', userdata)
      .then((response) => {
        console.log(response.data);
        if (response.data.message === "Login Successful") {
          alert("Login Successful");
          console.log(response.data);
          setUserData(response.data.userData);
          localStorage.setItem('userData', JSON.stringify(response.data.userData));
          navigation('/gem');
        } else {
          alert("Login Failed");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='main_container'>
      <div className='login_container'>
        <div className="login_image">
            <img className='image' src={require('../../Assests/images.jpg')} alt="login_image" /> 
        </div>
        <form className='login_form' onSubmit={handleSubmit}>
          <h2>Login Form</h2>
          <div className="input_container">
            <FontAwesomeIcon icon={faUser} className="icon" />
            <input
              type="text"
              name="userEmail"
              placeholder="User Email"
              value={userdata.userEmail}
              onChange={handleChange}
              className="input_field"
            />
          </div>
          <div className="input_container">
            <FontAwesomeIcon icon={faLock} className="icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userdata.password}
              onChange={handleChange}
              className="input_field"
            />
          </div>
          <button type="submit" className="login_button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginScreen;
