import React, { Component } from "react"
import PropTypes from "prop-types"

function NavButton(props) {
  return (
    <button {...props} />
  );
}

function NavSpacer({ width }) {
  return (
    <div
      style={{ display: "inline-block", width }}
    />
  );
}

const Menu = props => {
    const selectedButtonClassName = i => {
      return i == props.selectedMenuItem ? "btn-primary" : ""
    }

    return (
      <div className="navigation-menu">
        <NavSpacer width="35px" />
        <NavButton 
          aria-label="Map" 
          onClick={props.mapMenuItemClicked}
          className={`nav-button map-button ${selectedButtonClassName(1)}`}
        >Map</NavButton>
        <NavSpacer width="35px" />
        <NavButton 
          aria-label="Libraries and Press Directory" 
          onClick={props.libraryDirectoryMenuItemClicked}
          className={`nav-button ${selectedButtonClassName(2)}`}
        >Libraries &amp; Press <br></br> Employee Directory</NavButton>
        <NavSpacer width="35px" />
        <NavButton 
          aria-label="Libraries and Press Leadership Directory" 
          onClick={props.libraryLeadershipDirectoryMenuItemClicked}
          className={`nav-button ${selectedButtonClassName(3)}`}
        >Libraries &amp; Press <br></br> Leadership Directory</NavButton>
        <NavSpacer width="35px" />
        <NavButton 
          aria-label="Ecampus Leadership Directory" 
          onClick={props.ecampusDirectoryMenuItemClicked}
          className={`nav-button ${selectedButtonClassName(4)}`}
        >Ecampus <br></br> Leadership Directory</NavButton>
        <NavSpacer width="35px" />
        <NavButton 
          aria-label="Home" 
          onClick={props.homeMenuItemClicked}
          className={`nav-button home-button ${selectedButtonClassName(0)}`}
        >Home</NavButton>
        <NavSpacer width="35px" />
      </div>
    )
}

Menu.propTypes = {
  homeMenuItemClicked: PropTypes.func.isRequired,
  mapMenuItemClicked: PropTypes.func.isRequired,
  libraryDirectoryMenuItemClicked: PropTypes.func.isRequired,
  libraryLeadershipDirectoryMenuItemClicked: PropTypes.func.isRequired,
  ecampusDirectoryMenuItemClicked: PropTypes.func.isRequired,
  selectedMenuItem: PropTypes.number.isRequired
}

export default Menu
