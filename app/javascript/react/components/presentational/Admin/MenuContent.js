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
    <iframe src="https://library-dev.library.oregonstate.edu/staff-directory-admin-kiosk" height="100%" width="100%"></iframe>
  )
}

const Libraryleadershipdirectorycontent = props => {
  let names = JSON.parse(props.slides[0].osulp_directory).map((item, key) =>
    item.name
  );
  let titles = JSON.parse(props.slides[0].osulp_directory).map((item, key) =>
    item.title
  );
  let phone_numbers = JSON.parse(props.slides[0].osulp_directory).map((item, key) =>
    item.phone_number
  );
  return (
    <table className='osulp-table'>
      <thead>
        <tr key='osulp-table-header' className='osulp-table-header'>
          <th>Name</th>
          <th>Title</th>
          <th>Phone Number</th>
        </tr>
      </thead>
      <tbody>
        {titles.map((thing, index) => 
          {
            return <tr key={'osulp-table'+index} className='osulp-table-row'>
              <td key={'names-osulp' + index}>{names[index]}</td>
              <td key={'titles-osulp' + index}>{titles[index]}</td>
              <td key={'phone-numbers' + index}>{phone_numbers[index]}</td>
            </tr>
          }
        )}
      </tbody>
    </table>
  )
}

const EcampusDirectoryContent = props => {
  let names = JSON.parse(props.slides[0].ecampus_directory).map((item, key) =>
    item.name
  );
  let titles = JSON.parse(props.slides[0].ecampus_directory).map((item, key) =>
    item.title
  );
  // TODO: parse json object and render html table
  return (
    <table className='ecampus-table'>
      <thead>
        <tr key='ecampus-table' className='ecampus-table-header'>
          <th >Name</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        {titles.map((thing, index) => 
          {
            return <tr key={'ecampus-table'+index} className='ecampus-table-row'>
              <td key={'names-ecampus' + index}>{names[index]}</td>
              <td key={'titles-ecampus' + index}>{titles[index]}</td>
            </tr>
          }
        )}
      </tbody>
    </table>
  )
}

MenuContent.propTypes = {
  selectedMenuItem: PropTypes.number.isRequired,
  maps: PropTypes.array,
  slides: PropTypes.array
}

export default MenuContent
