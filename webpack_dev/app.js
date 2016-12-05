import React from "react";
import ReactDOM from "react-dom";
import Root from "../app/assets/javascripts/components/containers/Root";

const slides = [
  {
    id: 1,
    content: "Hello World"
  },
  {
    id: 2,
    content: "Hi"
  }
];

// If this hasn't been defined by a view rendering this app, then set it as the default type of kiosk.
if(typeof KIOSK_TYPE === 'undefined') {
  var KIOSK_TYPE = "default";
}

require("../app/assets/stylesheets/main.scss");

if(document.getElementById('application_root')) {
  ReactDOM.render(
    <Root slides={slides} kiosk_type={KIOSK_TYPE} />,
    document.getElementById('application_root')
  );
} else {
  console.log("div#application_root doesn't exist, unable to start application.");
}
