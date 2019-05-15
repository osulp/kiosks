import React, { Component } from "react"
import PropTypes from "prop-types"
import ConnectedModalWindow from "../../ModalWindow"
import Coverflow from "react-coverflow"
import LargeSlide from "./LargeSlide"
import { trackClicked } from "../shared/GoogleAnalytics"

class Kiosk extends Component {
  constructor(props) {
    super(props)
    this.state = { active: 0, primary_slides: [], activeSlide: undefined }
  }

  /**
   * After the component mounts, fetch the restart_kiosk value
   */
  componentDidMount() {
    this._fetchRestartKioskTimeout()
    this._primarySlides()
  }

  /**
   * Before the component unmounts, clear the timeouts.
   */
  componentWillUnmount() {
    clearInterval(this.restart_kiosk_timeout)
    clearTimeout(this.restart_active_slide_rotation_timeout)
    clearInterval(this.rotate_slide_timeout)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.active === nextState.active &&
      nextState.activeSlide !== undefined
    ) {
      console.log(
        "DonorCoverflowKiosk shouldComponentUpdate: showing modal, clearing timeouts"
      )
      clearInterval(this.rotate_slide_timeout)
      clearTimeout(this.restart_active_slide_rotation_timeout)
      this.rotate_slide_timeout = undefined
      this.restart_active_slide_rotation_timeout = undefined
      this.props.setModalVisibility(true)
      // give reference to the rotation function so that when the back button is tapped
      // or the slide is automatically hidden, it can initiate the rotation to resume
      this.props.setModalRootComponent(
        <LargeSlide
          slide={nextState.activeSlide}
          rotateActiveSlides={this._rotateActiveSlides.bind(this)}
          {...this.props}
        />
      )
    } else {
      // Start the slide rotation if it isn't already running and if the user
      // hadn't tapped a slide to make it active. Otherwise, if a user had tapped
      // a slide to make it active, then clear all of the rotation timers
      // and set a long delay to restart the rotation. If a user hadn't interacted with the
      // UI for many seconds, then restart the automatic rotation.
      if (!this.rotate_slide_timeout && !nextState.activeSlide) {
        this._rotateActiveSlides()
      } else if (nextState.activeSlide) {
        clearInterval(this.rotate_slide_timeout)
        clearTimeout(this.restart_active_slide_rotation_timeout)
        this.rotate_slide_timeout = undefined
        this.restart_active_slide_rotation_timeout = undefined
        this.restart_active_slide_rotation_timeout = setTimeout(() => {
          this._rotateActiveSlides()
        }, 45000)
      }
    }
    return true
  }

  /**
   * Fetch the restart_kiosk value for donor kiosk every 1 minute in order to restart the kiosk as scheduled
   * @private
   */
  _fetchRestartKioskTimeout() {
    this.restart_kiosk_timeout = setInterval(() => {
      this.props.fetchRestartKiosk(this.props.url)
    }, 1 * 60 * 1000)
  }

  _primarySlides() {
    let primary_slide_ids = this.props.slides.map(
      (s, _i) => s.collection.primary_slide.id
    )
    // in-line unique filter
    this.setState({
      primary_slides: this.props.slides.filter(
        (e, i) => primary_slide_ids.findIndex(a => a === e.id) > -1
      ),
      active: 1
    })
  }

  _rotateActiveSlides() {
    clearInterval(this.rotate_slide_timeout)
    clearTimeout(this.restart_active_slide_rotation_timeout)
    this.rotate_slide_timeout = undefined
    this.restart_active_slide_rotation_timeout = undefined
    this.rotate_slide_timeout = setInterval(() => {
      const random_slide = Math.floor(
        Math.random() * this.state.primary_slides.length
      )
      this.setState({
        activeSlide: undefined,
        active: random_slide
      })
    }, 30000)
  }

  slideClicked(e, slide, index) {
    trackClicked(
      this.props.google_analytics,
      `${this.props.kiosk_name}:${
        this.props.kiosk_id
      }:DonorCoverflowKiosk:SlideClicked`
    )
    clearTimeout(this.restart_active_slide_rotation_timeout)
    this.restart_active_slide_rotation_timeout = undefined
    clearInterval(this.rotate_slide_timeout)
    this.rotate_slide_timeout = undefined
    this.setState({ active: index, activeSlide: slide })
  }

  render() {
    return (
      <div id="donor_coverflow_kiosk" style={{ backgroundColor: "#0d5257" }}>
        <ConnectedModalWindow />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center"
          }}
        >
          <div style={{ textAlign: "right" }}>
            <h2
              style={{
                margin: 0,
                color: "#eee",
                fontWeight: "lighter",
                fontSize: "5.5rem"
              }}
            >
              VALLEY LIBRARY
            </h2>
            <h2 style={{ margin: 0, color: "#eee", fontSize: "7.5rem" }}>
              Donor Initiatives
            </h2>
          </div>
          <div style={{ flexBasis: "25%" }}>
            <img
              src="/images/library1.svg"
              style={{ width: "100%", boxShadow: "none" }}
            />
          </div>
        </div>
        <div className="component">
          <Coverflow
            displayQuantityOfSide={2}
            navigation={false}
            infiniteScroll={true}
            enableScroll={true}
            clickable={true}
            enableHeading={false}
            active={this.state.active}
            currentFigureScale={2}
            otherFigureScale={1}
          >
            {this.state.primary_slides.map((slide, i) => {
              return (
                <div
                  key={`slide.${i}`}
                  data-slide_index={i}
                  onClick={e => this.slideClicked(e, slide, i)}
                  onKeyDown={e => this.slideClicked(e, slide, i)}
                  role="menuitem"
                  tabIndex={i}
                >
                  <img
                    src={slide.original}
                    style={{
                      display: "block",
                      width: "100%"
                    }}
                  />
                  <span className="caption">{slide.caption}</span>
                </div>
              )
            })}
          </Coverflow>
        </div>
      </div>
    )
  }
}

Kiosk.propTypes = {
  slides: PropTypes.array.isRequired,
  kiosk_name: PropTypes.string,
  kiosk_id: PropTypes.string,
  restart_kiosk: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  google_analytics: PropTypes.object.isRequired,
  setModalVisibility: PropTypes.func.isRequired,
  fetchRestartKiosk: PropTypes.func.isRequired,
  setModalRootComponent: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired
}

export default Kiosk
