import fetch from 'isomorphic-fetch';
import {addError, setSlides} from './kioskActions';

/**
 * A redux-thunk async action that fetches from the server and handles the return by dispatching a regular
 * action depending on success or error.
 * @param url - the url to the server for fetching slides
 * @returns {Redux Async Action} - see http://redux.js.org/docs/advanced/AsyncActions.html
 */
export const fetchSlides = (url) => {
  return (dispatch) => {
    // TODO: dispatch an action prior to fetch, such as FETCHING_SLIDES to have the front-end spin an indicator or such?
    return fetch(`${url}.json`)
      .then(response => response.json())
      .then(json => dispatch(setSlides(json.slides)))
      .catch(err => dispatch(addError({message: err.message, code: err.code})));
  };
};
