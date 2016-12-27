export {initial_state} from '../../../app/assets/javascripts/react/reducers/kioskReducer';

export const slide = {
  id: 1,
  original: "/uploads/default_slide_1.png",
  thumbnail: "/uploads/default_slide_1.png",
  xlarge: "/uploads/default_slide_1.png",
  expires_at: "2020-12-31T23:59:59Z",
  created_at: "2000-12-31T11:59:59Z",
  updated_at: "2000-12-31T23:59:59Z",
  title: "Slide.title",
  caption: "Slide.caption",
  slide_type: "SlideType.name",
  kiosk: "Kiosk.name"
};

export const slide2 = {
  id: 2,
  original: "/uploads/default_slide_2.png",
  thumbnail: "/uploads/default_slide_1.png",
  xlarge: "/uploads/default_slide_1.png",
  expires_at: "2010-11-11T13:00:00Z",
  created_at: "2000-11-11T11:00:00Z",
  updated_at: "2000-11-11T13:00:00Z",
  title: "Slide.title:2",
  caption: "Slide.caption:2",
  slide_type: "SlideType.name:2",
  kiosk: "Kiosk.name:2"
};

export const slides = [slide, slide2];

// TODO: Establish the proper shape of data coming from server.
export const error = {
  message: "Error",
  code: "500"
};

export const kiosk = {
  type: "touch",
  url: "/url/to/action"
};

export const hours = {
  '2000-01-01': {
    open: '1am',
    close: '2am',
    string_date: 'Jan 01, 2000',
    sortable_date: '2000-01-01'
  }
};

export const map = {
  title: "Floor 1",
  image_url: "/assets/images/FloorMaps/floor_0.png"
};