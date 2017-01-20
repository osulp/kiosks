import React, {Component, PropTypes} from 'react';
import SlideCell from './SlideCell';
import LargeSlide from './LargeSlide';
import {trackClicked} from '../shared/GoogleAnalytics';

class SlideGrid extends Component {

  constructor(props) {
    super(props);
    this.random_timer = undefined;
  }

  setRandomTimer() {
    const randomTimer = () => {
      this.props.setTitle("");
      let filtered_slides = this.filteredSlides();
      let randomNumber = Math.floor((Math.random() * 1000000) % Object.keys(filtered_slides).length);
      this.props.setModalRootComponent(<LargeSlide slide={filtered_slides[randomNumber]}
                                                   setModalRootComponent={this.props.setModalRootComponent}
                                                   setModalVisibility={this.props.setModalVisibility} />);
      this.props.setModalVisibility(true);
    };
    this.random_timer = setTimeout(randomTimer, 15000);
  }

  componentDidMount() {
    this.setRandomTimer();
  }

  filteredSlides(filter_status) {
    if(this.props.title == ""){
      return this.props.slides;
    } else {
      return this.props.slides.filter((slide) => slide.slide_type == this.props.title);
    }
  }

  componentDidUpdate() {
    if(this.props.is_modal_visible === true) {
      clearTimeout(this.random_timer);
    } else {
      this.setRandomTimer();
    }
  }

  setTitle(e) {
    trackClicked(this.props.google_analytics, `DonorKiosk:FilterSlides:${e.target.dataset.slidetype}`);
    clearTimeout(this.random_timer);
    this.props.setTitle(e.target.dataset.slidetype);
  }

  render() {
    let title = this.props.title;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4 donor-title text-center">
            {title}
          </div>
          <div className="col-md-4"></div>
        </div>
        <div className="row donor-grid-container ">
          <div className="scrollable">
            {this.filteredSlides().map((slide, i) => {
              return (
                <SlideCell key={`cell.${i}`} slide={slide} {...this.props}/>
              )
            })}
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 center-block">
            <button type="button" className="btn btn-warning center-block" data-slidetype="Our Supporters" onClick={this.setTitle.bind(this)}>
              Our Supporters
            </button>
          </div>
          <div className="col-md-4 center-block">
            <button type="button" className="btn btn-warning center-block" data-slidetype="Donor Impact" onClick={this.setTitle.bind(this)}>
              Donor Impact
            </button>
          </div>
          <div className="col-md-4 center-block">
            <button type="button" className="btn btn-warning center-block" data-slidetype="Ways to Give" onClick={this.setTitle.bind(this)}>
              Ways to Give
            </button>
          </div>
        </div>
      </div>
    );
  }
}

SlideGrid.propTypes = {
  slides: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  google_analytics: PropTypes.object.isRequired,
  setModalVisibility: PropTypes.func.isRequired,
  setModalRootComponent: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  is_modal_visible: PropTypes.bool.isRequired,
};

export default SlideGrid;
