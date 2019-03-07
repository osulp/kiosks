export const SET_KIOSK = "SET_KIOSK"
export const setKiosk = (
  type,
  url,
  map_default_floor_number,
  maps_base_url,
  name,
  kid
) => {
  return {
    type: SET_KIOSK,
    kiosk: { type, url, map_default_floor_number, maps_base_url, name, kid }
  }
}

export const SET_SLIDES = "SET_SLIDES"
export const setSlides = slides => {
  return {
    type: SET_SLIDES,
    kiosk: {
      slides
    }
  }
}

export const SET_RESTART_KIOSK = "SET_RESTART_KIOSK"
export const setRestartKiosk = restart_kiosk => {
  return {
    type: SET_RESTART_KIOSK,
    kiosk: {
      restart_kiosk
    }
  }
}

export const SCROLL_TO_SLIDE = "SCROLL_TO_SLIDE"
export const scrollToSlide = index => {
  return {
    type: SCROLL_TO_SLIDE,
    index
  }
}

export const ADD_ERROR = "ADD_ERROR"
export const addError = error => {
  return {
    type: ADD_ERROR,
    error
  }
}

export const SET_TITLE = "SET_TITLE"
export const setTitle = title => {
  return {
    type: SET_TITLE,
    title
  }
}

export const SET_GOOGLE_ANALYTICS = "SET_GOOGLE_ANALYTICS"
export const setGoogleAnalytics = google_analytics => {
  return {
    type: SET_GOOGLE_ANALYTICS,
    google_analytics
  }
}
