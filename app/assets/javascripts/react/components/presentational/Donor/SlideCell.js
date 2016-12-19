import React, {Component, PropTypes} from 'react';
import LargeSlide from './LargeSlide';

class SlideCell extends Component {

  cellClicked (e) {
    this.props.setModalVisibility(true);
    this.props.setModalRootComponent(<LargeSlide {...this.props} />);
  }

  render() {
    let slide = this.props.slide;
    return (
      <div className="col-md-2 donor-cell-small" onClick={this.cellClicked.bind(this)}>
        <div className="panel panel-default">
          <div className="panel-body">
            <img src={slide.thumbnail}/>
          </div>
        </div>
      </div>
    );
  }
}

SlideCell.propTypes = {
  slide: PropTypes.object.isRequired,
  setModalVisibility: PropTypes.func.isRequired,
  setModalRootComponent: PropTypes.func.isRequired,
};

export default SlideCell;
