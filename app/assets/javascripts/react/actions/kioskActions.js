export const SET_KIOSK = 'SET_KIOSK';
export const setKiosk = (type, url) => {
  return {
    type: SET_KIOSK,
    kiosk: { type, url }
  };
};

export const SET_SLIDES = 'SET_SLIDES';
export const setSlides = (slides) => {
  return {
    type: SET_SLIDES,
    kiosk: {
      slides
    }
  };
};

export const SCROLL_TO_SLIDE = "SCROLL_TO_SLIDE";
export const scrollToSlide = (index) => {
  return {
    type: SCROLL_TO_SLIDE,
    index
  }
};

export const ADD_ERROR = 'ADD_ERROR';
export const addError = (error) => {
  return {
    type: ADD_ERROR,
    error
  };
};
