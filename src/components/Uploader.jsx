import React from 'react'

class Uploader extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null,
      ans: null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    // this.fileUpload = this.fileUpload.bind(this)
  }

  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    this.props.fileUpload(this.state.file)
    .then((response)=>{
      this.setState({ans: response.data.msg})
      // console.log(response.data);
    })

   }

  onChange(e) {
    this.setState({file:e.target.files[0]})
  }


  render() {
    let status = null;
    if(this.state.ans) {
      status = this.state.ans
    }
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <h1>File Upload</h1>
          <input type="file" onChange={this.onChange} />
          <button type="submit">Upload</button>
        </form>
        {status}
      </div>
   )
  }
}



export default Uploader
