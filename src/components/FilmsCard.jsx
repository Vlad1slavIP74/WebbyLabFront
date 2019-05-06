import React from 'react';
import axios, { post } from 'axios';
import {ToastsStore} from 'react-toasts';

import filmValidator from './validators/filmValidator.js'
import DisplayAll from './DisplayAll';
import SearchByName from './SearchByName';
import SearchByActors from './SearchByActors';

import AddForm from './AddForm.jsx'
import Uploader from './Uploader.jsx'

import './FilmsCard.css'

const toTitleCase = (phrase) => {
  return phrase
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};



class FilmsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      films: [],
      name: '',
      release: '',
      format: '',
      starting: '',
      fileStatus: '',

      errorName: '',
      errorFormat: '',
      errorReleaseFormat: '',
      errorRelease: '',
      errorStarting: '',
      isOpened: false
    }

  }



  componentDidUpdate(previousProps, previousState) {
    if(previousState.fileStatus !== this.state.fileStatus) {
      axios
      .get('http://localhost:3001/desc')
      .then(response => {
        console.log(response);
        this.setState(prevState => ({
          films: response.data,
          fileStatus: ''
        }))
      })

    }
  }

 componentDidMount() {
   axios
   .get('http://localhost:3001/desc')
   .then(response => {
     this.setState(prevState => ({
       films: response.data
     }))
   })
 }



  Sort() {
    axios
    .get('http://localhost:3001/asc')
    .then(response => {
      this.setState(prevState => ({
        films: response.data
      }))
    })

  }



  Delete(index, id) {
    axios
    .delete('http://localhost:3001/delete/' + id)
    .then(() => {
      const films = Object.assign([], this.state.films);
      films.splice(index, 1)
      this.setState(prevState => ({films: films}))
    })
  }

  fileUpload(file){
    const url = 'http://localhost:3001/upload';
    const formData = new FormData();
    formData.append('sampleFile',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return post(url, formData,config).then((response) =>{
      this.setState(prevState => ({
        fileStatus: response.data.msg
      }))
      return response
    })
  }

  validate = () => {
    const {errors, isValid}
    = filmValidator(this.state.name, this.state.release, this.state.format,
    this.state.starting)


    this.setState(prevState => ({
      errorName: errors.name,
      errorFormat: errors.format,
      errorReleaseFormat: errors.releaseFormat,
      errorRelease: errors.release,
      errorStarting: errors.starting
    }))
    return isValid;
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
     });

   }

   handleSubmit(event) {
    event.preventDefault();
     if(this.validate()) {
       axios.post('http://localhost:3001/add', {
           name: this.state.name,
           release: this.state.release,
           format: this.state.format,
           starting: this.state.starting
         })
         .then(response => {
           console.log(response.data);
           ToastsStore.success(response.data.msg)

           const newfilm = [{
             starting: this.state.starting,
             _id: response.data._id,
             name: toTitleCase(this.state.name),
             release: this.state.release,
             format: this.state.format,
           }]
            const films = Object.assign([], this.state.films, newfilm);
            this.setState(prevState => ({films: films,
              name: '',
              release: '',
              format: '',
              starting: '',
              fileStatus: '',
              errorName: '',
              errorFormat: '',
              errorReleaseFormat: '',
              errorRelease: '',
              errorStarting: ''

            }))
         })
     }
 }


  render() {
    // console.log(this.state.file);
    return (
      <div>

          <div className='form_container'>
              <div  className='Search'>
                <div><SearchByName/></div>

                <div><SearchByActors/></div>
              </div>
           <AddForm
             handleChange = {this.handleChange.bind(this)}
             handleSubmit = {this.handleSubmit.bind(this)}
             validate = {this.validate.bind(this)}
             {...this.state}
             />
          </div>
         <div className="WordFilms">
           <h2>Films</h2>
            <Uploader  fileUpload = {this.fileUpload.bind(this)}/>
           <div onClick={() => this.Sort()}>Sort by asc</div>
         </div>

         <div>
            {this.state.films
            .map((film, index) =>
              <div key = {film._id}>
              <DisplayAll
                {...film}
                Delete = {this.Delete.bind(this, index, film._id)}

                />
               </div>
            )}
          </div>

       </div>
    )
  }

}

export default FilmsCard;
