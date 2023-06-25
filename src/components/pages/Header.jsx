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
    <div>
      <nav>
        <NavLink to="/" className="font-bold underline">
          Phonebook
        </NavLink>
        {!isSignedIn ? (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        ) : (
          <>
            <span>{currentUser.user.name}</span>
            <button onClick={handleSingOut}>Logout</button>
          </>
        )}
      </nav>
    </div>
  );
};

export default Header;
