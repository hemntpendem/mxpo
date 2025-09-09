import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        {/* Social links */}
        <div className="social-links">
          <a href="#"><FaFacebookF className="w-5 h-5" /></a>
          <a href="#"><FaInstagram className="w-5 h-5" /></a>
          <a href="#"><FaTwitter className="w-5 h-5" /></a>
          <a href="#"><FaYoutube className="w-5 h-5" /></a>
        </div>

        {/* Footer links */}
        <ul className="footer-links">
          <li><a href="#">Audio Description</a></li>
          <li><a href="#">Investor Relations</a></li>
          <li><a href="#">About Mxpo</a></li>
          <li><a href="#">Help Centre</a></li>
          <li><a href="#">Jobs</a></li>
          <li><a href="#">Cookie Preferences</a></li>
          <li><a href="#">Gift Cards</a></li>
          <li><a href="#">Terms of Use</a></li>
          <li><a href="#">Corporate Information</a></li>
          <li><a href="#">Media Centre</a></li>
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Contact Us</a></li>
          <li><a href="#">Legal Notices</a></li>
          <li><a href="#">More</a></li>
        </ul>

        {/* Copyright */}
        <p className="copy">© 2025 MxPo, Inc.</p>

        {/* credits */}
        <div className="credits">
          <p>Made with <span className="heart">❤</span> by <strong>Hemant</strong></p>
          <p>
            Queries? Email me at{" "}
            <a href="mailto:pendemhemant@gmail.com?subject=Query%20Regarding%20MxPo&body=Hi%20Hemant,">
              pendemhemant@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
