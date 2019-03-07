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
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.active === nextState.active &&
      nextState.activeSlide !== undefined
    ) {
      this.props.setModalVisibility(true)
      this.props.setModalRootComponent(
        <LargeSlide slide={nextState.activeSlide} {...this.props} />
      )
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
      )
    })
  }

  slideClicked(e, slide, index) {
    trackClicked(
      this.props.google_analytics,
      `${this.props.kiosk_name}:${
        this.props.kiosk_id
      }:DonorCoverflowKiosk:SlideClicked`
    )
    this.setState({ active: index, activeSlide: slide })
  }

  render() {
    return (
      <div id="donor_coverflow_kiosk">
        <ConnectedModalWindow />
        <Coverflow
          displayQuantityOfSide={2}
          navigation={true}
          infiniteScroll={true}
          enableScroll={true}
          clickable={true}
          enableHeading={true}
          active={this.state.active}
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
                  alt={slide.caption}
                  style={{
                    display: "block",
                    width: "100%"
                  }}
                />
              </div>
            )
          })}
        </Coverflow>
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
