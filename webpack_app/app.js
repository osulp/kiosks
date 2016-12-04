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

require("../app/assets/stylesheets/application.scss");

ReactDOM.render(
  <Root slides={slides} />,
  document.getElementById('root')
);
