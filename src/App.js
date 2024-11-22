import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Users from "./components/Users";
import Roles from "./components/Roles";
import './index.css';


const App = () => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div>
      <Navbar setActiveTab={setActiveTab} />
      {activeTab === "users" && <Users />}
      {activeTab === "roles" && <Roles />}
    </div>
  );
};

export default App;
