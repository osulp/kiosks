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
  let names = JSON.parse(props.slides[0].osulp_directory).map((item, key) =>
    <td>{item.name}</td>
  );
  let titles = JSON.parse(props.slides[0].osulp_directory).map((item, key) =>
    <td>{item.title}</td>
  );
  let phone_numbers = JSON.parse(props.slides[0].osulp_directory).map((item, key) =>
    <td>{item.phone_number}</td>
  );
  return (
    <table>
      <tr>
        <th>Name</th>
        <th>title</th>
        <th>phone number</th>
      </tr>
        {titles.map((thing, index) => 
          {
            return <tr>
              <td>{names[index]}</td>
              <td>{titles[index]}</td>
              <td>{phone_numbers[index]}</td>
            </tr>
          }
        )}
    </table>
  )
}

const EcampusDirectoryContent = props => {
  let names = JSON.parse(props.slides[0].ecampus_directory).map((item, key) =>
    <td>{item.name}</td>
  );
  let titles = JSON.parse(props.slides[0].ecampus_directory).map((item, key) =>
    <td>{item.title}</td>
  );
  let phone_numbers = JSON.parse(props.slides[0].ecampus_directory).map((item, key) =>
    <td>{item.phone_number}</td>
  );
  // TODO: parse json object and render html table
  return (
    <table>
      <tr>
        <th>Name</th>
        <th>title</th>
      </tr>
        {titles.map((thing, index) => 
          {
            return <tr>
              <td>{names[index]}</td>
              <td>{titles[index]}</td>
            </tr>
          }
        )}
    </table>
  )
}

MenuContent.propTypes = {
  selectedMenuItem: PropTypes.number.isRequired,
  maps: PropTypes.array,
  slides: PropTypes.array
}

export default MenuContent
