// src/pages/Dashboard/Admin/AllDonationRequests.jsx
import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useRole from "../../../hooks/useRole";
import Forbidden from "../../../Components/Forbidden";
import Swal from "sweetalert2";

const pageSize = 5;

const AllDonationRequests = () => {
    const axiosSecure = useAxiosSecure();
    const { role, roleLoading } = useRole();
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRequest, setSelectedRequest] = useState(null); // modal view

    const { data: requests = [], isLoading, refetch } = useQuery({
        queryKey: ["all-donation-requests"],
        queryFn: async () => {
            const res = await axiosSecure.get("/donation-requests");
            return res.data;
        },
    });

    if (roleLoading) {
        return (
            <div className="flex justify-center items-center py-10">
                <span className="loading loading-spinner loading-lg" />
            </div>
        );
    }

    if (role !== "admin" && role !== "volunteer") {
        return <Forbidden />;
    }

    const filteredRequests = useMemo(() => {
        if (statusFilter === "all") return requests;
        return requests.filter((r) => r.status === statusFilter);
    }, [requests, statusFilter]);

    const totalPages =
        filteredRequests.length > 0
            ? Math.ceil(filteredRequests.length / pageSize)
            : 1;

    const paginatedRequests = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filteredRequests.slice(start, start + pageSize);
    }, [filteredRequests, currentPage]);

    const renderStatusBadge = (status) => {
        let cls = "badge";
        if (status === "pending") cls += " badge-warning";
        else if (status === "inprogress") cls += " badge-info";
        else if (status === "done") cls += " badge-success";
        else if (status === "canceled") cls += " badge-error";
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

        await axiosSecure.patch(`/donation-requests/${request._id}`, {
            status: newStatus,
        });
        await refetch();
        Swal.fire({
            icon: "success",
            title: "Status updated",
            timer: 1200,
            showConfirmButton: false,
        });
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

        await axiosSecure.delete(`/donation-requests/${request._id}`);
        await refetch();
        Swal.fire({
            icon: "success",
            title: "Deleted",
            timer: 1200,
            showConfirmButton: false,
        });
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl md:text-3xl font-bold">
                    All Blood Donation Requests ({requests.length})
                </h1>
            </div>

            {/* Filter */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="flex flex-wrap gap-2">
                    {["all", "pending", "inprogress", "done", "canceled"].map(
                        (status) => (
                            <button
                                key={status}
                                className={`btn btn-sm ${statusFilter === status ? "btn-primary" : "btn-outline"
                                    }`}
                                onClick={() => {
                                    setStatusFilter(status);
                                    setCurrentPage(1);
                                }}
                            >
                                {status === "all"
                                    ? "All"
                                    : status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                        )
                    )}
                </div>

                <p className="text-sm text-gray-500">
                    Showing {paginatedRequests.length} of {filteredRequests.length} requests
                </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Recipient</th>
                            <th>Location</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Blood Group</th>
                            <th>Status</th>
                            <th>Donor Info</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading && (
                            <tr>
                                <td colSpan="9" className="text-center py-6">
                                    Loading...
                                </td>
                            </tr>
                        )}

                        {!isLoading && paginatedRequests.length === 0 && (
                            <tr>
                                <td colSpan="9" className="text-center py-6">
                                    No donation requests found.
                                </td>
                            </tr>
                        )}

                        {!isLoading &&
                            paginatedRequests.map((request, index) => (
                                <tr key={request._id}>
                                    <td>{(currentPage - 1) * pageSize + index + 1}</td>
                                    <td>{request.recipientName}</td>
                                    <td>
                                        {request.recipientDistrict}, {request.recipientUpazila}
                                    </td>
                                    <td>{request.donationDate}</td>
                                    <td>{request.donationTime}</td>
                                    <td>{request.bloodGroup}</td>
                                    <td>{renderStatusBadge(request.status)}</td>

                                    <td>
                                        {request.status === "inprogress" && request.donorName ? (
                                            <div>
                                                <div className="font-medium">{request.donorName}</div>
                                                <div className="text-xs text-gray-500">
                                                    {request.donorEmail}
                                                </div>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-gray-400">N/A</span>
                                        )}
                                    </td>

                                    <td>
                                        <div className="flex flex-col gap-1">
                                            {/* Done / Cancel – volunteer + admin */}
                                            {request.status === "inprogress" && (
                                                <div className="flex gap-1">
                                                    <button
                                                        className="btn btn-xs btn-success"
                                                        onClick={() => updateStatus(request, "done")}
                                                    >
                                                        Done
                                                    </button>
                                                    <button
                                                        className="btn btn-xs btn-error"
                                                        onClick={() =>
                                                            updateStatus(request, "canceled")
                                                        }
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            )}

                                            <div className="flex gap-1 mt-1">
                                                {/* View -> modal */}
                                                <button
                                                    className="btn btn-xs btn-info"
                                                    onClick={() => setSelectedRequest(request)}
                                                >
                                                    View
                                                </button>

                                                {/* Admin only: Edit + Delete */}
                                                {role === "admin" && (
                                                    <>
                                                        {/* Edit route already ache */}
                                                        {/* navigate না দিয়ে চাইলে শুধু note রাখলাম; চাইলে add korte paro */}
                                                        <button
                                                            className="btn btn-xs btn-outline btn-error"
                                                            onClick={() => handleDelete(request)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {!isLoading && filteredRequests.length > pageSize && (
                <div className="flex justify-center items-center gap-2 mt-4">
                    <button
                        className="btn btn-xs"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => p - 1)}
                    >
                        Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <button
                            key={p}
                            className={`btn btn-xs ${currentPage === p ? "btn-primary" : "btn-outline"
                                }`}
                            onClick={() => setCurrentPage(p)}
                        >
                            {p}
                        </button>
                    ))}
                    <button
                        className="btn btn-xs"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => p + 1)}
                    >
                        Next
                    </button>
                </div>
            )}

            {/* View modal */}
            {selectedRequest && (
                <dialog
                    className="modal modal-open"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setSelectedRequest(null);
                    }}
                >
                    <div className="modal-box max-w-lg">
                        <h3 className="font-bold text-lg mb-3">
                            Donation Request Details
                        </h3>

                        <div className="space-y-1 text-sm">
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
                                <span className="font-semibold">Hospital:</span>{" "}
                                {selectedRequest.hospital || "N/A"}
                            </p>
                            <p>
                                <span className="font-semibold">Address:</span>{" "}
                                {selectedRequest.fullAddress || "N/A"}
                            </p>
                            <p>
                                <span className="font-semibold">Blood Group:</span>{" "}
                                {selectedRequest.bloodGroup}
                            </p>
                            <p>
                                <span className="font-semibold">Date:</span>{" "}
                                {selectedRequest.donationDate}
                            </p>
                            <p>
                                <span className="font-semibold">Time:</span>{" "}
                                {selectedRequest.donationTime}
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="font-semibold">Status:</span>
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
                                className="btn"
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

export default AllDonationRequests;