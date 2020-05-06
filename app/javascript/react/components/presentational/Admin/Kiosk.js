import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import ConnectedSlideGallery from "../../SlideGallery"
import Menu from "./Menu"
import MenuContent from "./MenuContent"
import ConnectedMainContent from "../../MainContent"
import { trackClicked } from "../shared/GoogleAnalytics"

const Kiosk = props => {
  // Set local state variables and setter methods
  let [currentMenuIndex, setCurrentMenuIndex] = useState(0);
  useEffect(() => {
    if (currentMenuIndex == 0) {
      props.setContentRootComponent(
        <ConnectedSlideGallery {...props} />
      )
    }
  },[currentMenuIndex])

  const homeMenuItemClicked = () => {
    trackClicked(
      props.google_analytics,
      `${props.kiosk_name}:${props.kiosk_id}:AdminKiosk:Menu:Home`
    )
    setCurrentMenuIndex(0)
    props.setContentRootComponent(
      <ConnectedSlideGallery {...props} />
    )

    // TODO: implement interval to automatically go home after a certain period of inactivity
    // clearInterval(this.show_slides_timeout)
    // this._showSlidesTimeout()
  }

  const mapMenuItemClicked = () => {
    trackClicked(
      props.google_analytics,
      `${props.kiosk_name}:${props.kiosk_id}:AdminKiosk:Menu:Map`
    )
    setCurrentMenuIndex(1)
    props.setContentRootComponent(<MenuContent
      selectedMenuItem={1}
      maps={props.maps}
    />)
  }

  const libraryDirectoryMenuItemClicked = () => {
    trackClicked(
      props.google_analytics,
      `${props.kiosk_name}:${props.kiosk_id}:AdminKiosk:Menu:LibraryDirectory`
    )
    setCurrentMenuIndex(2)
    props.setContentRootComponent(<MenuContent
      selectedMenuItem={2}
    />)
  }

  const libraryLeadershipDirectoryMenuItemClicked = () => {
    trackClicked(
      props.google_analytics,
      `${props.kiosk_name}:${props.kiosk_id}:AdminKiosk:Menu:LibraryLeadershipDirectory`
    )
    setCurrentMenuIndex(3)
    props.setContentRootComponent(<MenuContent
      selectedMenuItem={3}
      slides={props.slides}
    />)
  }

  const ecampusDirectoryMenuItemClicked = () => {
    trackClicked(
      props.google_analytics,
      `${props.kiosk_name}:${props.kiosk_id}:AdminKiosk:Menu:EcampusDirectory`
    )
    setCurrentMenuIndex(4)
    props.setContentRootComponent(<MenuContent
      selectedMenuItem={4}
      slides={props.slides}
    />)
  }

  return (
    <div id="admin_kiosk">
      <div className="kiosk-header">
        <img className="logo" src="/images/osulogo.svg"/>
        <h1 className="main-header">Library Admin | Ecampus</h1>
      </div>
      <div className="main-component">
        <ConnectedMainContent />
      </div>
      <div className="kiosk-footer">
        <Menu
          homeMenuItemClicked={homeMenuItemClicked}
          mapMenuItemClicked={mapMenuItemClicked}
          libraryDirectoryMenuItemClicked={libraryDirectoryMenuItemClicked}
          libraryLeadershipDirectoryMenuItemClicked={libraryLeadershipDirectoryMenuItemClicked}
          ecampusDirectoryMenuItemClicked={ecampusDirectoryMenuItemClicked}
          selectedMenuItem={currentMenuIndex}
        />
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
  google_analytics: PropTypes.func.isRequired,
  setContentRootComponent: PropTypes.func.isRequired,
  maps: PropTypes.array,
}

export default Kiosk
