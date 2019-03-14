import React, { Component } from "react"
import PropTypes from "prop-types"
import LargeMedia from "./LargeMedia"
import { trackClicked } from "../shared/GoogleAnalytics"

class MediaCell extends Component {
  cellClicked(e) {
    trackClicked(
      this.props.google_analytics,
      `${this.props.kiosk_name}:${this.props.kiosk_id}:DonorKiosk:SlideClicked`
    )
    this.props.setModalVisibility(true)
    this.props.setModalRootComponent(<LargeMedia {...this.props} />)
  }

  render() {
    let slide = this.props.slide
    return (
      <div className="col-md-4 col-sm-4" onClick={this.cellClicked.bind(this)}>
        <div className="thumbnail">
          <img
            src={slide.xlarge}
            alt={slide.caption}
            style={{ width: "100%" }}
          />
          <div className="caption-cell">
            <h1>{slide.label}</h1>
            <p>{slide.caption}</p>
          </div>
        </div>
      </div>
    )
  }
}

MediaCell.propTypes = {
  slide: PropTypes.object.isRequired,
  kiosk_name: PropTypes.string,
  kiosk_id: PropTypes.string,
  setModalVisibility: PropTypes.func.isRequired,
  setModalRootComponent: PropTypes.func.isRequired
}

export default MediaCell
