import React from 'react';
import axios from 'axios'

import './SearchByName.css'

class SearchByName extends React.Component {
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
  event.preventDefault()
  axios
  .get('http://localhost:3001/film/' + this.state.name )
  .then(response => {
    if (response.data.length === 0) {
      //console.log(response.data);
      this.setState({empty: true})
      }
      else{
          this.setState(prevState => ({film: response.data, empty: false}));
      }

  })

}

render() {
  let plot;
  //console.log(this.state.empty);
  if (!this.state.empty) {
    plot =   <div>
        <button onClick={this.Hide.bind(this)}>Hide</button>
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
  }
  else {
    plot = <div>No film</div>
  }
  return(
    <div className='SearchByNameForm'>
      <p>Search films by name</p>
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

export default SearchByName;
