export const SET_SLIDES = 'SET_SLIDES';
export const REFRESH_SLIDES = 'REFRESH_SLIDES';

export function setSlides(slides) {
  slides.push({id: 100, content: "absdg"});
  console.log(slides);
  return {
    type: SET_SLIDES,
    slides: slides
  };
}

export function refreshSlides(){
  // TODO: Ajax call to query the current set of slides?
}
