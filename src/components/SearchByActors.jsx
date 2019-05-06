import React from 'react';
import axios from 'axios'

import './SearchByActors.css'

class SearchByActor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      film: [],
      name: '',
      empty: false
      }
  }
  Hide() {
    this.setState(prevState => ({empty: false, name: '', film: []}));
  }
handleChange(event) {
  this.setState({[event.target.name]: event.target.value})
}

handleSubmit(event) {
  //console.log(this.state.name);
  event.preventDefault()
  axios
  .get('http://localhost:3001/actor/' + this.state.name )
  .then(response => {
    //console.log(response);
    if (response.data.length === 0) {
      this.setState({
        empty: true
      })
    }
    else {
     this.setState(prevState => ({film: response.data, empty: false}));
    }
  })

}

render() {
  let plot;
  if (!this.state.empty) {
    plot =   <div>
        <button onClick={this.Hide.bind(this)}>Hide</button>
        <div className="myBox">
        {this.state.film
          .map(item => (
            <div key={item.id}>
              <hr/>
              <p><b>Name: </b> {item.name}</p>
              <p><b>Release: </b> {item.release}</p>
              <p><b>Format: </b> {item.format}</p>


            </div>
        ))}
        </div>
      </div>
  }
  else {
    plot = <div>No film</div>
  }
  return(
    <div className='SearchByActorForm'>
        <p>Search films by actors name</p>
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div>
          <input name="name" value={this.state.name}
            placeholder="name"
            onChange={this.handleChange.bind(this)} />
        </div>
        <button type='submit'>Search</button>
      </form>
      {plot}
    </div>
  )
}

}

export default SearchByActor;
