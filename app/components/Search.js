var React = require('react');
var SearchModal = require('./SearchModal');
var QuickSearch = require('./QuickSearch');

const testSearch = [
  {"adult":false,"id":6193,"name":"Leonardo DiCaprio","popularity":6.484074},
  {"adult":false,"id":2524,"name":"Tom Hardy","popularity":10.036953},
  {"adult":false,"id":64,"name":"Gary Oldman","popularity":5.894597},
  {"adult":false,"id":29222,"name":"Zac Efron","popularity":12.982365},
  {"adult":false,"id":3894,"name":"Christian Bale","popularity":9.072889999999999},
  {"adult":false,"id":8293,"name":"Marion Cotillard","popularity":8.417536999999999},
  {"adult":false,"id":62,"name":"Bruce Willis","popularity":8.063549},
  {"adult":false,"id":38673,"name":"Channing Tatum","popularity":6.237314},
  {"adult":false,"id":63,"name":"Milla Jovovich","popularity":6.460174},
  {"adult":false,"id":5064,"name":"Meryl Streep","popularity":5.439406},
  {"adult":false,"id":5081,"name":"Emily Blunt","popularity":7.670205},
  {"adult":false,"id":934,"name":"Russell Crowe","popularity":9.201153}
];

// Change form submission to button to stop page refresh???
class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    }
  }
  getActorList() {
    return testSearch;
  }

  handleClick() {
    //Make async fetch to API here
    //...
    this.setState(() => {
      return {showModal: true};
    });
  }

  handleClose() {
    this.setState(() => {
      return {showModal: false};
    });
  }

  render() {
    return(
      <div id="search-area">
        <form style={{float: "left"}}>
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <input type="button" value="Search" onClick={() => this.handleClick()}/>
          <QuickSearch />
        </form>
        <SearchModal show={this.state.showModal} addActor={(actorId) => this.props.addActor(actorId)} children={this.getActorList()} onClose={() => this.handleClose()}/>
      </div>
    );
  }
}

module.exports = Search;
