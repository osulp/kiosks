export {
  initial_state
} from "../../../app/javascript/react/reducers/kioskReducer"

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
}

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
}

export const slides = [slide, slide2]

// TODO: Establish the proper shape of data coming from server.
export const error = {
  message: "Error",
  code: "500"
}

export const kiosk = {
  type: "touch",
  url: "/url/to/action",
  api: {
    hours: "/api/v1/hours"
  },
  title: "",
  slides: [],
  restart_kiosk: "",
  starting_slide_index: 0,
  errors: []
}

export const hours = {
  "2000-01-01": {
		all_open_hours: [
			{
				close: "21:00",
				open: "07:30"
			}
	  ],
	  close: "9:00pm",
	  closes_at_night: true,
	  event_desc: "",
	  event_status: "",
	  formatted_hours: "7:30am - 9:00pm",
	  formatted_hours_plain_text: "7:30am - 9:00pm",
	  open: "7:30am",
	  open_all_day: false,
	  sortable_date: "2023-06-29",
	  string_date: "Thu, Jun 29, 2023"
  }
}

export const map = {
  title: "Floor 1",
  image_url: "/assets/images/FloorMaps/floor_0.png"
}

export const room = {
  id: 25,
  name: "6761",
  floor: 6,
  created_at: "2014-03-21T09:29:23.451-07:00",
  updated_at: "2014-04-09T07:24:06.852-07:00",
  description: "Group Study\r\nCapacity: 6",
  image: "pic6761.png",
  floor_map: "6761.png"
}

export const room2 = {
  id: 28,
  name: "6763",
  floor: 6,
  created_at: "2014-03-21T09:29:23.475-07:00",
  updated_at: "2014-04-09T07:24:16.855-07:00",
  description: "Group Study\r\nCapacity: 6",
  image: "pic6763.png",
  floor_map: "6763.png"
}

export const rooms_available_count = [room, room2]
