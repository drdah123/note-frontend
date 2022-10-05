import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import getError from '../ultis';
import FormInput from '../components/Preview/FormInput';
//import bcrypt from 'bcrypt';

const SignupScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [userInfo, setUserInfo] = useState(
    localStorage.getItem('userInfo') || {}
  );
  const [confirmPassword, setConfirmPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword)
      return alert('Passwords are not the same');
    try {
      // const { data } = await axios.post(
      //   'https://backend-2dcw.onrender.com/api/auth/register',
      //   {
      //     email,
      //     password,
      //     name,
      //   }
      // );
      localStorage.setItem('userInfo', JSON.stringify([email, password, name]));
      setUserInfo(JSON.parse(localStorage.getItem('userInfo')) || []);
      navigate('/');
      navigate('/');
    } catch (error) {
      alert(getError(error));
    }
  };
  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem('userInfo')) || []);
    if (userInfo.length > 0) {
      navigate('/');
    }
  }, []);
  return (
    <div className="container">
      <div className="header">
        <h2>Create Account</h2>
      </div>
      <form className="form" id="from" onSubmit={submitHandler}>
        <FormInput
          lable="Username"
          type="text"
          placeholder="ex.abdalrahman"
          id="username"
          onChange={(e) => setName(e.target.value)}
        />
        {/* / */}
        <FormInput
          lable="Email"
          type="email"
          placeholder="email@example.com"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {/*  */}
        <FormInput
          lable="Password"
          type="password"
          placeholder="Password"
          id="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {/*  */}
        <FormInput
          lable="Confirm Password"
          type="password"
          placeholder="confirmPassword"
          id="confirmPassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
        <p>
          alerdy have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignupScreen;
