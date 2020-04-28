import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import ConnectedSlideGallery from "../../SlideGallery"
import { trackClicked } from "../shared/GoogleAnalytics"

const Kiosk = props => {
  // Set local state variables and setter methods
  // TODO: add navigation (main menu) component inside kiosk-footer
  return (
    <div id="admin_kiosk">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center"
        }}
      >
        <div className="kiosk-header" style={{ textAlign: "right" }}>
          <h1 style={{color: "#eee"}}>Library Admin and Ecampus</h1>
        </div>
      </div>
      <div className="component">
        <ConnectedSlideGallery {...props} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center"
        }}
      >
        <div className="kiosk-footer" style={{ textAlign: "right" }}>
          <h2 style={{color: "#eee"}}>Home</h2>
        </div>
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
