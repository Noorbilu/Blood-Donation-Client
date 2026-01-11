import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Line, Pie } from "react-chartjs-2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const VolunteerDashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboard-stats-volunteer"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard-stats").catch(() => null);
      if (res) return res.data;
      return { totalDonors: 0, totalFunding: 0, totalDonationRequests: 0 };
    },
  });

  const { data: reqs = [] } = useQuery({
    queryKey: ["volunteer-reqs"],
    queryFn: async () => {
      const r = await axiosSecure.get("/donation-requests").catch(() => ({ data: [] }));
      return r.data || [];
    },
  });

  const statusData = useMemo(() => {
    const m = { pending: 0, inprogress: 0, done: 0, canceled: 0 };
    reqs.forEach(r => { m[r.status] = (m[r.status] || 0) + 1; });
    return {
      labels: Object.keys(m),
      datasets: [{ data: Object.values(m), backgroundColor: ['#fbbf24','#3b82f6','#10b981','#ef4444'] }]
    };
  }, [reqs]);

  const timeData = useMemo(() => {
    const by = {};
    reqs.forEach(r => {
      const d = r.createdAt ? new Date(r.createdAt) : new Date(`${r.donationDate} ${r.donationTime || '00:00'}`);
      const k = d.toISOString().slice(0,10);
      by[k] = (by[k] || 0) + 1;
    });
    const labels = Object.keys(by).sort();
    return {
      labels,
      datasets: [{ label: 'Requests', data: labels.map(k => by[k]), borderColor: '#e11d48', backgroundColor: 'rgba(225,29,72,0.2)' }]
    };
  }, [reqs]);

  return (
    <div className="space-y-6">
      <div className="bg-base-100 shadow rounded-lg p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Welcome, {user?.displayName || "Volunteer"}
        </h1>
        <p className="text-sm opacity-70">Help manage and coordinate all blood donation requests.</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="stat bg-base-100 shadow rounded-lg">
            <div className="stat-title">Total Donors</div>
            <div className="stat-value text-primary">{stats?.totalDonors ?? 0}</div>
          </div>
          <div className="stat bg-base-100 shadow rounded-lg">
            <div className="stat-title">Total Funding</div>
            <div className="stat-value text-secondary">${((stats?.totalFunding || 0)/100).toFixed(2)}</div>
          </div>
          <div className="stat bg-base-100 shadow rounded-lg">
            <div className="stat-title">Total Requests</div>
            <div className="stat-value text-accent">{stats?.totalDonationRequests ?? 0}</div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        <div className="card p-4 md:col-span-2">
          <b>Requests (by day)</b>
          <Line data={timeData} options={{ responsive: true, maintainAspectRatio: false }} height={50} />
        </div>
        <div className="card p-4">
          <b>Status distribution</b>
          <Pie data={statusData} />
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboardHome;