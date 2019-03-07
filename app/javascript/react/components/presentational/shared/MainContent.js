import { connect } from "react-redux"
import React, { Component, PropTypes } from "react"

class MainContent extends Component {
  closeContent(event) {
    // prevents clicks from within the root_component from triggering the close. User can click on the close
    // icon or anywhere outside of the root_component to close the content.
    if (event.target.id == "content" || event.target.id == "content_close") {
      this.props.setContentRootComponent()
    }
  }

  render() {
    let root_component = this.props.root_component
    return <div id="content">{root_component}</div>
  }
}

MainContent.propTypes = {
  root_component: PropTypes.element,
  setContentRootComponent: PropTypes.func.isRequired
}

export default MainContent
