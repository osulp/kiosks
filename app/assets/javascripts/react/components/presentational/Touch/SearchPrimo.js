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
    this.state = {
      uri: 'http://alliance-primo-sb.hosted.exlibrisgroup.com/primo-explore/search?sortby=rank&vid=OSU_KIOSK&lang=en_US',
      search_delay: 1000,
      search_querystring: 'query=any,contains,[TERM]&tab=default_tab&search_scope=osu_print',
      search_timer: null,
      search_uri: 'http://alliance-primo-sb.hosted.exlibrisgroup.com/primo-explore/search?sortby=rank&vid=OSU_KIOSK&lang=en_US'
    }
  }

  componentDidMount() {
    $('#primo_search').keyboard({
      autoAccept: true,
      layout: 'custom',
      customLayout: {
        'normal': [
          '1 2 3 4 5 6 7 8 9 0 - = {bksp}',
          'q w e r t y u i o p',
          'a s d f g h j k l ; \'',
          'z x c v b n m , .',
          '{accept} {space} {cancel}'
        ],
      },
      accepted: function(e, k, el) {
        el.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
    $('#primo_search_icon').on('click', function(e) {
      document.getElementById('primo_search').dispatchEvent(new Event('input', { bubbles: true }));
    });
  }

  searchUri(term) {
    if(term !== '') {
      return this.state.uri + '&' + this.state.search_querystring.replace('[TERM]', term);
    } else {
      return this.state.uri;
    }
  }

  performSearch(e) {
    if(this.state.search_timer === null) {
      let self = this;
      let term = e.target.value;
      let search_uri = this.searchUri(term);
      let timer = setTimeout(function() {
        self.setState({ search_uri: search_uri, search_timer: null });
      }, this.state.search_delay);
      this.setState({search_timer: timer});
    } else {
      clearTimeout(this.state.search_timer);
      this.setState({search_timer: null});
    }
  }

  /**
   * Includes Bootstrap elements for mobile and regular displays using hidden-*  and col-* semantics
   * @returns {JSX} - the rendered UI
   */
  render() {
    return (
      <div id="search-primo" className="panel panel-default">
        <div className="container-fluid search-primo-table-container">
          <div className="row search-bar">
            <div className='col-sm-6 col-sm-offset-3'>
              <input className='form-control' type='text' id='primo_search' onChange={this.performSearch.bind(this)} placeholder='Search Valley Library resources' />
              <i id='primo_search_icon' className='material-icons'>search</i>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 search-iframe">
                <Iframe src={this.state.search_uri} height={(window.innerHeight-50).toString() + 'px'} width="100%" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SearchPrimo.propTypes = {
  api: PropTypes.object.isRequired,
  google_analytics: PropTypes.func,
};

export default SearchPrimo;
