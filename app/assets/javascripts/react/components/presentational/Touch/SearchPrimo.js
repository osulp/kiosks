import React, {Component, PropTypes} from 'react';
import {trackClicked} from '../shared/GoogleAnalytics';

var Iframe = React.createClass({
    render: function() {
        return(
            <div>
                <iframe src={this.props.src} height={this.props.height} width={this.props.width} frameBorder={0} />
            </div>
        )
    }
});

class SearchPrimo extends Component {
  /**
   * Initialize an Search Primo UI 
   * @param props - the properties passed into the component
   */
  constructor(props) {
    super(props);
  }

  /**
   * Includes Bootstrap elements for mobile and regular displays using hidden-*  and col-* semantics
   * @returns {JSX} - the rendered UI
   */
  render() {
    return (
      <div id="search-primo" className="panel panel-default">
        <div className="panel-heading">
          <span className="panel-title">1Search</span>
        </div>
        <div className="container-fluid search-primo-table-container">
          <div className="row">
            <div className="col-sm-12">
                <Iframe src="https://search.library.oregonstate.edu/primo-explore/search?vid=OSU&sortby=rank" height={(window.innerHeight-200).toString() + 'px'} width="100%"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SearchPrimo.propTypes = {
  api: PropTypes.object.isRequired,
  google_analytics: PropTypes.object,
};

export default SearchPrimo;
