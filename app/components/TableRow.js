var React = require('react');

class TableRow extends React.Component {
  //TODO: Fix this section
  render() {
    const tableHead = this.props.selectedActs.map((actorObj, index) =>
      (<th  key={index}>
        <div className="name-header">{actorObj.name}</div>
        <button onClick={() => this.props.removeActor(actorObj)}>Remove</button>
       </th>
      ));
    return (<tr>{tableHead}</tr>);
  }
}

module.exports = TableRow;
