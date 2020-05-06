import React, { Component } from "react"
import PropTypes from "prop-types"

// render tab content
const renderMenuContent = (props) => {
  let index = props.selectedMenuItem
  switch(index) {
    case 1:
      return <MapContent {...props} />
    case 2:
      return <LibraryDirectoryContent />
    case 3:
      return <Libraryleadershipdirectorycontent />
    case 4:
      return <EcampusDirectoryContent />
    default:
      return <div></div>
  }
}

const MenuContent = props => {
  return (
    <div className="map-content content-component">
      {renderMenuContent(props)}
    </div>
  )
}

// TODO: We could refactor functions below and extract menu properties (content title, tab title, etc) from a yml file instead of loading from const variables
const MapContent = props => {
  let floor_4_url = props.maps[6].image_url
  return (
    <div className="map-content">
      <div style={{ backgroundImage: `url("${floor_4_url}")` }}>&nbsp;</div>
    </div>
  )
}
const LibraryDirectoryContent = props => {
  return (
    <h1>Libraries &amp; Press Directory</h1>
  )
}

const Libraryleadershipdirectorycontent = props => {
  return (
    <h1>Libraries &amp; Press Leadership Directory</h1>
  )
}

const EcampusDirectoryContent = props => {
  return (
    <h1>Ecampus Leadership Directory</h1>
  )
}

MenuContent.propTypes = {
  selectedMenuItem: PropTypes.number.isRequired,
  maps: PropTypes.array
}

export default MenuContent
