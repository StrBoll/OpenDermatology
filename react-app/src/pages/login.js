import React from 'react';
import LoginForm from '../components/loginForm';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
const navigate = useNavigate();


const handleLogin = async (credentials) => {

if (credentials.email === 'test@example.com' && credentials.password === 'password') {
navigate('/dashboard');   
    } else {
alert('Invalid email or password');  
  }
};

  return (
    <div>
<h2>Login</h2>
<LoginForm />
    </div>
  );
};

export default LoginPage;
