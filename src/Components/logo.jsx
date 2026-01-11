import React from "react";

import logo from "../assets/logo.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/">
      <div className="flex items-center">
        <img src={logo} alt="" className="h-18 w-18" />
        <h3
          className="text-2xl font-bold -ms-4"
          style={{ color: "oklch(70.4% 0.191 22.216)" }}
        >
          RedHope
        </h3>
      </div>
    </Link>
  );
};

export default Logo;