import Link from "next/link";
import "@/styles/navbar.css"

const NavBar = () => {
  return (
    <div>
      <ul>
        <Link href="/stats">
          <li>Your stats</li>
        </Link>
        <Link href="/settings">
          <li>Settings</li>
        </Link>
      </ul>
    </div>
  );
};

export default NavBar;
