import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate, useLoaderData } from "react-router";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { districts, upazilas } = useLoaderData();

  const [filteredUpazila, setFilteredUpazila] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const isPasswordValid = (password) => {
    return (
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[^A-Za-z0-9]/.test(password) &&
      password.length >= 6
    );
  };

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setFilteredUpazila(
      upazilas.filter((u) => u.district_id == selectedDistrict)
    );
  };

  const handleRegistration = async (data) => {
    try {
      setLoading(true);

      // 1️⃣ Firebase registration
      await registerUser(data.email, data.password);

      // 2️⃣ Upload image
      let photoURL = "";
      if (data.photo?.[0]) {
        const formData = new FormData();
        formData.append("image", data.photo[0]);

        const imgRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`,
          formData
        );

        photoURL = imgRes.data.data.url;
      }

      // 3️⃣ Update Firebase profile
      await updateUserProfile({
        displayName: data.name,
        photoURL,
      });

      // 4️⃣ Prepare backend user
      const selectedDistrict = districts.find(
        (d) => d.id == data.district
      );

      const newUser = {
        name: data.name,
        email: data.email,
        avatar: photoURL,
        bloodGroup: data.bloodGroup,
        district: selectedDistrict?.name || "",
        upazila: data.upazila,
      };

      // 5️⃣ Save to backend (DO NOT BLOCK USER)
      const baseURL = import.meta.env.VITE_API_URL;

      axios
        .post(`${baseURL}/users`, newUser)
        .catch((err) =>
          console.warn("Backend user save failed:", err.message)
        );

      // 6️⃣ Success alert + redirect
      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "Welcome to Blood Donation 🩸",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate(location.state || "/dashboard");

    } catch (err) {
      console.error("Registration error:", err);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-md shadow-2xl p-6">
      <h3 className="text-3xl font-semibold text-center">
        Join Blood Donation Community 🩸
      </h3>
      <p className="text-center text-gray-500 mb-4">Create your account</p>

      <form className="space-y-4" onSubmit={handleSubmit(handleRegistration)}>
        {/* Name */}
        <input
          {...register("name", {
            required: "Name is required",
            minLength: { value: 5, message: "Minimum 5 characters" },
          })}
          className="input input-bordered w-full"
          placeholder="Your Name"
        />
        {errors.name && (
          <p className="text-red-500 text-xs">{errors.name.message}</p>
        )}

        {/* Photo */}
        <input
          type="file"
          {...register("photo", { required: "Photo is required" })}
          className="file-input file-input-bordered w-full"
        />
        {errors.photo && (
          <p className="text-red-500 text-xs">{errors.photo.message}</p>
        )}

        {/* Blood Group */}
        <select
          {...register("bloodGroup", { required: "Blood group required" })}
          className="select select-bordered w-full"
        >
          <option value="">Select Blood Group</option>
          {bloodGroups.map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>

        {/* District */}
        <select
          {...register("district", { required: "District required" })}
          onChange={handleDistrictChange}
          className="select select-bordered w-full"
        >
          <option value="">Select District</option>
          {districts.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        {/* Upazila */}
        <select
          {...register("upazila", { required: "Upazila required" })}
          className="select select-bordered w-full"
          disabled={!filteredUpazila.length}
        >
          <option value="">Select Upazila</option>
          {filteredUpazila.map((u) => (
            <option key={u.id} value={u.name}>
              {u.name}
            </option>
          ))}
        </select>

        {/* Email */}
        <input
          type="email"
          {...register("email", { required: "Email required" })}
          className="input input-bordered w-full"
          placeholder="Email"
        />

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Password required",
              validate: (v) =>
                isPasswordValid(v) ||
                "Min 6 chars, uppercase, lowercase & symbol required",
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
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password.message}</p>
        )}

        {/* Confirm Password */}
        <div className="relative">
          <input
            type={showConfirmPass ? "text" : "password"}
            {...register("confirmPassword", {
              validate: (v) =>
                v === watch("password") || "Passwords do not match",
            })}
            className="input input-bordered w-full pr-10"
            placeholder="Confirm Password"
          />
          <span
            onClick={() => setShowConfirmPass(!showConfirmPass)}
            className="absolute right-3 top-3 cursor-pointer"
          >
            {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button
          disabled={loading}
          className="btn btn-neutral w-full mt-2"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="text-center text-sm mt-4">
        Already have an account?
        <Link to="/login" className="text-blue-400 underline ml-1">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
