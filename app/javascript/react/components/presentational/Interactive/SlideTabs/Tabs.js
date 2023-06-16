import React, { useState } from "react";
import FirstTab from "./SlideNavs/CurrentSlide";
import SecondTab from "./SlideNavs/AllSlide";

// REACT: Create the function of the tabs
const Tabs = () => {

  // SETUP: Create a useState to setup active tabs
  const [activeTab, setActiveTab] = useState("currTab");

  // FUNCTION: Set function to handle the state of active tabs
  const handleTab1 = () => {
    // UPDATE: Set the correct state for the first tab
    setActiveTab("currTab");
  };
  const handleTab2 = () => {
    // UPDATE: Set the correct state for the first tab
    setActiveTab("allTab");
  };

  // RENDER: Render the view of the tabs
  return (
    <div className="Tabs">
      {/* NAV: Here is the nav setup using ul li */}
      <ul className="NavSlide">
        <li 
          className={activeTab === "currTab" ? "active" : ""}
          onClick={handleTab1}
          >Current View</li>
        <li 
          className={activeTab === "allTab" ? "active" : ""}
          onClick={handleTab2}
          >Preview All</li>
      </ul>

      {/* SUB-CONTENT: Content underneath tab */}
      <div className="subContent">
        {/* NAVIGATE: This code helps to manage which content is under which tab */}
        {activeTab === "currTab" ? <FirstTab /> : <SecondTab />}
      </div>
    </div>
  );
};

export default Tabs;