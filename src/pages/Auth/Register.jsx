import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate, useLoaderData } from "react-router";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setFilteredUpazila(
      upazilas.filter((u) => u.district_id == selectedDistrict)
    );
  };

  const handleRegistration = async (data) => {
    try {
      const profileImg = data.photo[0];

      // 1) Firebase user তৈরি
      const cred = await registerUser(data.email, data.password);
      const fbUser = cred.user;

      // 2) imgbb এ ছবি upload
      let photoURL = "";
      if (profileImg) {
        const formData = new FormData();
        formData.append("image", profileImg);

        const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key
          }`;

        const imgRes = await axios.post(image_API_URL, formData);
        photoURL = imgRes.data.data.url;
      }

      // 3) Firebase profile update
      const userProfile = {
        displayName: data.name,
        photoURL,
      };
      await updateUserProfile(userProfile);

      // 4) Backend এ user save
      const selectedDistrict = districts.find((d) => d.id == data.district);

      const newUser = {
        name: data.name,
        email: data.email,
        avatar: photoURL,
        bloodGroup: data.bloodGroup,
        district: selectedDistrict?.name || "",
        upazila: data.upazila,
      };

      console.log("New user to save:", newUser);

      const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";
      await axios.post(`${baseURL}/users`, newUser);

      // 5) success হলে dashboard এ পাঠাও
      navigate(location.state || "/dashboard");
    } catch (err) {
      console.error("Registration error:", err);
      alert("Registration failed, check console for details.");
    }
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-md shadow-2xl p-6">
      <h3 className="text-3xl font-semibold text-center">Welcome to Blood Donation</h3>
      <p className="text-center text-gray-500 mb-4">Please Register</p>

      <form className="space-y-4" onSubmit={handleSubmit(handleRegistration)}>
        {/* Name */}
        <div className="flex flex-col">
          <label className="label font-medium">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input input-bordered w-full rounded-lg"
            placeholder="Your Name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">Name is required.</p>
          )}
        </div>

        {/* Photo */}
        <div className="flex flex-col">
          <label className="label font-medium">Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input file-input-bordered w-full rounded-lg"
          />
          {errors.photo && (
            <p className="text-red-500 text-sm mt-1">Photo is required.</p>
          )}
        </div>

        {/* Blood Group */}
        <div className="flex flex-col">
          <label className="label font-medium">Blood Group</label>
          <select
            className="select select-bordered w-full rounded-lg"
            {...register("bloodGroup", { required: true })}
          >
            <option value="">Select Blood Group</option>
            {bloodGroups.map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
          {errors.bloodGroup && (
            <p className="text-red-500 text-sm mt-1">
              Blood group is required.
            </p>
          )}
        </div>

        {/* District */}
        <div className="flex flex-col">
          <label className="label font-medium">District</label>
          <select
            className="select select-bordered w-full rounded-lg"
            {...register("district", { required: true })}
            onChange={handleDistrictChange}
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
          {errors.district && (
            <p className="text-red-500 text-sm mt-1">District is required.</p>
          )}
        </div>

        {/* Upazila */}
        <div className="flex flex-col">
          <label className="label font-medium">Upazila</label>
          <select
            className="select select-bordered w-full rounded-lg"
            {...register("upazila", { required: true })}
            disabled={filteredUpazila.length === 0}
          >
            <option value="">Select Upazila</option>
            {filteredUpazila.map((u) => (
              <option key={u.id} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>
          {errors.upazila && (
            <p className="text-red-500 text-sm mt-1">Upazila is required.</p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="label font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input input-bordered w-full rounded-lg"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">Email is required.</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col relative w-full max-w-sm">
          <label className="label font-medium text-sm">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: true,
              minLength: 6,
              pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
            })}
            className="input input-bordered w-[calc(100%-2rem)] rounded-md h-9 pr-8 text-sm"
            placeholder="Password"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 text-sm"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {errors.password?.type === "required" && (
            <p className="text-red-500 text-xs mt-1">Password is required.</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500 text-xs mt-1">
              Password must be at least 6 characters.
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-500 text-xs mt-1">
              Password must include uppercase, lowercase, number & special char.
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col relative w-full max-w-sm">
          <label className="label font-medium text-sm">Confirm Password</label>
          <input
            type={showConfirmPass ? "text" : "password"}
            {...register("confirmPassword", {
              required: true,
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            className="input input-bordered w-[calc(100%-2rem)] rounded-md h-9 pr-8 text-sm"
            placeholder="Confirm Password"
          />
          <span
            onClick={() => setShowConfirmPass(!showConfirmPass)}
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 text-sm"
          >
            {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
          </span>
          {errors.confirmPassword?.type === "required" && (
            <p className="text-red-500 text-xs mt-1">
              Confirm Password is required.
            </p>
          )}
          {errors.confirmPassword?.message && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button className="btn btn-neutral w-full mt-4 rounded-lg">
          Register
        </button>
      </form>

      <p className="text-center text-sm mt-4">
        Already have an account?
        <Link
          state={location.state}
          className="text-blue-400 underline ml-1"
          to="/login"
        >
          Login
        </Link>
      </p>

    </div>
  );
};

export default Register;