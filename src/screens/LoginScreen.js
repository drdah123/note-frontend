import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import getError from '../ultis';
import FormInput from '../components/Preview/FormInput';

const SigninScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userInfo, setUserInfo] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        'http://localhost:3006/api/auth/login',
        {
          email,
          password,
        }
      );
      localStorage.setItem('userInfo', JSON.stringify(data.data));
      navigate('/');
      console.log(userInfo);
    } catch (error) {
      alert(getError(error));
    }
  };
  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem('userInfo')) || []);
    if (userInfo.length > 0) return navigate('/');
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h2>Login</h2>
      </div>
      <form className="form" id="from" onSubmit={submitHandler}>
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
        <button type="submit">Lgoin</button>
        <p>
          You do not have an account? <Link to="/register">register</Link>
        </p>
      </form>
    </div>
  );
};

export default SigninScreen;
