var React = require('react');

class SearchModal extends React.Component {

  handleClick(actor) {
    // Make asynch api fetch here
    console.log("Adding " + actor.name + " to table.");

    // Send data back to table
    this.props.addActor(actor);
    this.props.onClose();
  }
  render() {
    if(!this.props.show) return null;

    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 300,
      margin: '0 auto',
      padding: 30
    };

    const liStyle = {
      padding: 20
    };

    const actorList = this.props.children.map((actor,key) =>
      <li key={key} style={liStyle} onClick={() => this.handleClick(actor)}>
        {actor.name}
      </li>
      );

    return (
      <div className="backdrop" style={backdropStyle}>
        <div className="modal" style={modalStyle}>
          <ul>
            {actorList}
          </ul>
          <div className="footer">
            <button onClick={this.props.onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = SearchModal;
