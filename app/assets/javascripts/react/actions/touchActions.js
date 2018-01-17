import fetch from 'isomorphic-fetch';
import moment from 'moment';
import {addError, setSlides} from './kioskActions';

export const SET_MAPS = 'SET_MAPS';
export const setMaps = (maps) => {
  return {
    type: SET_MAPS,
    maps
  };
};

export const FETCHING_SLIDES = 'FETCHING_SLIDES';
export const fetchingSlides = () => {
  return {
    type: FETCHING_SLIDES
  };
};

export const FETCHED_SLIDES = 'FETCHED_SLIDES';
export const fetchedSlides = () => {
  return {
    type: FETCHED_SLIDES
  };
};

/**
 * A redux-thunk async action that fetches from the server and handles the return by dispatching a regular
 * action depending on success or error.
 * @param url - the url to the server for fetching slides
 * @returns {Redux Async Action} - see http://redux.js.org/docs/advanced/AsyncActions.html
 */
export const fetchSlides = (url) => {
  return (dispatch) => {
    dispatch(fetchingSlides());
    return fetch(`${url}.json`)
      .then(response => response.json())
      .then(json => {
        dispatch(setSlides(json.slides));
        // it's fast, so let the fetching_slides animation run for 800ms more. ;)
        setTimeout(() => {
          dispatch(fetchedSlides());
        }, 800);
      })
      .catch(err => {
        dispatch(addError({message: err.message, code: err.code}));
        dispatch(fetchedSlides());
      });
  };
};

export const SET_HOURS = 'SET_HOURS';
export const setHours = (hours) => {
  return {
    type: SET_HOURS,
    hours
  };
};

export const FETCHING_HOURS = 'FETCHING_HOURS';
export const fetchingHours = () => {
  return {
    type: FETCHING_HOURS
  };
};

export const FETCHED_HOURS = 'FETCHED_HOURS';
export const fetchedHours = () => {
  return {
    type: FETCHED_HOURS
  };
};

/**
 * A redux-thunk async action that fetches from the server and handles the return by dispatching a regular
 * action depending on success or error.
 * @param url - the url to the server for fetching slides
 * @returns {Redux Async Action} - see http://redux.js.org/docs/advanced/AsyncActions.html
 */
export const fetchHours = (url, dates) => {
  return (dispatch) => {
    dispatch(fetchingHours());
    // Default to this weeks dates if dates is undefined
    if (!dates) {
      dates = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        .map(d => moment().day(d).format('YYYY-MM-DD'));
    }
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.kiosks.v1',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({dates: [...dates]})
    })
      .then(response => {
        switch (response.status) {
          case 200:
            return response.json();
          case 404:
            return {"error": "Hours not found for the selected date."};
          default:
            return {"error": "Error fetching hours, please notify the help desk."};
        }
      })
      .then(json => {
        dispatch(setHours(json));
        // it's fast, so let the fetching_hours animation run for 800ms more. ;)
        setTimeout(() => {
          dispatch(fetchedHours());
        }, 800);
      })
      .catch(err => {
        dispatch(addError({message: err.message, code: err.code}));
        dispatch(fetchedHours());
      });
  };
};

export const SET_CLASSROOM_SCHEDULE = 'SET_CLASSROOM_SCHEDULE';
export const setClassroomSchedule = (classroom_schedule, date) => {
  return {
    type: SET_CLASSROOM_SCHEDULE,
    data: {
      classroom_schedule, date
    }
  };
};

export const FETCHING_CLASSROOM_SCHEDULE = 'FETCHING_CLASSROOM_SCHEDULE';
export const fetchingClassroomSchedule = () => {
  return {
    type: FETCHING_CLASSROOM_SCHEDULE
  };
};

export const FETCHED_CLASSROOM_SCHEDULE = 'FETCHED_CLASSROOM_SCHEDULE';
export const fetchedClassroomSchedule = () => {
  return {
    type: FETCHED_CLASSROOM_SCHEDULE
  };
};

export const fetchClassroomSchedule = (url, date) => {
  return (dispatch) => {
    dispatch(fetchingClassroomSchedule());
    // Default to today
    if (!date) {
      date = moment();
    }
    let parsed_date = moment(date).format("YYYYMMDD");
    return fetch(`${url.replace("{date}", parsed_date)}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.kiosks.v1',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        switch (response.status) {
          case 200:
            return response.json();
          case 404:
            return {"error": "Classroom schedule not found for the selected date."};
          default:
            return {"error": "Error fetching classroom schedule, please notify the help desk."};
        }
      })
      .then(json => {
        dispatch(setClassroomSchedule(json, parsed_date));
        // it's fast, so let the fetching_classroom_schedule animation run for 800ms more. ;)
        setTimeout(() => {
          dispatch(fetchedClassroomSchedule());
        }, 800);
      })
      .catch(err => {
        dispatch(addError({message: err.message, code: err.code}));
        dispatch(fetchedClassroomSchedule());
      });
  };
};

export const TOGGLE_CLASSROOM_SELECTED = 'TOGGLE_CLASSROOM_SELECTED';
export const toggleClassroomSelected = (shortname, selected) => {
  return {
    type: TOGGLE_CLASSROOM_SELECTED,
    data: {shortname, selected: selected}
  };
};

export const FETCHING_CLASSROOMS = 'FETCHING_CLASSROOMS';
export const fetchingClassrooms = () => {
  return {
    type: FETCHING_CLASSROOMS
  };
};
export const FETCHED_CLASSROOMS = 'FETCHED_CLASSROOMS';
export const fetchedClassrooms = (classrooms) => {
  return {
    type: FETCHED_CLASSROOMS,
    classrooms
  };
};

export const fetchClassrooms = (url) => {
  return (dispatch) => {
    dispatch(fetchingClassrooms());
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.kiosks.v1',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        switch (response.status) {
          case 200:
            return response.json();
          case 404:
            return {"error": "Classrooms not found."};
          default:
            return {"error": "Error fetching classrooms, please notify the help desk."};
        }
      })
      .then(json => {
        // array reduce to translate from an array to an object map while
        // adding "selected" field to each of the classrooms for the purpose of the UI
        // to track which classrooms are selected.
        const classrooms = json.reduce((accumulator, current, index) => {
          accumulator[current.shortname] = Object.assign({}, current, {selected: true});
          return accumulator;
        }, {});
        // it's fast, so let the fetching_classrooms animation run for 800ms more. ;)
        setTimeout(() => {
          dispatch(fetchedClassrooms(classrooms));
        }, 800);
      })
      .catch(err => {
        dispatch(addError({message: err.message, code: err.code}));
        dispatch(fetchedClassrooms([]));
      });
  };
};
