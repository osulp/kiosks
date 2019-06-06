import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import ConnectedModalWindow from "../../ModalWindow"
import Coverflow from "react-coverflow"
import LargeSlide from "./LargeSlide"
import { trackClicked } from "../shared/GoogleAnalytics"

const Kiosk = props => {
  // Set local state variables and setter methods
  const [active, setActive] = useState({ index: 1, slide: undefined })
  const [primary_slides, setPrimarySlides] = useState([])
  const [restart_kiosk_timeout, setRestartKioskTimeout] = useState(undefined)
  const [rotate_slide_timeout, setRotateSlideTimeout] = useState(undefined)
  const [
    restart_active_slide_rotation_timeout,
    setRestartActiveSlideRotationTimeout
  ] = useState(undefined)

  // When active or active_slide state changes, determine what to do;
  // - If the active slide is set, then clear the timers and display the popup modal with the LargeSlide UI
  // - Otherwise, set the active slide rotation timer
  useEffect(() => {
    if (active.index > 0 && active.slide !== undefined) {
      setTimers(undefined, undefined)
      props.setModalVisibility(true)
      // give reference to the rotation function so that when the back button is tapped
      // or the slide is automatically hidden, it can initiate the rotation to resume
      props.setModalRootComponent(
        <LargeSlide
          slide={active.slide}
          rotateActiveSlides={rotateActiveSlides}
          {...props}
        />
      )
    } else {
      // Start the slide rotation if it isn't already running and if the user
      // hadn't tapped a slide to make it active. Otherwise, if a user had tapped
      // a slide to make it active, then clear all of the rotation timers
      // and set a long delay to restart the rotation. If a user hadn't interacted with the
      // UI for many seconds, then restart the automatic rotation.
      if (!rotate_slide_timeout && !active.slide) {
        rotateActiveSlides()
      } else if (active.slide) {
        setTimers(
          undefined,
          setTimeout(() => {
            rotateActiveSlides()
          }, 45000)
        )
      }
    }
    // When the Kiosk component is unmounted, clear out all of the timers beforehand
    return () => {
      clearInterval(restart_kiosk_timeout)
      clearTimeout(restart_active_slide_rotation_timeout)
      clearInterval(rotate_slide_timeout)
    }
  }, [active])

  // One time, when the Kiosk UI is first mounted, fetch some data and filter the slides.
  // The behavior happens because the trailing empty array `useEffect(fn, [])` causes React
  // hooks to only first this function on component mount.
  useEffect(() => {
    const interval_id = setInterval(() => {
      props.fetchRestartKiosk(props.url)
    }, 1 * 60 * 1000)
    setRestartKioskTimeout(interval_id)
    const slide_ids = props.slides.map(s => s.collection.primary_slide.id)
    setPrimarySlides(
      props.slides.filter(e => slide_ids.findIndex(a => a === e.id) > -1)
    )
    setActive({ index: 1, slide: undefined })
  }, [])

  // Randomly select one of the primary slides and set it as active every 30 seconds
  // causing the "coverflow" UI to change which slide is in the foreground
  const rotateActiveSlides = () => {
    setTimers(undefined, undefined)
    const interval_id = setInterval(() => {
      const random_slide = Math.floor(Math.random() * primary_slides.length)
      setActive({ index: random_slide, slide: undefined })
    }, 30000)
    setRotateSlideTimeout(interval_id)
  }

  // When a slide is clicked, set local state active and active_slide to change
  // and the side effect function to operate. On the first click, this causes
  // the slide to scroll to the foreground. On the second click, if the slide is
  // currently active (in the foreground) then the LargeSlide UI modal will be displayed
  const slideClicked = (_e, slide, index, props) => {
    trackClicked(
      props.google_analytics,
      `${props.kiosk_name}:${props.kiosk_id}:DonorCoverflowKiosk:SlideClicked`
    )
    setTimers(undefined, undefined)
    if (active.index == index) {
      setActive({ index: index, slide: slide })
    } else {
      setActive({ index: index, slide: undefined })
    }
  }

  const setTimers = (slide_timeout, restart_active_timeout) => {
    clearTimeout(restart_active_slide_rotation_timeout)
    clearInterval(rotate_slide_timeout)
    setRotateSlideTimeout(slide_timeout)
    setRestartActiveSlideRotationTimeout(restart_active_timeout)
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
          active={active.index}
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
