import Link from "next/link";
import { FaChartBar } from "react-icons/fa";
import { FaCog } from "react-icons/fa";

const NavBar = () => {
  return (
    <div className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link href="/" className="navbar-link">
            Pomodoro timer
          </Link>
        </li>
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
      </ul>
    </div>
  );
};

export default NavBar;
