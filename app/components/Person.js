var React = require('react');

class Person extends React.Component {
  constructor() {
    super();
    this.state = {
      filmography: {}
    };
  }
  componentDidMount() {
    // API call
    fetch("https://api.themoviedb.org/3/person/" + this.props.id + "/movie_credits?api_key=5c351681cbdda56c0bc2fe0bc9432920")
    .then((response) => response.json())
    .then((responseJson) => {
      // Do something with filmography
      this.setState({
        filmography: responseJson
      });
    });
  }
  render() {
    
  }
}

module.exports = Person;
