import React from "react";
import { Link } from "react-router";

const CTA = () => {
  return (
    <section className="py-12 px-6 bg-base-200">
      <div className="max-w-6xl mx-auto">
        <div className="bg-base-100 border border-base-300 rounded-2xl p-8 text-center shadow-sm">
          <h3 className="text-xl font-semibold text-primary">
            Ready to make a difference?
          </h3>

          <p className="text-base-content/70 mt-2">
            Join our community and help save lives today.
          </p>

          <div className="mt-4 flex gap-3 justify-center">
            <Link to="/donation-requests" className="btn btn-primary">
              Explore Requests
            </Link>

            <Link to="/register" className="btn btn-outline">
              Join as Donor
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
