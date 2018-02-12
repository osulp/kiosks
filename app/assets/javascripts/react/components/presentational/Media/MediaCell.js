import React, {Component, PropTypes} from 'react';
import LargeMedia from './LargeMedia';
import {trackClicked} from '../shared/GoogleAnalytics';

class MediaCell extends Component {

  cellClicked (e) {
    trackClicked(this.props.google_analytics, 'DonorKiosk:SlideClicked');
    this.props.setModalVisibility(true);
    this.props.setModalRootComponent(<LargeMedia {...this.props} />);
  }

  render() {
    let slide = this.props.slide;
    return (
        <div className="col-md-4 col-sm-4" onClick={this.cellClicked.bind(this)}>
            <div className="thumbnail">
                <img src={slide.xlarge} alt={slide.caption} style={{width: '100%'}}></img>
                    <div className="caption-cell">
                        <h1>{slide.label}</h1>
                        <p>{slide.caption}</p>
                    </div>
            </div>
        </div>
    );
  }
}

MediaCell.propTypes = {
  slide: PropTypes.object.isRequired,
  setModalVisibility: PropTypes.func.isRequired,
  setModalRootComponent: PropTypes.func.isRequired,
};

export default MediaCell;
