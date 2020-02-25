import React, { Component } from "react"
import PropTypes from "prop-types"
import moment from "moment"

function MenuButton({ text_button, on_click}) {
  return (
    <li className="menu-button" onClick={ on_click }>
      <a
        className={ "btn btn-navbar btn-default" }
      >
        <span className={"menu-item-text"}>{ text_button }</span>
      </a>
    </li>
  );
}

const menuClicked = i => {
  // TODO: set active slide from current index i
  // alert(i)
}

class GridMenu extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    // TODO: re-render grid based on selectedIndex
    // alert(this.props.selectedIndex)
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
                  <MenuButton
                    key={`menu_button.${i}`}
                    text_button={primary_slide.caption}
                    on_click={_e => menuClicked(i)}
                     />
                )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

GridMenu.propTypes = {
  collection: PropTypes.object.isRequired,
  primary_slides: PropTypes.array.isRequired,
  setModalVisibility: PropTypes.func.isRequired,
  setModalRootComponent: PropTypes.func.isRequired,
  rotateActiveSlides: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number.isRequired
}

export default GridMenu
