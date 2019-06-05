import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import ConnectedModalWindow from "../../ModalWindow"
import Coverflow from "react-coverflow"
import LargeSlide from "./LargeSlide"
import { trackClicked } from "../shared/GoogleAnalytics"

const Kiosk = props => {
  const [active, setActive] = useState(0)
  const [activeSlide, setActiveSlide] = useState(undefined)
  const [primary_slides, setPrimarySlides] = useState([])
  const [restart_kiosk_timeout, setRestartKioskTimeout] = useState(undefined)
  const [rotate_slide_timeout, setRotateSlideTimeout] = useState(undefined)
  const [
    restart_active_slide_rotation_timeout,
    setRestartActiveSlideRotationTimeout
  ] = useState(undefined)

  useEffect(() => {
    if (active && activeSlide !== undefined) {
      console.log(
        "DonorCoverflowKiosk shouldComponentUpdate: showing modal, clearing timeouts"
      )
      clearInterval(rotate_slide_timeout)
      clearTimeout(restart_active_slide_rotation_timeout)
      setRotateSlideTimeout(undefined)
      setRestartActiveSlideRotationTimeout(undefined)
      props.setModalVisibility(true)
      // give reference to the rotation function so that when the back button is tapped
      // or the slide is automatically hidden, it can initiate the rotation to resume
      props.setModalRootComponent(
        <LargeSlide
          slide={activeSlide}
          rotateActiveSlides={_rotateActiveSlides}
          {...props}
        />
      )
    } else {
      // Start the slide rotation if it isn't already running and if the user
      // hadn't tapped a slide to make it active. Otherwise, if a user had tapped
      // a slide to make it active, then clear all of the rotation timers
      // and set a long delay to restart the rotation. If a user hadn't interacted with the
      // UI for many seconds, then restart the automatic rotation.
      if (!rotate_slide_timeout && !activeSlide) {
        _rotateActiveSlides()
      } else if (activeSlide) {
        clearInterval(rotate_slide_timeout)
        clearTimeout(restart_active_slide_rotation_timeout)
        setRotateSlideTimeout(undefined)
        setRestartActiveSlideRotationTimeout(
          setTimeout(() => {
            _rotateActiveSlides()
          }, 45000)
        )
      }
    }
    return () => {
      clearInterval(restart_kiosk_timeout)
      clearTimeout(restart_active_slide_rotation_timeout)
      clearInterval(rotate_slide_timeout)
    }
  }, [active, activeSlide])

  useEffect(() => {
    _fetchRestartKioskTimeout(props)
    _primarySlides(props)
  }, [])

  const _fetchRestartKioskTimeout = props => {
    const interval_id = setInterval(() => {
      props.fetchRestartKiosk(props.url)
    }, 1 * 60 * 1000)
    setRestartKioskTimeout(interval_id)
  }

  const _primarySlides = props => {
    let primary_slide_ids = props.slides.map(
      (s, _i) => s.collection.primary_slide.id
    )
    setPrimarySlides(
      props.slides.filter(
        (e, i) => primary_slide_ids.findIndex(a => a === e.id) > -1
      )
    )
    setActive(1)
  }

  const _rotateActiveSlides = () => {
    clearTimeout(restart_active_slide_rotation_timeout)
    clearInterval(rotate_slide_timeout)
    setRotateSlideTimeout(undefined)
    setRestartActiveSlideRotationTimeout(undefined)
    const interval_id = setInterval(() => {
      const random_slide = Math.floor(Math.random() * primary_slides.length)
      setActiveSlide(undefined)
      setActive(random_slide)
    }, 30000)
    setRotateSlideTimeout(interval_id)
  }

  const slideClicked = (e, slide, index, props) => {
    trackClicked(
      props.google_analytics,
      `${props.kiosk_name}:${props.kiosk_id}:DonorCoverflowKiosk:SlideClicked`
    )
    clearTimeout(restart_active_slide_rotation_timeout)
    clearInterval(rotate_slide_timeout)
    setRotateSlideTimeout(undefined)
    setRestartActiveSlideRotationTimeout(undefined)
    setActive(index)
    setActiveSlide(slide)
  }
  return (
    <div id="donor_coverflow_kiosk" style={{ backgroundColor: "#006A8E" }}>
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
        <div className="kiosk-header" style={{ textAlign: "right" }}>
          <h2
            style={{
              margin: 0,
              color: "#eee",
              fontWeight: "lighter",
              fontSize: "5.5rem"
            }}
          >
            OSU Libraries and Press
          </h2>
          <h2 style={{ margin: 0, color: "#eee", fontSize: "8rem" }}>
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
          navigation={true}
          infiniteScroll={true}
          enableScroll={true}
          clickable={true}
          enableHeading={false}
          active={active}
          currentFigureScale={2}
          otherFigureScale={1}
        >
          {primary_slides.map((slide, i) => {
            return (
              <div
                key={`slide.${i}`}
                data-slide_index={i}
                onClick={e => slideClicked(e, slide, i, props)}
                onKeyDown={e => slideClicked(e, slide, i, props)}
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
