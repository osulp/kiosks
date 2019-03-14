import React, { Component } from "react"
import PropTypes from "prop-types"
import LargeSlide from "./LargeSlide"
import { trackClicked } from "../shared/GoogleAnalytics"

class SlideCell extends Component {
  cellClicked(e) {
    trackClicked(
      this.props.google_analytics,
      `${this.props.kiosk_name}:${this.props.kiosk_id}:DonorKiosk:SlideClicked`
    )
    this.props.setModalVisibility(true)
    this.props.setModalRootComponent(<LargeSlide {...this.props} />)
  }

  render() {
    let slide = this.props.slide
    return (
      <div
        className="col-md-2 donor-cell-small"
        onClick={this.cellClicked.bind(this)}
      >
        <div className="panel panel-default donor-panel-small">
          <div
            className="panel-body donor-body-small"
            style={{ backgroundImage: `url("${slide.xlarge}")` }}
          />
        </div>
      </div>
    )
  }
}

SlideCell.propTypes = {
  slide: PropTypes.object.isRequired,
  kiosk_name: PropTypes.string,
  kiosk_id: PropTypes.string,
  setModalVisibility: PropTypes.func.isRequired,
  setModalRootComponent: PropTypes.func.isRequired
}

export default SlideCell
