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

  buildGrid(filter_status) {
      let slides = this.props.slides;
      let rows = slides.reduce((row, curr, i) => {
          let size = 3;
          if ( !(i % size)  ) {
              row.push(slides.slice(i, i + size));
          }
          return row;
      }, []);
      return rows;
  }

  componentDidUpdate() {

  }

  setTitle(e) {
    trackClicked(this.props.google_analytics, `MediaKiosk:FilterSlides:${e.target.dataset.slidetype}`);
    this.props.setTitle(e.target.dataset.slidetype);
  }

  renderRow(slide, i, j) {
      return (
          <MediaCell key={`cell.${i}.${j}`} slide={slide} {...this.props}/>
      )
  }

  render() {
    let title = this.props.title;
    return (
      <div className="container-fluid">
          <div className="row media-grid-container ">
              {this.buildGrid().map((row, i) => {
                  return (
                      <div key={`row.${i}`} className="row">
                          {row.map((slide, j) => {
                              return (this.renderRow(slide, i, j))
                          })}
                      </div>
                  )
              })}
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
  setTitle: PropTypes.func.isRequired,
  is_modal_visible: PropTypes.bool.isRequired,
};

export default MediaGrid;
