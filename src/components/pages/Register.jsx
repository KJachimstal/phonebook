import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from 'redux/session';

export const Register = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = event => {
    setName(event.target.value);
  };

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

    dispatch(userCredentials);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        Name
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter name"
          value={name}
          onChange={handleNameChange}
        />
      </label>
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
      <button type="submit">Register</button>
    </form>
  );
};
