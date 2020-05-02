import React, { Component } from "react"
import PropTypes from "prop-types"

function NavButton(props) {
  return (
    <button {...props} className="nav-button" />
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
    return (
      <div className="navigation-menu">
        <NavButton aria-label="Home" onClick={props.homeMenuItemClicked}>Home</NavButton>
        <NavSpacer width="35px" />
        <NavButton aria-label="Map" onClick={props.mapMenuItemClicked}>Map</NavButton>
        <NavSpacer width="35px" />
        <NavButton aria-label="Libraries and Press Directory" onClick={props.libraryDirectoryMenuItemClicked}>Libraries &amp; Press Directory</NavButton>
        <NavSpacer width="35px" />
        <NavButton aria-label="Libraries and Press Leadership Directory" onClick={props.libraryLeadershipDirectoryMenuItemClicked}>Libraries &amp; Press Leadership Directory</NavButton>
        <NavSpacer width="35px" />
        <NavButton aria-label="Ecampus Leadership Directory" onClick={props.ecampusDirectoryMenuItemClicked}>Ecampus Leadership Directory</NavButton>
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
