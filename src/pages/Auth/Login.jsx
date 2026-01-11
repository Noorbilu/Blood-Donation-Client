import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const DEMO_USER = {
  email: "laa@gmail.com",
  password: "Abc123@",
};

const Login = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { signInUser, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (data) => {
    try {
      setLoading(true);
      const result = await signInUser(data.email, data.password);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate(location.state || "/dashboard");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message || "Invalid email or password",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setValue("email", DEMO_USER.email);
    setValue("password", DEMO_USER.password);
    await handleLogin(DEMO_USER);
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await googleSignIn();
      Swal.fire({
        icon: "success",
        title: "Logged in with Google",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate(location.state || "/dashboard");
    } catch {
      Swal.fire({
        icon: "error",
        title: "Google Login Failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm mx-auto shadow-xl p-6">
      <h3 className="text-3xl font-bold text-center">Welcome Back</h3>
      <p className="text-center text-gray-500 mb-6">
        Login to your account
      </p>

      <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
        {/* Email */}
        <div>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="input input-bordered w-full"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
            className="input input-bordered w-full pr-10"
            placeholder="Password"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {errors.password && (
            <p className="text-red-500 text-xs">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Login Button */}
        <button
          disabled={loading}
          className="btn btn-neutral w-full"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Demo Login */}
      <button
        onClick={handleDemoLogin}
        className="btn btn-outline w-full mt-3"
      >
        Demo Login
      </button>

      {/* Google Login */}
      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline w-full mt-3 flex items-center justify-center gap-2"
      >
        <FaGoogle /> Continue with Google
      </button>

      <p className="text-center text-sm mt-4">
        New here?
        <Link to="/register" className="text-blue-500 ml-1 underline">
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default Login;
