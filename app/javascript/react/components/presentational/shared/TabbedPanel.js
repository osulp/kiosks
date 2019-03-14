import React, { Component } from "react"
import PropTypes from "prop-types"

class TabbedPanel extends Component {
  constructor(props) {
    super(props)
    this.state = { selected_tab_index: props.selectedIndex }
    this.timer = undefined
  }

  setHideTimeout() {
    if (this.props.timeout) {
      const hide = () => {
        this.props.setModalRootComponent(undefined)
        this.props.setModalVisibility(false)
      }
      this.timer = setTimeout(hide, this.props.timeout)
    }
  }

  componentDidMount() {
    this.setHideTimeout()
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  _tabClicked(e) {
    this.setState({ selected_tab_index: e.target.dataset.index })
    clearTimeout(this.timer)
    this.setHideTimeout()
  }

  _tabSelectedClassName(i) {
    return i == this.state.selected_tab_index ? "selected" : ""
  }

  _tabSelectedButtonClassName(i) {
    return i == this.state.selected_tab_index ? "btn-primary" : ""
  }

  render() {
    let tabs = this.props.tabs
    let id = this.props.id || ""
    return (
      <div id={id} className="panel panel-default tabbed-panel">
        <div className="panel-heading">
          <div className="btn-group" role="group" aria-label="...">
            {tabs.map((t, i) => {
              return (
                <button
                  key={`tab_button.${i}`}
                  data-index={i}
                  type="button"
                  className={`${this._tabSelectedButtonClassName(
                    i
                  )} btn btn-default`}
                  onClick={this._tabClicked.bind(this)}
                >
                  {t.button_text}
                </button>
              )
            })}
          </div>
        </div>
        <div className="panel-body container-fluid">
          <ul>
            {tabs.map((t, i) => {
              return (
                <li
                  key={`tab_content.${i}`}
                  className={this._tabSelectedClassName(i)}
                  data-index={i}
                >
                  {t.content}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

TabbedPanel.propTypes = {
  id: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      button_text: PropTypes.string.isRequired,
      content: PropTypes.object.isRequired
    })
  ),
  timeout: PropTypes.number,
  setModalRootComponent: PropTypes.func.isRequired,
  setContentRootComponent: PropTypes.func.isRequired,
  setModalVisibility: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number.isRequired
}

export default TabbedPanel
