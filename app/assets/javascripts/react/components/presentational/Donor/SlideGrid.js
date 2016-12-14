import React, {Component, PropTypes} from 'react';

class SlideGrid extends Component {
  render() {
    let slides = this.props.slides;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4 donor-title text-center">
            Title
          </div>
          <div className="col-md-4"></div>
        </div>
        <div className="row donor-grid-container ">
          <div className="scrollable">
            {slides.map((slide, i) => {
              return (
                <div key={`col.${i}`} className="col-md-2 donor-cell-small">
                  <div key={`panel.${i}`} className="panel panel-default">
                    <div key={`body.${i}`} className="panel-body">
                      <img src="https://placekitten.com/200/200"/>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 center-block">
            <button type="button" className="btn btn-warning center-block">Our Supporters</button>
          </div>
          <div className="col-md-4 center-block">
            <button type="button" className="btn btn-warning center-block">Donor Impact</button>
          </div>
          <div className="col-md-4 center-block">
            <button type="button" className="btn btn-warning center-block">Ways to Give</button>
          </div>
        </div>
      </div>
    );
  }
}

export default SlideGrid;
