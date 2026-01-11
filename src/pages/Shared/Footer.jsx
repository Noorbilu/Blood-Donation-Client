import React from "react";
import { Link } from "react-router";
import Logo from "../../Components/logo";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-10 border-t border-base-300">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
          
          <aside className="text-center md:text-left space-y-4 max-w-sm">
            <div className="flex justify-center md:justify-start">
              <Logo />
            </div>
            <h2 className="text-xl font-bold text-primary">Blood Donation</h2>
            <p className="text-sm text-base-content/70">
              Connecting donors and saving lives. Your blood donation can give
              someone a second chance at life.
            </p>
            <p className="text-sm text-base-content/60">
              © {new Date().getFullYear()} Blood Donation. All rights reserved.
            </p>
          </aside>

          
          <nav className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-base-content/80">
              <li>
                <Link className="hover:text-primary transition-colors" to="/donation-requests">
                  Find a Donor
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" to="/register">
                  Become a Donor
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" to="/donation-requests">
                  Emergency Request
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" to="/about">
                  About Us
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" to="/privacy">
                  Privacy & Terms
                </Link>
              </li>
            </ul>
          </nav>

         
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
            <div className="flex justify-center md:justify-end gap-5 text-2xl text-base-content/70">
              <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X" className="hover:text-base-content transition-colors">
                <FaXTwitter />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="hover:text-error transition-colors">
                <FaYoutube />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-secondary transition-colors">
                <FaInstagram />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-info transition-colors">
                <FaFacebookF />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;