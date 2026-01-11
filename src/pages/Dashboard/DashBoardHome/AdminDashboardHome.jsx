import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Line, Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

// ✅ Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const AdminDashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboard-stats-admin"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard-stats").catch(() => null);
      if (res) return res.data;

      const [users, reqs, funds] = await Promise.all([
        axiosSecure.get("/users").then(r => r.data).catch(() => []),
        axiosSecure.get("/donation-requests").then(r => r.data).catch(() => []),
        axiosSecure.get("/funding").then(r => r.data?.data || []).catch(() => []),
      ]);

      return {
        totalDonors: users.filter(u => u.role === "donor" || u.role === "user").length,
        totalFunding: funds.reduce((s, f) => s + (f.amount || 0), 0),
        totalDonationRequests: reqs.length,
      };
    },
  });

  const { data: reqs = [] } = useQuery({
    queryKey: ["admin-reqs"],
    queryFn: async () => {
      const r = await axiosSecure.get("/donation-requests").catch(() => ({ data: [] }));
      return r.data || [];
    },
  });

  // 🔵 Status Pie Chart
  const statusData = useMemo(() => {
    const map = { pending: 0, inprogress: 0, done: 0, canceled: 0 };
    reqs.forEach(r => (map[r.status] = (map[r.status] || 0) + 1));

    return {
      labels: Object.keys(map),
      datasets: [
        {
          data: Object.values(map),
          backgroundColor: ["#fbbf24", "#3b82f6", "#10b981", "#ef4444"],
        },
      ],
    };
  }, [reqs]);

  // 🔴 Line Chart (Requests by day)
  const timeData = useMemo(() => {
    const byDate = {};
    reqs.forEach(r => {
      const d = r.createdAt
        ? new Date(r.createdAt)
        : new Date(`${r.donationDate} ${r.donationTime || "00:00"}`);
      const key = d.toISOString().slice(0, 10);
      byDate[key] = (byDate[key] || 0) + 1;
    });

    const labels = Object.keys(byDate).sort();

    return {
      labels,
      datasets: [
        {
          label: "Requests",
          data: labels.map(l => byDate[l]),
          borderColor: "#e11d48",
          backgroundColor: "rgba(225,29,72,0.2)",
          tension: 0.3,
          fill: true,
        },
      ],
    };
  }, [reqs]);

  // 🩸 Bar Chart (Blood Groups)
  const bloodData = useMemo(() => {
    const groups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    const counts = groups.map(g => reqs.filter(r => r.bloodGroup === g).length);

    return {
      labels: groups,
      datasets: [
        {
          label: "Requests",
          data: counts,
          backgroundColor: "#334155",
        },
      ],
    };
  }, [reqs]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-base-100 shadow rounded-lg p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl font-bold">
          Welcome back, {user?.displayName || "Admin"}
        </h1>
        <p className="text-sm opacity-70">
          Overview of all blood donation activities.
        </p>
      </div>

      {/* Stats */}
      {isLoading ? (
        <div className="flex justify-center py-10">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="stat bg-base-100 shadow rounded-lg">
            <div className="stat-title">Total Donors</div>
            <div className="stat-value text-primary">
              {stats?.totalDonors ?? 0}
            </div>
          </div>

          <div className="stat bg-base-100 shadow rounded-lg">
            <div className="stat-title">Total Funding</div>
            <div className="stat-value text-secondary">
              ${((stats?.totalFunding || 0) / 100).toFixed(2)}
            </div>
          </div>

          <div className="stat bg-base-100 shadow rounded-lg">
            <div className="stat-title">Total Requests</div>
            <div className="stat-value text-accent">
              {stats?.totalDonationRequests ?? 0}
            </div>
          </div>
        </div>
      )}

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Line Chart */}
        <div className="card p-4 lg:col-span-2 h-64">
          <b className="block mb-2">Requests (by day)</b>
          <Line
            data={timeData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>

        {/* Pie Chart */}
        <div className="card p-4 h-64">
          <b className="block mb-2">Status distribution</b>
          <Pie
            data={statusData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>

        {/* Bar Chart */}
        <div className="card p-4 lg:col-span-3 h-64">
          <b className="block mb-2">By blood group</b>
          <Bar
            data={bloodData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
