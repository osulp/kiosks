import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/Root";

require("../../stylesheets/application.scss");
let root_dom_element = document.getElementById('application_root');

if (root_dom_element) {
  let slides = root_dom_element.getAttribute('data-slides');
  let kiosk_type = root_dom_element.getAttribute('data-kiosk-type');
  let kiosk_url = root_dom_element.getAttribute('data-kiosk-url');

  // slides are stringified JSON set by the view that is rendering the app
  if (slides) {
    slides = JSON.parse(slides).slides;
  } else {
    // an empty set of slides, could allow for the app to query the server async
    slides = [];
  }

  // render the root container with properties
  ReactDOM.render(
    <Root slides={slides}
          kiosk_type={kiosk_type}
          kiosk_url={kiosk_url}
    />,
    root_dom_element
  );
} else {
  console.log("div#application_root doesn't exist, unable to start application.");
}
