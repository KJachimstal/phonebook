import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from 'redux/session';
import { NavLink, Navigate } from 'react-router-dom';
import { selectIsSignedIn, selectSessionError } from 'redux/selectors';
import { resetErrors } from 'redux/actions';

export const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector(selectSessionError);
  const isSignedIn = useSelector(selectIsSignedIn);

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const action = await dispatch(signIn({ email, password }));

    if (signIn.fulfilled.match(action)) {
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
              Sing in to your account
            </h1>
            {error && (
              <p className="text-red-500 mt-2">Invalid email or password!</p>
            )}
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
