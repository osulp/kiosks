import React, { Component, PropTypes } from "react"
import ConnectedModalWindow from "../../ModalWindow"
import Coverflow from "react-coverflow"
import LargeSlide from "./LargeSlide"
import { trackClicked } from "../shared/GoogleAnalytics"

class Kiosk extends Component {
  constructor(props) {
    super(props)
    this.state = { active: 0 }
  }

  /**
   * After the component mounts, fetch the restart_kiosk value
   */
  componentDidMount() {
    this._fetchRestartKioskTimeout()
  }

  /**
   * Before the component unmounts, clear the timeouts.
   */
  componentWillUnmount() {
    clearInterval(this.restart_kiosk_timeout)
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

  slideClicked(slide, index) {
    trackClicked(
      this.props.google_analytics,
      `${this.props.kiosk_name}:${
        this.props.kiosk_id
      }:DonorCoverflowKiosk:SlideClicked`
    )
    if (this.state.active === index) {
      this.props.setModalVisibility(true)
      this.props.setModalRootComponent(
        <LargeSlide slide={slide} {...this.props} />
      )
    } else {
      this.setState({ active: index })
    }
  }

  render() {
    return (
      <div id="donor_coverflow_kiosk">
        <ConnectedModalWindow />
        <Coverflow
          displayQuantityOfSide={2}
          navigation={false}
          enableScroll={true}
          clickable={true}
          active={this.state.active}
        >
          {this.props.slides.map((slide, i) => {
            return (
              <div
                key={`slide.${i}`}
                onClick={this.slideClicked.bind(this, slide, i)}
                onKeyDown={this.slideClicked.bind(this, slide, i)}
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
