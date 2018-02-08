import React, {Component, PropTypes} from 'react';
import MediaCell from './MediaCell';
import LargeMedia from './LargeMedia';
import {trackClicked} from '../shared/GoogleAnalytics';

class MediaGrid extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentDidUpdate() {
    if(this.props.is_modal_visible === true) {
    }
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
          <div className="scrollable dragscroll">
            {this.props.slides.map((slide, i) => {
              return (
                <MediaCell key={`cell.${i}`} slide={slide} {...this.props}/>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}

MediaGrid.propTypes = {
  slides: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  google_analytics: PropTypes.object.isRequired,
  setModalVisibility: PropTypes.func.isRequired,
  setModalRootComponent: PropTypes.func.isRequired,
  is_modal_visible: PropTypes.bool.isRequired,
};

export default MediaGrid;
