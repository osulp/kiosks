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
      return <Libraryleadershipdirectorycontent {...props} />
    case 4:
      return <EcampusDirectoryContent {...props} />
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
  console.log('props.slides.osulp_directory', props.slides.osulp_directory)
  // TODO: parse json object and render html table
  return (
    <div>
      <h1>Libraries &amp; Press Leadership Directory</h1>
      {JSON.stringify(props.slides[0].osulp_directory)}
    </div>
  )
}

const EcampusDirectoryContent = props => {
  console.log('props.slides.ecampus_directory', props.slides.ecampus_directory)
  // TODO: parse json object and render html table
  return (
    <div>
      <h1>Ecampus Leadership Directory</h1>
      {JSON.stringify(props.slides[0].ecampus_directory)}
    </div>
  )
}

MenuContent.propTypes = {
  selectedMenuItem: PropTypes.number.isRequired,
  maps: PropTypes.array,
  slides: PropTypes.array
}

export default MenuContent
