import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from 'redux/session';

export const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const userCredentials = {
      email: form.elements.email.value,
      password: form.elements.password.value,
    };

    dispatch(signIn(userCredentials));
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">
        Email
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Enter email"
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <label htmlFor="password">
        Password
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};
