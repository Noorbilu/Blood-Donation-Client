import React from "react";

import logo from "../assets/logo.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/">
      <div className="flex items-center">
        <img src={logo} alt="" className="h-20 w-20" />
        <h3 className="text-red-500 text-3xl font-bold -ms-4">
          RedHope
        </h3>
      </div>
    </Link>
  );
};

export default Logo;