import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <div>
        <span>Page doesn't exist!</span>
        <Link to="/">Return to main page</Link>
      </div>
    </>
  );
};

export default NotFound;
