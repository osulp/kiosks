import React, { Component } from "react"
import PropTypes from "prop-types"
import { trackClicked } from "../shared/GoogleAnalytics"

const root_dom_element = document.getElementById("application_root")

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
      search_term: ""
    }
  }

  componentDidMount() {
    $("#primo_search").keyboard({
      autoAccept: true,
      layout: "custom",
      customLayout: {
        normal: [
          "1 2 3 4 5 6 7 8 9 0 - = {bksp} {clear!!}",
          "q w e r t y u i o p",
          "a s d f g h j k l ; '",
          "z x c v b n m , .",
          "{cancel} {space} {accept}"
        ]
      },
      display: {
        clear: "Clear",
        accept: "Search"
      },
      acceptValid: true,
      accepted: function(e, k, el) {
        el.dispatchEvent(new Event("input", { bubbles: true }))
      }
    })
    $("#primo_search_icon").on("click", function(e) {
      document
        .getElementById("primo_search")
        .dispatchEvent(new Event("input", { bubbles: true }))
    })
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
    this.setState({ search_term: e.target.value })
    if (this.state.search_timer === null) {
      let self = this
      let term = e.target.value
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
    this.setState({ search_term: "" })
    this.setState({ search_uri: root_dom_element.getAttribute("data-api-uri") })
    this.setState({ search_iframe_key: Math.random() })
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
              <input
                className="form-control"
                value={this.state.search_term}
                type="text"
                id="primo_search"
                onChange={this.performSearch.bind(this)}
                placeholder="Search Valley Library resources"
              />
              <i id="primo_search_icon" className="material-icons">
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
