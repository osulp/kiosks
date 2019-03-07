import React, { Component, PropTypes } from "react"
import { trackClicked } from "../shared/GoogleAnalytics"

var Iframe = React.createClass({
  render: function() {
    return (
      <div>
        <iframe
          src={this.props.src}
          height={this.props.height}
          width={this.props.width}
          frameBorder={0}
        />
      </div>
    )
  }
})

class Maps extends Component {
  /**
   * Initialize an Search Primo UI
   * @param props - the properties passed into the component
   */
  constructor(props) {
    super(props)
  }

  /**
   * Includes Bootstrap elements for mobile and regular displays using hidden-*  and col-* semantics
   * @returns {JSX} - the rendered UI
   */
  render() {
    return (
      <div id="maps" className="panel panel-default">
        <div className="container-fluid maps-table-container">
          <div className="row">
            <div className="col-sm-12 search-iframe">
              <Iframe
                src={`${this.props.maps_base_url}/floor/${
                  this.props.map_default_floor_number
                }?show_navbar=false&kiosk=true`}
                height={(window.innerHeight - 200).toString() + "px"}
                width="100%"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Maps.propTypes = {
  api: PropTypes.object.isRequired,
  google_analytics: PropTypes.func,
  map_default_floor_number: PropTypes.string,
  maps_base_url: PropTypes.string
}

export default Maps
