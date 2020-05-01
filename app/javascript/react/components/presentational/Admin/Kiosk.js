import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import ConnectedSlideGallery from "../../SlideGallery"
import Menu from "./Menu"
import { trackClicked } from "../shared/GoogleAnalytics"

const Kiosk = props => {
  // Set local state variables and setter methods
  // TODO: add navigation (main menu) component inside kiosk-footer
  return (
    <div id="admin_kiosk">
      <div className="kiosk-header">
        <img className="logo" src="/images/osulogo.svg"/>
        <h1 className="main-header">Library Admin | Ecampus</h1>
      </div>
      <div className="component">
        <ConnectedSlideGallery {...props} />
      </div>
        <div className="kiosk-footer">
          <Menu />
        </div>
    </div>
  )
}

Kiosk.propTypes = {
  slides: PropTypes.array.isRequired,
  kiosk_name: PropTypes.string,
  kiosk_id: PropTypes.string,
  restart_kiosk: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  google_analytics: PropTypes.func.isRequired
}

export default Kiosk
