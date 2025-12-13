"use client";

import Link from "next/link";
import { FaChartBar, FaCog, FaStar, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className="navbar">
      <ul className="">
        <li className="navbar-item">
          <Link href="/" className="navbar-link">
            Pomodoro Timer
          </Link>
        </li>
        <li>
          <button className="hamburger-btn" onClick={toggleMenu}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </li>
        <li id="navbar-list" className={`navbar-list ${isOpen ? "open" : ""}`}>
          <ul>
            <li className="navbar-item">
              <Link href="/stats" className="navbar-link">
                <FaChartBar className="icon" />
                Your stats
              </Link>
            </li>
            <li className="navbar-item">
              <Link href="/settings" className="navbar-link">
                <FaCog className="icon" />
                Settings
              </Link>
            </li>
            <li className="navbar-item">
              <Link href="/reviews" className="navbar-link">
                <FaStar className="icon" />
                Reviews
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
