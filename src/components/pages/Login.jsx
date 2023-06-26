import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from 'redux/session';
import { faAddressBook } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

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
              Sing in to your account
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 text-white"
                >
                  Your email
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 text-white"
                >
                  Password
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-800 hover:bg-primary bg-primary-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Login
              </button>
              <div className="flex items-center">
                <p className="block text-sm font-ligth text-gray-400">
                  Don't have an account yet?
                </p>
                <NavLink
                  to="/register"
                  className="block ml-2 font-medium text-primary-500 hover:underline"
                >
                  Sign up
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
