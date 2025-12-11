import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";


const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        console.log("Logged in user:", result.user);
        // dashboard এ পাঠাই
        navigate(location?.state || "/dashboard");
      })
      .catch((error) => {
        console.error(error);
        alert("Login failed. Check your credentials.");
      });
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl p-6">
      <h3 className="text-3xl text-center font-semibold">Welcome back</h3>
      <p className="text-center text-gray-500 mb-4">Please login</p>

      <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
        {/* Email Field */}
        <div className="flex flex-col">
          <label className="label font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input input-bordered w-full rounded-lg"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500 text-sm mt-1">Email is required</p>
          )}
        </div>

        {/* Password Field */}
        <div className="flex flex-col relative">
          <label className="label font-medium">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", { required: true, minLength: 6 })}
            className="input input-bordered w-full rounded-lg pr-10"
            placeholder="Password"
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.password?.type === "required" && (
            <p className="text-red-500 text-sm mt-1">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500 text-sm mt-1">
              Password must be 6 characters or longer
            </p>
          )}
        </div>

        <div className="text-right">
          <span className="text-sm text-gray-400">Forgot password?</span>
        </div>

        <button className="btn btn-neutral w-full mt-4 rounded-lg">
          Login
        </button>
      </form>

      <p className="text-center text-sm mt-4">
        New to Blood Donation?
        <Link
          state={location.state}
          className="text-blue-400 underline ml-1"
          to="/register"
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;