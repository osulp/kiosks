import React from "react";
import ConnectedMainContent from "../../../../MainContent"

// REACT: Create the function of the subtab
const CurrentSlide = () => {
  // RENDER: Render the main content view
  return (
    <div className="firstTab">
      <ConnectedMainContent />
    </div>
  );
};

export default CurrentSlide;