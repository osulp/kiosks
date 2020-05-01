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
        <NavButton aria-label="Home" onClick={() => { console.log("Home", "TODO: add menu handler") }}>Home</NavButton>
        <NavSpacer width="40px" />
        <NavButton aria-label="Map" onClick={() => { console.log("Map", "TODO: add menu handler") }}>Map</NavButton>
        <NavSpacer width="40px" />
        <NavButton aria-label="Libraries and Press Directory" onClick={() => { console.log("Directory", "TODO: add menu handler") }}>Libraries &amp; Press Directory</NavButton>
        <NavSpacer width="40px" />
        <NavButton aria-label="Ecampus Leadership Directory" onClick={() => { console.log("Ecampus", "TODO: add menu handler") }}>Ecampus Leadership Directory</NavButton>
        <NavSpacer width="40px" />
        <NavButton aria-label="Libraries and Press Leadership Directory" onClick={() => { console.log("Leadership", "TODO: add menu handler") }}>Libraries &amp; Press Leadership Directory</NavButton>
        <NavSpacer width="40px" />
      </div>
    )
}

export default Menu
