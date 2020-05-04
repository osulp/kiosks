import React, { Component } from "react"
import PropTypes from "prop-types"

// render tab content
const renderMenuContent = (index) => {
  switch(index) {
    case 1:
      return <MapContent />
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
      {renderMenuContent(props.selectedMenuItem)}
    </div>
  )
}

const MapContent = props => {
  return (
    <h1>Map Content</h1>
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
  selectedMenuItem: PropTypes.number.isRequired
}

export default MenuContent
