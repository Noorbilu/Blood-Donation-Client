import React from 'react';

const About = () => {
  return (
    <div className="bg-base-100 text-base-content">
      <section className="container mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">About RedHope</h1>
        <p className="opacity-80 max-w-3xl">
          RedHope connects donors with patients who need blood—quickly, safely, and reliably. 
          We collaborate with hospitals, volunteers, and local communities to streamline the donation process.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <div className="card p-6 text-center">
            <b>Mission</b>
            <p className="opacity-80 mt-2">
              Save lives by reducing time to match donors with patients, city by city.
            </p>
          </div>
          <div className="card p-6 text-center">
            <b>What we do</b>
            <p className="opacity-80 mt-2">
              Verified donor profiles, tracked requests, volunteer coordination, and community funding.
            </p>
          </div>
          <div className="card p-6 text-center">
            <b>Impact</b>
            <p className="opacity-80 mt-2">
              Thousands of requests successfully coordinated across districts and upazilas.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;