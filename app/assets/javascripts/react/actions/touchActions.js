import fetch from "isomorphic-fetch";
import moment from "moment";
import { addError, setSlides } from "./kioskActions";

export const SET_MAPS = "SET_MAPS";
export const setMaps = maps => {
  return {
    type: SET_MAPS,
    maps
  };
};

export const FETCHING_SLIDES = "FETCHING_SLIDES";
export const fetchingSlides = () => {
  return {
    type: FETCHING_SLIDES
  };
};

export const FETCHED_SLIDES = "FETCHED_SLIDES";
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
export const fetchSlides = url => {
  return dispatch => {
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
        dispatch(addError({ message: err.message, code: err.code }));
        dispatch(fetchedSlides());
      });
  };
};

export const FETCHING_RESTART_KIOSK = "FETCHING_RESTART_KIOSK";
export const fetchingRestartKiosk = () => {
  return {
    type: FETCHING_RESTART_KIOSK
  };
};

export const FETCHED_RESTART_KIOSK = "FETCHED_RESTART_KIOSK";
export const fetchedRestartKiosk = () => {
  return {
    type: FETCHED_RESTART_KIOSK
  };
};

/**
 * A redux-thunk async action that fetches from the server and handles the return by dispatching a regular
 * action depending on success or error.
 * @param url - the url to the server for fetching restart_kiosk
 * @returns {Redux Async Action} - see http://redux.js.org/docs/advanced/AsyncActions.html
 */
export const fetchRestartKiosk = url => {
  return dispatch => {
    dispatch(fetchingRestartKiosk());
    return fetch(`${url}.json`)
      .then(response => response.json())
      .then(json => {
        if (json.restart_kiosk == "true") {
          window.location.reload(true);
        }
        dispatch(setRestartKiosk(json.restart_kiosk));
        setTimeout(() => {
          dispatch(fetchedRestartKiosk());
        }, 800);
      })
      .catch(err => {
        dispatch(addError({ message: err.message, code: err.code }));
        dispatch(fetchedRestartKiosk());
      });
  };
};

export const SET_HOURS = "SET_HOURS";
export const setHours = hours => {
  return {
    type: SET_HOURS,
    hours
  };
};

export const FETCHING_HOURS = "FETCHING_HOURS";
export const fetchingHours = () => {
  return {
    type: FETCHING_HOURS
  };
};

export const FETCHED_HOURS = "FETCHED_HOURS";
export const fetchedHours = () => {
  return {
    type: FETCHED_HOURS
  };
};

export const SET_TODAYS_HOURS = "SET_TODAYS_HOURS";
export const setTodaysHours = todays_hours => {
  return {
    type: SET_TODAYS_HOURS,
    todays_hours
  };
};

export const FETCHING_TODAYS_HOURS = "FETCHING_TODAYS_HOURS";
export const fetchingTodaysHours = () => {
  return {
    type: FETCHING_TODAYS_HOURS
  };
};

export const FETCHED_TODAYS_HOURS = "FETCHED_TODAYS_HOURS";
export const fetchedTodaysHours = () => {
  return {
    type: FETCHED_TODAYS_HOURS
  };
};

/**
 * A redux-thunk async action that fetches from the server and handles the return by dispatching a regular
 * action depending on success or error.
 * @param url - the url to the server for fetching slides
 * @returns {Redux Async Action} - see http://redux.js.org/docs/advanced/AsyncActions.html
 */
export const fetchHours = (url, dates) => {
  return dispatch => {
    dispatch(fetchingHours());
    // Default to this weeks dates if dates is undefined
    if (!dates) {
      dates = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ].map(d =>
        moment()
          .day(d)
          .format("YYYY-MM-DD")
      );
    }
    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/vnd.kiosks.v1",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ dates: [...dates] })
    })
      .then(response => {
        switch (response.status) {
          case 200:
            return response.json();
          case 404:
            return { error: "Hours not found for the selected date." };
          default:
            return {
              error: "Error fetching hours, please notify the help desk."
            };
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
        dispatch(addError({ message: err.message, code: err.code }));
        dispatch(fetchedHours());
      });
  };
};

/**
 * A redux-thunk async action that fetches from the server and handles the return by dispatching a regular
 * action depending on success or error.
 * @param url - the url to the server for fetching slides
 * @returns {Redux Async Action} - see http://redux.js.org/docs/advanced/AsyncActions.html
 */
export const fetchTodaysHours = url => {
  return dispatch => {
    dispatch(fetchingTodaysHours());
    let now = moment().format("YYYY-MM-DD");
    let dates = [now];
    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/vnd.kiosks.v1",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ dates: [...dates] })
    })
      .then(response => {
        switch (response.status) {
          case 200:
            return response.json();
          case 404:
            return { error: "Hours not found for the selected date." };
          default:
            return {
              error: "Error fetching hours, please notify the help desk."
            };
        }
      })
      .then(json => {
        dispatch(setTodaysHours(json));
        // it's fast, so let the fetching_hours animation run for 800ms more. ;)
        setTimeout(() => {
          dispatch(fetchedTodaysHours());
        }, 800);
      })
      .catch(err => {
        dispatch(addError({ message: err.message, code: err.code }));
        dispatch(fetchedTodaysHours());
      });
  };
};
