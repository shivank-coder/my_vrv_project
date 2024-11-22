import React from "react";

const Navbar = ({ setActiveTab }) => {
  return (
    <nav className="navbar">
      <button onClick={() => setActiveTab("users")}>Users</button>
      <button onClick={() => setActiveTab("roles")}>Roles</button>
    </nav>
  );
};

export default Navbar;
