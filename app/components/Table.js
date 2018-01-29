var React = require('react');
var ReactDOM = require('react-dom');
var TableRow = require('./TableRow');

// Table needs to reference the matching algo.
class Table extends React.Component {
  constructor() {
    super();
    this.state = {
      matchedFilms: [],
    };
  }

  findMatches() {
    let firstFilmo = this.props.actors[0].filmo.cast;
    let actorList = this.props.actors;
    let matchFilms = [];
    //Find films that are contained in each actor's filmographies
    for(var film = 0; film < firstFilmo.length; film++)
    {
      let filmObj = {};
        for(var j = 1; j < actorList.length; j++)
        {

            var allHave = false;

            for(var compFilm = 0; compFilm < actorList[j].filmo.cast.length; compFilm++)
            {
                if(firstFilmo[film].title === actorList[j].filmo.cast[compFilm].title &&
                firstFilmo[film].release_date === actorList[j].filmo.cast[compFilm].release_date)//Match?
                {
                  filmObj[this.props.actors[0].name] = firstFilmo[film].character;
                  filmObj[actorList[j].name] = actorList[j].filmo.cast[compFilm].character;
                  allHave = true;
                  break;
                }
            }
            //Check if the reference film was found in current actor's filmography
            if(allHave)
            {
                //Found reference film in current filmography, continue to next actor
                continue;
            }
            else
            {
                //Break search loop because at least one actor was not in the reference film
                break;
            }
        }
        if(allHave)
        {
            //Add to match array
            matchFilms.push({
              title: firstFilmo[film].title,
              year: firstFilmo[film].release_date,
              img_url: firstFilmo[film].poster_path,
              cast: filmObj
            });
        }
    }
    console.log(matchFilms);
    return matchFilms;
  }

  render() {
    console.log("Rendering table.");

    // All actors need to be in table head
    const tableHead = this.props.actors.map((actorObj, index) =>
      (
        <th key={index}>
          <div className="name-header">{actorObj.name}</div>
          <button onClick={() => this.props.removeActor(actorObj)}>Remove</button>
        </th>
      ));

    if(this.props.actors.length === 0) {
      return(
        <b>Please search and select an actor</b>
      );
    }
    else if(this.props.actors.length === 1) {
      return(<b>{this.props.actors[0].name} chosen, please select at least one more, brah.</b>);
    }
    else {
      const matchRows = this.findMatches().map((filmObj, index) => (
        <tr key={index}>
          <td>
            {filmObj.title}
            <br/>
            {filmObj.year}
          </td>
          {this.props.actors.map((actor, actIndex) => <td key={actIndex}>{filmObj.cast[actor.name]}</td>)}
        </tr>
      ));
      return(
        <table>
          <tbody>
          <tr>
            <th>Movie</th>
            {tableHead}
          </tr>
            {matchRows}
          </tbody>
        </table>
      );
    }
  }
}

module.exports = Table;
