import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const DonorDashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [selectedRequest, setSelectedRequest] = useState(null);

  const { data: requests = [], isLoading, refetch } = useQuery({
    queryKey: ["myRecentRequests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests?email=${user.email}`);
      return res.data;
    },
  });

  const recentRequests = useMemo(() => {
    if (!requests.length) return [];
    const sorted = [...requests].sort((a, b) => {
      const aDate = new Date(a.createdAt || `${a.donationDate} ${a.donationTime || "00:00"}`);
      const bDate = new Date(b.createdAt || `${b.donationDate} ${b.donationTime || "00:00"}`);
      return bDate - aDate;
    });
    return sorted.slice(0, 3);
  }, [requests]);

  const renderStatusBadge = (status) => {
    let cls = "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium";
    if (status === "pending") cls += " bg-amber-100 text-amber-700";
    else if (status === "inprogress") cls += " bg-sky-100 text-sky-700";
    else if (status === "done") cls += " bg-emerald-100 text-emerald-700";
    else if (status === "canceled") cls += " bg-rose-100 text-rose-700";
    else cls += " bg-gray-100 text-gray-700";
    return <span className={cls}>{status}</span>;
  };

  const updateStatus = async (request, newStatus) => {
    const result = await Swal.fire({
      title: `Mark as ${newStatus}?`,
      text: `This will change status from "${request.status}" to "${newStatus}".`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update",
    });
    if (!result.isConfirmed) return;
    try {
      await axiosSecure.patch(`/donation-requests/${request._id}`, { status: newStatus });
      await refetch();
      Swal.fire({ icon: "success", title: "Status updated", timer: 1200, showConfirmButton: false });
    } catch {
      Swal.fire({ icon: "error", title: "Update failed", text: "Please try again." });
    }
  };

  const handleDelete = async (request) => {
    const result = await Swal.fire({
      title: "Delete this request?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });
    if (!result.isConfirmed) return;
    try {
      await axiosSecure.delete(`/donation-requests/${request._id}`);
      await refetch();
      Swal.fire({ icon: "success", title: "Deleted", timer: 1200, showConfirmButton: false });
    } catch {
      Swal.fire({ icon: "error", title: "Delete failed", text: "Please try again." });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-3xl md:text-4xl font-bold">
        Welcome, {user?.displayName || "Donor"}
      </h2>

      {isLoading && (
        <p className="mt-2 text-xs text-gray-500">
          Loading your recent donation requests...
        </p>
      )}

      {!isLoading && recentRequests.length > 0 && (
        <section className="mt-2 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recent requests</h3>
            <button
              className="btn btn-xs btn-outline"
              onClick={() => navigate("/dashboard/my-donation-requests")}
            >
              View all
            </button>
          </div>

       
          <div className="divide-y divide-gray-100 border border-gray-100 rounded-md bg-white text-[11px]">
            {recentRequests.map((request, index) => (
              <div
                key={request._id}
                className="flex items-center justify-between gap-2 px-3 py-1.5 hover:bg-gray-50"
              >
            
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-[10px] text-gray-400 w-4 text-right">
                    {index + 1}.
                  </span>
                  <span className="font-medium truncate max-w-[120px]">
                    {request.recipientName}
                  </span>
                  <span className="px-1.5 py-0.5 rounded-full bg-rose-50 text-rose-600 text-[10px] font-semibold">
                    {request.bloodGroup}
                  </span>
                  {renderStatusBadge(request.status)}
                </div>

               
                <div className="flex items-center gap-1 shrink-0">
                  {request.status === "inprogress" && (
                    <>
                      <button
                        className="btn btn-ghost btn-xs px-2 text-[10px] text-emerald-600"
                        onClick={() => updateStatus(request, "done")}
                      >
                        Done
                      </button>
                      <button
                        className="btn btn-ghost btn-xs px-2 text-[10px] text-rose-600"
                        onClick={() => updateStatus(request, "canceled")}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  <button
                    className="btn btn-ghost btn-xs px-2 text-[10px]"
                    onClick={() => setSelectedRequest(request)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-ghost btn-xs px-2 text-[10px]"
                    onClick={() =>
                      navigate(`/dashboard/edit-donation-request/${request._id}`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-ghost btn-xs px-2 text-[10px] text-rose-600"
                    onClick={() => handleDelete(request)}
                  >
                    Del
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      
      {selectedRequest && (
        <dialog
          className="modal modal-open"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedRequest(null);
          }}
        >
          <div className="modal-box max-w-xs text-sm">
            <h3 className="font-semibold text-base mb-2">Request details</h3>
            <div className="space-y-1 text-xs">
              <p>
                <span className="font-semibold">Recipient:</span>{" "}
                {selectedRequest.recipientName}
              </p>
              <p>
                <span className="font-semibold">Location:</span>{" "}
                {selectedRequest.recipientDistrict},{" "}
                {selectedRequest.recipientUpazila}
              </p>
              <p>
                <span className="font-semibold">Date:</span>{" "}
                {selectedRequest.donationDate} {selectedRequest.donationTime}
              </p>
              <p>
                <span className="font-semibold">Blood:</span>{" "}
                {selectedRequest.bloodGroup}
              </p>
              <p className="flex items-center gap-1">
                <span className="font-semibold">Status:</span>{" "}
                {renderStatusBadge(selectedRequest.status)}
              </p>
              {selectedRequest.requestMessage && (
                <p>
                  <span className="font-semibold">Message:</span>{" "}
                  {selectedRequest.requestMessage}
                </p>
              )}
            </div>
            <div className="modal-action">
              <button
                className="btn btn-sm"
                onClick={() => setSelectedRequest(null)}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default DonorDashboardHome;