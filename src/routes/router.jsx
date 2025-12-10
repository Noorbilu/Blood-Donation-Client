import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layout/AuthLayout";
import Search from "../pages/PublicPage/Search";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import DashboardHome from "../pages/Dashboard/DashBoardHome/DashboardHome";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layout/DashboardLayout";
import Funding from "../pages/Funding/Funding";
import CreateDonationRequest from "../pages/Dashboard/CreateDonationRequest";
import MyDonationRequests from "../pages/Dashboard/MyDonationRequests";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "search",
        Component: Search,
      },
      {
        path: "funding",
        element: (
          <PrivateRoute>
            <Funding></Funding>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
        loader: async () => {
          const districts = await fetch("/districts.json").then((res) =>
            res.json()
          );
          const upazilas = await fetch("/upazilas.json").then((res) =>
            res.json()
          );

          return { districts, upazilas };
        },
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "create-donation-request",
        Component: CreateDonationRequest,
        loader: async () => {
          const districts = await fetch("/districts.json").then((res) =>
            res.json()
          );
          const upazilas = await fetch("/upazilas.json").then((res) =>
            res.json()
          );
          return { districts, upazilas };
        },
      },
      {
        path: "my-donation-requests",
        Component: MyDonationRequests,
      },
    ],
  },
]);