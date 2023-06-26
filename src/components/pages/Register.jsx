import { faAddressBook } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { signUp } from 'redux/session';

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
      name: form.elements.name.value,
      email: form.elements.email.value,
      password: form.elements.password.value,
    };

    dispatch(signUp(userCredentials));
  };
  return (
    <section className="bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <NavLink
          to="/"
          className="flex items-center mb-6 text-2xl font-bold text-white"
        >
          <FontAwesomeIcon icon={faAddressBook} className="w-8 h-8 mr-2" />
          <span>PhoneBook</span>
        </NavLink>
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div className="space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-white">
              Register new account
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 text-white"
              >
                Name
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder="Enter name"
                  value={name}
                  onChange={handleNameChange}
                />
              </label>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 text-white"
              >
                Your email
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  type="text"
                  name="email"
                  id="email"
                  required
                  placeholder="Enter email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </label>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 text-white"
              >
                Password
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  type="password"
                  name="password"
                  id="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </label>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-800 hover:bg-primary bg-primary-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Register
              </button>
              <div className="flex items-center">
                <p className="block text-sm font-ligth text-gray-400">
                  Do you have accound?
                </p>
                <NavLink
                  to="/login"
                  className="block ml-2 font-medium text-primary-500 hover:underline"
                >
                  Sign in
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
