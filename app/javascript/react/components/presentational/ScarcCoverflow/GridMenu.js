import React, { Component } from "react"
import PropTypes from "prop-types"
import moment from "moment"

function MenuButton({ text_button }) {
  return (
    <li className="menu-button" onClick={e => {}}>
      <a
        className={`btn btn-navbar btn-default`}
      >
        <span className={"menu-item-text"}>{ text_button }</span>
      </a>
    </li>
  );
}

class GridMenu extends Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   selected_item: "home"
    // }
  }

  render() {
    return (
      <div className="col-md-12">
        <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              padding: "2.5em 0"
            }}
        >
          <ul className="nav navbar-nav navbar-expand">
            {this.props.primary_slides.map((primary_slide, i) => {
                return (
                  <MenuButton text_button={primary_slide.caption} />
                )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

GridMenu.propTypes = {
  slide: PropTypes.object.isRequired,
  primary_slides: PropTypes.array.isRequired,
  setModalVisibility: PropTypes.func.isRequired,
  setModalRootComponent: PropTypes.func.isRequired,
  rotateActiveSlides: PropTypes.func.isRequired
}

export default GridMenu
