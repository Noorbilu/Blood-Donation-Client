import React from 'react';
import forbiddenPic from '../assets/error.jpg'; 
import { Link } from 'react-router';

const Forbidden = () => {
  return (
    <div className="bg-red-100 min-h-screen flex flex-col justify-center items-center text-center">
      
      <img
        className="w-1/4 mb-6"
        src={forbiddenPic}
        alt="Access Forbidden"
      />

      <h1 className="text-6xl font-bold text-red-900">
        Access Denied
      </h1>

      <p className="mt-5 text-gray-600 max-w-md">
        You do not have permission to access this page.  
        This area is restricted to protect blood donor information.
      </p>

      <Link to="/">
        <button className="btn mt-6 bg-gradient-to-r from-red-800 to-red-400 text-white border-none">
          Go to Home
        </button>
      </Link>

    </div>
  );
};

export default Forbidden;
