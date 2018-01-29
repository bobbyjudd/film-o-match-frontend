var React = require('react');
var Search = require('./Search');
var Table = require('./Table');

//Algorithm to find film matches amongst selected actors
function findMatches(filmographs)
{
    //Array of matched films
    var matchFilms = [];
    var filmography = [];

    //Fill an array of selected actors' filmographies
    for(var actor in selected)
    {
        filmography.push(actor.data.filmography);
    }

    //Find films that are contained in each actor's filmographies
    for(var film in filmography[0])
    {
        for(var j = 1; j < filmography.length; j++)
        {
            var allHave = false;

            for(var compFilm in filmography[j])
            {
                if(film.title === compFilm.title)//Match?
                {
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
            matchFilms.push(film.title);
        }
    }
    return matchFilms;
}

class Page extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedActors: [],
    };
  }

  handleAddActor(actor) {
    console.log("https://api.themoviedb.org/3/person/" + actor.id.toString() + "/movie_credits?api_key=5c351681cbdda56c0bc2fe0bc9432920");
    let filmo = fetch("https://api.themoviedb.org/3/person/" + actor.id.toString() + "/movie_credits?api_key=5c351681cbdda56c0bc2fe0bc9432920")
    .then((response) => response.json())
    .then((responseJson) => {
      actor["filmo"] = responseJson;
      let newSelected = this.state.selectedActors;
      newSelected.push(actor);
      this.setState({
        selectedActors: newSelected,
      });
    });
  }

  handleRemoveActor(actor) {
    //TODO: Fix!
    let actorIndex = this.state.selectedActors.indexOf(actor);
    if(actorIndex != -1) {
      console.log("Removing " + actor);
      const newSelected = this.state.selectedActors;

      newSelected.splice(actorIndex, 1);

      this.setState({
        selectedActors: newSelected,
      });
    }
  }

  render() {
    console.log("Rendering page.");
    return(
      <div>
        <Search addActor={(actorId) => this.handleAddActor(actorId)}/>
        <Table actors={this.state.selectedActors} removeActor={(actorId) => this.handleRemoveActor(actorId)}/>
      </div>
    );
  }
}

module.exports = Page;
