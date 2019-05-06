import React from 'react';

import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';

import './AddForm.css'

class AddForm extends React.Component {
  render() {
    let alert = <ToastsContainer
                position={ToastsContainerPosition.TOP_CENTER}
                store={ToastsStore}/>
    return (
      <div className='Form'>
        <p>Add</p>
      <form onSubmit={this.props.handleSubmit}>

        <div>
          <input name="name" value={this.props.name}
            placeholder="name"
            onChange={this.props.handleChange} />
            <div style={{ fontSize: 12, color: "red" }}>
              {this.props.errorName}
            </div>
        </div>

        <div>
          <input name="release" value={this.props.release}
            placeholder="release"
            onChange={this.props.handleChange} />
          <div style={{ fontSize: 12, color: "red" }}>
            {this.props.errorReleaseFormat}
            {this.props.errorRelease}
          </div>
        </div>

        <div>
          <input name="format" value={this.props.format}
            placeholder="format"
            onChange={this.props.handleChange} />
            <div style={{ fontSize: 12, color: "red" }}>
              {this.props.errorFormat}
            </div>
        </div>

        <div>
          <input name="starting" value={this.props.starting}
            placeholder="starting"
            onChange={this.props.handleChange} />
          <div style={{ fontSize: 12, color: "red" }}>
            {this.props.errorStarting}
          </div>
        </div>
        <button type="submit"
          >submit</button>
        {alert}

      </form>

    </div>
    )
  }
}
export default AddForm;
