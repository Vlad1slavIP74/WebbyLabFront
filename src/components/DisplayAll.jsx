import React from 'react';

import './DisplayAll.css'

class DisplayAll extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isOpened: false}
  }
  toggleState() {
    this.setState(prevState => ({isOpened: !prevState.isOpened}));
  }

  render() {
    return (
      <div key={this.props._id} className='DisplayAll'>
          <hr />
          <p><b>Name:</b> {this.props.name}</p>
          <p><b>Release:</b> {this.props.release}</p>
          <p><b>Format:</b> {this.props.format}</p>
          <button onClick={() => this.toggleState()}>Show more info</button>
          <button onClick={this.props.Delete}>Delete</button>
        <div>
          {this.state.isOpened && this.props.starting.join(', ')}
        </div>
    </div>
    )
  }
}


export default DisplayAll;
