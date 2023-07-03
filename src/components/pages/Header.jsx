import { faAddressBook } from '@fortawesome/free-regular-svg-icons';
import {
  faBars,
  faRightFromBracket,
  faRightToBracket,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectCurrentUser, selectIsSignedIn } from 'redux/selectors';
import { singOut } from 'redux/session';

const Header = () => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector(selectIsSignedIn);
  const currentUser = useSelector(selectCurrentUser);
  const [isHidden, setIsHidden] = useState(true);

  const handleSingOut = () => {
    dispatch(singOut());
  };

  const handleClick = () => setIsHidden(state => !state);

  return (
    <nav className="border-gray-200 bg-gray-900 container mx-auto">
      <div className="flex">
        <div className="flex flex-wrap items-center p-4">
          <NavLink to="/phonebook" className="flex items-center">
            <FontAwesomeIcon
              icon={faAddressBook}
              className="h-8 mr-3 text-white"
            />
            <span className="self-center text-2xl font-bold text-white whitespace-nowrap">
              Phonebook
            </span>
          </NavLink>
        </div>
        <div className="flex ml-auto items-center p-4">
          {!isSignedIn ? (
            <>
              <NavLink
                to="/login"
                className="text-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-2 text-center mr-3 md:mr-0 hover:bg-blue-600 focus:ring-blue-800 transition-colors"
              >
                <FontAwesomeIcon icon={faRightToBracket} className="mr-2" />
                Sign in
              </NavLink>
            </>
          ) : (
            <>
              <div className="hidden md:block">
                <span className="mr-4 text-white font-semibold">
                  {currentUser.name}
                </span>
                <button
                  onClick={handleSingOut}
                  className="text-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-2 text-center mr-3 md:mr-0 hover:bg-blue-600 focus:ring-blue-800 transition-colors"
                >
                  <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" />
                  Sign out
                </button>
              </div>
              <div className="block md:hidden">
                <button
                  type="button"
                  className="inline-flex items-center p-2 ml-3 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 text-gray-400 hover:bg-gray-700"
                  onClick={handleClick}
                >
                  <FontAwesomeIcon icon={faBars} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className={`${isHidden ? `hidden` : ''} w-full px-1`}>
        <ul className="flex flex-col font-medium">
          <li className="rounded-lg bg-gray-800 border-gray-700 mb-2 p-2">
            <span className="mr-4 text-white font-semibold">
              {currentUser.name}
            </span>
          </li>
          <li className="rounded-lg bg-gray-800 border-gray-700 p-2">
            <button
              onClick={handleSingOut}
              className="text-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-center md:mr-0 hover:bg-blue-600 focus:ring-blue-800 transition-colors"
            >
              <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" />
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
