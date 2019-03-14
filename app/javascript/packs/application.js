require("jquery-ui/ui/position")

import React from "react"
import ReactDOM from "react-dom"
import Root from "../react/components/Root"

//require("../../stylesheets/application.scss");
const root_dom_element = document.getElementById("application_root")

const setSlides = slides => {
  if (!slides) {
    return []
  }
  let json = JSON.parse(slides)
  return json.slides ? json.slides : json
}

const setRestartKiosk = restart_kiosk => {
  if (!restart_kiosk) {
    return []
  }
  let json = JSON.parse(restart_kiosk)
  return json.restart_kiosk ? json.restart_kiosk : json
}

const setMaps = maps => {
  if (!maps) {
    return []
  }
  let json = JSON.parse(maps)
  return json.maps ? json.maps : json
}

if (root_dom_element) {
  let slides = setSlides(root_dom_element.getAttribute("data-slides"))
  let restart_kiosk = setRestartKiosk(
    root_dom_element.getAttribute("data-restart-kiosk")
  )
  let maps = setMaps(root_dom_element.getAttribute("data-static-maps"))
  let map_default_floor_number = root_dom_element.getAttribute(
    "data-kiosk-map-default-floor-number"
  )
  let kiosk_name = root_dom_element.getAttribute("data-kiosk-name")
  let kiosk_id = root_dom_element.getAttribute("data-kiosk-id")
  let kiosk_type = root_dom_element.getAttribute("data-kiosk-type")
  let kiosk_url = root_dom_element.getAttribute("data-kiosk-url")
  let maps_base_url = root_dom_element.getAttribute("data-maps-base-url")
  let ga = window.ga

  // render the root container with properties
  ReactDOM.render(
    <Root
      slides={slides}
      restart_kiosk={restart_kiosk}
      maps={maps}
      kiosk_maps_base_url={maps_base_url}
      kiosk_map_default_floor_number={map_default_floor_number}
      kiosk_type={kiosk_type}
      kiosk_url={kiosk_url}
      kiosk_id={kiosk_id}
      kiosk_name={kiosk_name}
      google_analytics={ga}
    />,
    root_dom_element
  )
}
