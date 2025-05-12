import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Navigate } from 'react-router-dom';
import { resetErrors } from 'redux/actions';
import { selectIsSignedIn, selectSessionError } from 'redux/selectors';
import { signUp } from 'redux/session';

export const Register = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isSignedIn = useSelector(selectIsSignedIn);
  const error = useSelector(selectSessionError);

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const action = await dispatch(signUp({ name, email, password }));

    if (signUp.fulfilled.match(action)) {
      const session = action.payload?.session;
      if (session?.access_token) {
        localStorage.setItem('userToken', session.access_token);
      }
    }
  };

  useEffect(() => {
    dispatch(resetErrors());
  }, [dispatch]);

  if (isSignedIn) {
    return <Navigate to="/phonebook" replace />;
  }

  return (
    <section className="bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md p-4 xl:p-0 bg-gray-800 border-gray-700">
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
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500
                  ${error.email && `border-red-700`} `}
                  type="text"
                  name="email"
                  id="email"
                  required
                  placeholder="Enter email"
                  value={email}
                  onChange={handleEmailChange}
                />
                {error.email && (
                  <p className="text-red-500 mt-2">Incorrect email</p>
                )}
              </label>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 text-white"
              >
                Password
                <input
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500
                  ${error.password && `border-red-700`}`}
                  type="password"
                  name="password"
                  id="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={handlePasswordChange}
                />
                {error.password && (
                  <p className="text-red-500 mt-2">
                    Password must contain at least 7 characters
                  </p>
                )}
              </label>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-800 hover:bg-primary bg-primary-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Register
              </button>
              <div className="flex items-center">
                <p className="block text-sm font-ligth text-gray-400">
                  Do you have account?
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
