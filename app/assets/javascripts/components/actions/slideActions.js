export const SET_SLIDES = 'SET_SLIDES';
export const REFRESH_SLIDES = 'REFRESH_SLIDES';

export function setSlides(slides) {
  return {
    type: SET_SLIDES,
    slides: slides
  };
}

export function refreshSlides() {
  // TODO: Ajax call to query the current set of slides?
}
