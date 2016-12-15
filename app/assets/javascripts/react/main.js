import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/Root";

require("../../stylesheets/application.scss");
const root_dom_element = document.getElementById('application_root');

const setSlides = (slides) => {
  if(!slides) {
    return [];
  }
  let json = JSON.parse(slides);
  return json.slides ? json.slides : json;
};

if (root_dom_element) {
  let slides = setSlides(root_dom_element.getAttribute('data-slides'));
  let kiosk_type = root_dom_element.getAttribute('data-kiosk-type');
  let kiosk_url = root_dom_element.getAttribute('data-kiosk-url');

  // render the root container with properties
  ReactDOM.render(
    <Root slides={slides}
          kiosk_type={kiosk_type}
          kiosk_url={kiosk_url}
    />,
    root_dom_element
  );
} else {
  console.error("div#application_root doesn't exist, unable to start application.");
}
