import fetch from 'isomorphic-fetch';
import moment from 'moment';
import {addError, setSlides} from './kioskActions';

export const SET_ROOMS_AVAILABLE_COUNT = 'SET_ROOMS_AVAILABLE_COUNT';
export const setRoomsAvailableCount = (rooms_available_count, date) => {
  return {
    type: SET_ROOMS_AVAILABLE_COUNT,
    data: {
      rooms_available_count, date
    }
  };
};

export const FETCHING_ROOMS_AVAILABLE_COUNT = 'FETCHING_ROOMS_AVAILABLE_COUNT';
export const fetchingRoomsAvailableCount = () => {
  return {
    type: FETCHING_ROOMS_AVAILABLE_COUNT
  };
};

export const FETCHED_ROOMS_AVAILABLE_COUNT = 'FETCHED_ROOMS_AVAILABLE_COUNT';
export const fetchedRoomsAvailableCount = () => {
  return {
    type: FETCHED_ROOMS_AVAILABLE_COUNT
  };
};

export const fetchRoomsAvailableCount = (url, date) => {
  return (dispatch) => {
    dispatch(fetchingRoomsAvailableCount());
    // Default to today
    if (!date) {
      date = moment();
    }
    let parsed_date = moment(date).format("YYYYMMDDHHmmss");
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
            return {"error": "Rooms available not found for the selected date."};
          default:
            return {"error": "Error fetching rooms available, please notify the help desk."};
        }
      })
      .then(json => {
        dispatch(setRoomsAvailableCount(json, parsed_date));
        setTimeout(() => {
          dispatch(fetchedRoomsAvailableCount());
        }, 800);
      })
      .catch(err => {
        dispatch(addError({message: err.message, code: err.code}));
        dispatch(fetchedRoomsAvailableCount());
      });
  };
};

