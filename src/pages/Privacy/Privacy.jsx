import React from "react";

const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">
        Privacy Policy & Terms of Use
      </h1>

      <div className="prose max-w-4xl prose-base-content dark:prose-invert">
        <p>
          At <strong>RedHope</strong>, your privacy and trust matter to us. This
          page explains what information we collect, how we use it, and the
          choices you have regarding your data when using our blood donation
          platform.
        </p>

        <h3>1. Information We Collect</h3>
        <p>
          We only collect information that is necessary to provide safe and
          effective blood donation services.
        </p>
        <ul>
          <li>
            <strong>Personal Information:</strong> Name, blood group, district,
            upazila, and profile photo (if provided).
          </li>
          <li>
            <strong>Contact Information:</strong> Email address used for account
            communication and authentication.
          </li>
          <li>
            <strong>Activity Information:</strong> Blood donation requests,
            donation history, and funding participation.
          </li>
          <li>
            <strong>Technical Information:</strong> Basic device and browser
            data collected for security and performance monitoring.
          </li>
        </ul>

        <h3>2. How We Use Your Information</h3>
        <p>Your data is used strictly to:</p>
        <ul>
          <li>Match donors with blood requests efficiently</li>
          <li>Improve platform reliability and user experience</li>
          <li>Communicate important updates and emergency requests</li>
          <li>Prevent misuse, fraud, and unauthorized access</li>
        </ul>

        <h3>3. Data Protection & Security</h3>
        <p>
          We apply industry-standard security practices to protect your
          information. Authentication is handled using secure tokens, all
          communication is encrypted, and sensitive operations follow strict
          access control rules.
        </p>
        <p>
          Financial contributions are processed through trusted third-party
          providers (such as Stripe). We do not store your card or payment
          details on our servers.
        </p>

        <h3>4. Data Sharing</h3>
        <p>
          We do <strong>not</strong> sell or rent your personal data. Information
          is only shared when necessary:
        </p>
        <ul>
          <li>With verified users during active donation requests</li>
          <li>With service providers required to operate the platform</li>
          <li>When legally required by applicable laws or regulations</li>
        </ul>

        <h3>5. Your Rights & Choices</h3>
        <p>You have full control over your data. You may:</p>
        <ul>
          <li>Update or correct your profile information at any time</li>
          <li>Request account deactivation or permanent deletion</li>
          <li>Opt out of non-essential communications</li>
        </ul>
        <p>
          To exercise these rights, contact us at{" "}
          <strong> info@blooddonation.com</strong>.
        </p>

        <h3>6. Cookies & Tracking</h3>
        <p>
          We use minimal cookies and local storage to maintain login sessions,
          remember theme preferences, and improve usability. No invasive
          tracking or advertising cookies are used.
        </p>

        <h3>7. Changes to This Policy</h3>
        <p>
          We may update this Privacy Policy from time to time. Any significant
          changes will be communicated through the platform. Continued use of
          RedHope after updates means you accept the revised policy.
        </p>

        <h3>8. Contact Us</h3>
        <p>
          If you have any questions or concerns about privacy, security, or data
          usage, feel free to reach out:
        </p>
        <ul>
          <li>Email: <strong> info@blooddonation.com</strong></li>
        </ul>

        <p className="text-sm opacity-70">
          Last updated: January 2026
        </p>
      </div>
    </div>
  );
};

export default Privacy;
