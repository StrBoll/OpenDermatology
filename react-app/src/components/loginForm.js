// src/components/LoginForm.js
import { Auth } from './auth';
import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

const handleSubmit = (e) => {
  e.preventDefault();
        onLogin({ email, password });
};

  return (
<form onSubmit={handleSubmit}>
  <div>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
  </div>
  <div>
  <label>Password:</label>
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      />
  </div>
  <button type="submit">Login</button>
</form>
  );
};

export default LoginForm;
