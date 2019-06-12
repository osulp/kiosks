import React, { Component } from "react"
import PropTypes from "prop-types"
import Keyboard from "react-simple-keyboard"
import "react-simple-keyboard/build/css/index.css"

const root_dom_element = document.getElementById("application_root")
const keyboard_layout = {
  default: [
    "{clear} {enter} {hide}",
    "1 2 3 4 5 6 7 8 9 0 - = {bksp}",
    "q w e r t y u i o p [ ] \\",
    "a s d f g h j k l ; ' {enter}",
    "z x c v b n m , . / {shift}",
    "{space}"
  ],
  shift: [
    "{clear} {enter} {hide}",
    "! @ # $ % ^ & * ( ) _ + {bksp}",
    "Q W E R T Y U I O P { } |",
    'A S D F G H J K L : " {enter}',
    "Z X C V B N M < > ? {shift}",
    "{space}"
  ]
}

class Iframe extends Component {
  render() {
    return (
      <div>
        <iframe
          key={this.props.search_iframe_key}
          src={this.props.src}
          height={this.props.height}
          width={this.props.width}
          frameBorder={0}
        />
      </div>
    )
  }
}

class SearchPrimo extends Component {
  /**
   * Initialize an Search Primo UI
   * @param props - the properties passed into the component
   */
  constructor(props) {
    super(props)
    this.state = {
      uri: root_dom_element.getAttribute("data-api-uri"),
      search_delay: 1000,
      search_querystring:
        "query=any,contains,[TERM]&tab=default_tab&search_scope=osu_print",
      search_timer: null,
      search_uri: root_dom_element.getAttribute("data-api-uri"),
      search_iframe_key: Math.random(),
      search_term: "",
      keyboardVisible: true,
      layoutName: "default"
    }
  }

  searchUri(term) {
    if (term !== "") {
      return (
        this.state.uri +
        "&" +
        this.state.search_querystring.replace("[TERM]", term)
      )
    } else {
      return this.state.uri
    }
  }

  performSearch(e) {
    let term = this.primo_search.value
    this.setState({ search_term: term })
    if (this.state.search_timer === null) {
      let self = this
      let search_uri = this.searchUri(term)
      let timer = setTimeout(function() {
        self.setState({ search_uri: search_uri, search_timer: null })
      }, this.state.search_delay)
      this.setState({ search_timer: timer })
    } else {
      clearTimeout(this.state.search_timer)
      this.setState({ search_timer: null })
    }
  }

  resetSearch(e) {
    this.primo_search.value = ""
    this.setState({
      search_term: "",
      search_uri: root_dom_element.getAttribute("data-api-uri"),
      search_iframe_key: Math.random()
    })
  }

  onKeyPress = button => {
    if (button === "{shift}" || button === "{lock}") this.handleShift()
    if (button === "{enter}") {
      this.setState({ keyboardVisible: false })
      this.performSearch()
    }
    if (button === "{clear}" || button === "{hide}") {
      this.primo_search.value = ""
      this.setState({ keyboardVisible: false })
      this.keyboardRef.keyboard.clearInput()
    }
  }

  handleShift = () => {
    let layoutName = this.state.layoutName
    this.setState({
      layoutName: layoutName === "default" ? "shift" : "default"
    })
  }

  /**
   * Includes Bootstrap elements for mobile and regular displays using hidden-*  and col-* semantics
   * @returns {JSX} - the rendered UI
   */
  render() {
    return (
      <div id="search-primo" className="panel panel-default">
        <div className="container-fluid search-primo-table-container">
          <div className="row search-bar">
            <div className="start_new_search">
              <button
                className="btn btn-default"
                type="button"
                onClick={this.resetSearch.bind(this)}
              >
                New Search
              </button>
            </div>
            <div className="col-sm-6 col-sm-offset-3">
              <div
                className={`keyboard-container ${
                  this.state.keyboardVisible ? "" : "hidden"
                }`}
              >
                <Keyboard
                  ref={r => (this.keyboardRef = r)}
                  layout={keyboard_layout}
                  display={{
                    "{hide}": "Hide Keyboard",
                    "{enter}": "Search",
                    "{clear}": "Clear"
                  }}
                  mergeDisplay={true}
                  layoutName={this.state.layoutName}
                  onChange={input => (this.primo_search.value = input)}
                  onKeyPress={button => this.onKeyPress(button)}
                />
              </div>
              <input
                className="form-control"
                ref={input => (this.primo_search = input)}
                type="text"
                id="primo_search"
                placeholder="Search Valley Library resources"
                onClick={() => this.setState({ keyboardVisible: true })}
              />
              <i
                id="primo_search_icon"
                className="material-icons"
                onClick={e => this.performSearch(e)}
              >
                search
              </i>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 search-iframe">
              <Iframe
                search_iframe_key={this.state.search_iframe_key}
                src={this.state.search_uri}
                height={(window.innerHeight - 50).toString() + "px"}
                width="100%"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SearchPrimo.propTypes = {
  api: PropTypes.object.isRequired,
  google_analytics: PropTypes.func
}

export default SearchPrimo
