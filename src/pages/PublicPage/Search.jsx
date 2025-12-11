import React, { useMemo, useState } from "react";
import { useLoaderData } from "react-router";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const Search = () => {
    const { districts, upazilas } = useLoaderData();

    const [form, setForm] = useState({
        bloodGroup: "",
        districtId: "",
        upazilaId: "",
    });

    const [requests, setRequests] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Reset upazila when district changes
        if (name === "districtId") {
            setForm((prev) => ({
                ...prev,
                districtId: value,
                upazilaId: "",
            }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const filteredUpazilas = useMemo(() => {
        if (!form.districtId) return [];
        return upazilas.filter((u) => u.district_id === form.districtId);
    }, [upazilas, form.districtId]);

    const handleSearch = async (e) => {
        e.preventDefault();
        setError("");

        if (!form.bloodGroup || !form.districtId || !form.upazilaId) {
            setError("Please select blood group, district and upazila.");
            return;
        }

        setIsSearching(true);
        setHasSearched(true);

        const district = districts.find((d) => d.id === form.districtId);
        const upazila = filteredUpazilas.find((u) => u.id === form.upazilaId);

        try {
            const query = new URLSearchParams({
                bloodGroup: form.bloodGroup,
                district: district?.name || "",
                upazila: upazila?.name || "",
            }).toString();

            // Adjust base URL to your setup (env/baseURL/etc.)
            const res = await fetch(
                `http://localhost:${import.meta.env.VITE_PORT || 3000}/donation-requests?${query}`
                // or simply: `http://localhost:3000/donation-requests?${query}`
            );

            if (!res.ok) {
                throw new Error("Failed to fetch donation requests");
            }

            const data = await res.json();
            setRequests(data);
        } catch (err) {
            console.error(err);
            setError("Could not fetch data. Please try again.");
            setRequests([]);
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                Search Blood Donors
            </h1>

            {/* Search Form */}
            <form
                onSubmit={handleSearch}
                className="bg-base-100 shadow rounded-lg p-4 md:p-6 space-y-4"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Blood Group */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Blood Group</span>
                        </label>
                        <select
                            name="bloodGroup"
                            className="select select-bordered w-full"
                            value={form.bloodGroup}
                            onChange={handleChange}
                        >
                            <option value="">Select blood group</option>
                            {bloodGroups.map((bg) => (
                                <option key={bg} value={bg}>
                                    {bg}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* District */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">District</span>
                        </label>
                        <select
                            name="districtId"
                            className="select select-bordered w-full"
                            value={form.districtId}
                            onChange={handleChange}
                        >
                            <option value="">Select district</option>
                            {districts.map((d) => (
                                <option key={d.id} value={d.id}>
                                    {d.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Upazila */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Upazila</span>
                        </label>
                        <select
                            name="upazilaId"
                            className="select select-bordered w-full"
                            value={form.upazilaId}
                            onChange={handleChange}
                            disabled={!form.districtId}
                        >
                            <option value="">
                                {form.districtId ? "Select upazila" : "Select district first"}
                            </option>
                            {filteredUpazilas.map((u) => (
                                <option key={u.id} value={u.id}>
                                    {u.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {error && (
                    <p className="text-sm text-error mt-1">
                        {error}
                    </p>
                )}

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSearching}
                    >
                        {isSearching ? "Searching..." : "Search"}
                    </button>
                </div>
            </form>

            {/* Results */}
            {hasSearched && (
                <div className="mt-8">
                    {isSearching && (
                        <p className="text-center text-gray-500">Searching...</p>
                    )}

                    {!isSearching && requests.length === 0 && !error && (
                        <p className="text-center text-gray-500">
                            No matching donation requests found.
                        </p>
                    )}

                    {!isSearching && requests.length > 0 && (
                        <>
                            <h2 className="text-xl font-semibold mb-4">
                                Found {requests.length} request
                                {requests.length > 1 ? "s" : ""}
                            </h2>

                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {requests.map((req) => (
                                    <div
                                        key={req._id}
                                        className="card bg-base-100 shadow-sm border"
                                    >
                                        <div className="card-body">
                                            <h3 className="card-title text-lg">
                                                {req.recipientName || "Recipient"}
                                            </h3>
                                            <p>
                                                <span className="font-semibold">Blood Group:</span>{" "}
                                                {req.bloodGroup}
                                            </p>
                                            <p>
                                                <span className="font-semibold">Location:</span>{" "}
                                                {req.recipientDistrict}, {req.recipientUpazila}
                                            </p>
                                            <p>
                                                <span className="font-semibold">Date:</span>{" "}
                                                {req.donationDate}
                                            </p>
                                            <p>
                                                <span className="font-semibold">Time:</span>{" "}
                                                {req.donationTime}
                                            </p>
                                            {req.status && (
                                                <p className="text-sm text-gray-500">
                                                    Status: {req.status}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Search;