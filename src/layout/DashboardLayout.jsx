import React from "react"; 
import { Link, NavLink, Outlet } from "react-router";
import { IoCreateOutline } from "react-icons/io5";
import { IoMdGitPullRequest } from "react-icons/io";
import { SiGoogletasks } from "react-icons/si";
import { FaHome, FaUser, FaMoneyBill } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { role, roleLoading } = useRole();

  // Display role for header
  const displayRole =
    role === "admin" ? "Admin" : role === "volunteer" ? "Manager" : "User";

  return (
    <div className="drawer lg:drawer-open max-w-7xl mx-auto">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* Content */}
      <div className="drawer-content">
        {/* Top bar (mobile) */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4 font-semibold">
            Blood Donation Dashboard •{" "}
            <span className="opacity-70">{displayRole}</span>
          </div>
        </nav>

        {/* Routed content */}
        <div className="p-4 md:p-6">
          {roleLoading ? (
            <div className="flex justify-center items-center py-10">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          <ul className="menu w-full grow">
            {/* Home */}
            <li>
              <Link
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>

            {/* Dashboard home */}
            <li>
              <NavLink
                to="/dashboard"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Dashboard Home"
              >
                <FaHome />
                <span className="is-drawer-close:hidden">Dashboard Home</span>
              </NavLink>
            </li>

            {/* Profile */}
            <li>
              <NavLink
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Profile"
                to="/dashboard/profile"
              >
                <CgProfile />
                <span className="is-drawer-close:hidden">Profile</span>
              </NavLink>
            </li>

            {/* Role-specific sections */}
            {roleLoading && (
              <li>
                <span className="flex items-center gap-2">
                  <span className="loading loading-spinner loading-sm" />
                  <span className="is-drawer-close:hidden">Loading menu...</span>
                </span>
              </li>
            )}

            {/* Donor */}
            {!roleLoading && role === "donor" && (
              <>
                <li className="mt-2 menu-title is-drawer-close:hidden">
                  <span>User</span>
                </li>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Create Donation Request"
                    to="/dashboard/create-donation-request"
                  >
                    <IoCreateOutline />
                    <span className="is-drawer-close:hidden">
                      Create Donation Request
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Donation Requests"
                    to="/dashboard/my-donation-requests"
                  >
                    <IoMdGitPullRequest />
                    <span className="is-drawer-close:hidden">
                      My Donation Requests
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            {/* Admin */}
            {!roleLoading && role === "admin" && (
              <>
                <li className="mt-2 menu-title is-drawer-close:hidden">
                  <span>Admin</span>
                </li>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="All Users"
                    to="/dashboard/all-users"
                  >
                    <FaUser />
                    <span className="is-drawer-close:hidden">All Users</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="All Blood Donation Requests"
                    to="/dashboard/all-blood-donation-request"
                  >
                    <SiGoogletasks />
                    <span className="is-drawer-close:hidden">
                      All Blood Donation Requests
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Funding"
                    to="/dashboard/funding"
                  >
                    <FaMoneyBill />
                    <span className="is-drawer-close:hidden">Funding</span>
                  </NavLink>
                </li>
              </>
            )}

            {/* Volunteer (Manager) */}
            {!roleLoading && role === "volunteer" && (
              <>
                <li className="mt-2 menu-title is-drawer-close:hidden">
                  <span>Manager</span>
                </li>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="All Blood Donation Requests"
                    to="/dashboard/all-blood-donation-request"
                  >
                    <SiGoogletasks />
                    <span className="is-drawer-close:hidden">
                      All Blood Donation Requests
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Funding"
                    to="/dashboard/funding"
                  >
                    <FaMoneyBill />
                    <span className="is-drawer-close:hidden">Funding</span>
                  </NavLink>
                </li>
              </>
            )}

            {/* Footer button in sidebar */}
            <li className="mt-auto">
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
