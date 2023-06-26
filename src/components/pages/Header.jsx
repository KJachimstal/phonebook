import { faAddressBook } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectCurrentUser, selectIsSignedIn } from 'redux/selectors';
import { singOut } from 'redux/session';

const Header = () => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector(selectIsSignedIn);
  const currentUser = useSelector(selectCurrentUser);

  const handleSingOut = () => {
    dispatch(singOut(currentUser.token));
  };

  return (
    <nav className="flex border-gray-200 bg-gray-900 mx-20">
      <div className="flex flex-wrap items-center py-4">
        <NavLink to="/" className="flex items-center">
          <FontAwesomeIcon
            icon={faAddressBook}
            className="h-8 mr-3 text-white"
          />
          <span className="self-center text-2xl font-bold text-white whitespace-nowrap">
            Phonebook
          </span>
        </NavLink>
      </div>
      <div className="flex ml-auto items-center py-4">
        {!isSignedIn ? (
          <>
            <NavLink
              to="/login"
              className="text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
            >
              Login
            </NavLink>
          </>
        ) : (
          <>
            <span className="mr-4 text-white font-semibold">
              {currentUser.user.name}
            </span>
            <button
              onClick={handleSingOut}
              className="text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
