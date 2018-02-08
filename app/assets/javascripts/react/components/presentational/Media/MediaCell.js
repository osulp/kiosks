import React, {Component, PropTypes} from 'react';
import LargeMedia from './LargeMedia';
import {trackClicked} from '../shared/GoogleAnalytics';

class MediaCell extends Component {

  cellClicked (e) {
    trackClicked(this.props.google_analytics, 'OralHistoryKiosk:MediaClicked');
    this.props.setModalVisibility(true);
    this.props.setModalRootComponent(<LargeMedia {...this.props} />);
  }

  render() {
    let slide = this.props.slide;
    return (
      <div className="col-md-2 oral-history-cell-small" onClick={this.cellClicked.bind(this)}>
        <div className="panel panel-default oral-history-panel-small">
          <div className="panel-body oral-history-body-small"
               style={{backgroundImage: `url("${slide.xlarge}")`}}>
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
