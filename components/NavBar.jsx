import Link from "next/link";
import React from "react";

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
