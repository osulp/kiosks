import React, {Component, PropTypes} from 'react';
import SlideCell from './SlideCell';

class SlideGrid extends Component {

  setTitle(e) {
    this.props.setTitle(e.target.dataset.slidetype);
  }

  render() {
    let slides = this.props.slides;
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
            {slides.filter((slide) => slide.slide_type == title).map((slide, i) => {
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
  setModalVisibility: PropTypes.func.isRequired,
  setModalRootComponent: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
};

export default SlideGrid;
