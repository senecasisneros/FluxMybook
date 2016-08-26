import React, { Component } from 'react';
import { Modal, Button, FormControl, ControlLabel } from 'react-bootstrap'
import  UserActions  from '../actions/UserActions'
import ProfilePage from './ProfilePage'


export default class ProfileForm extends Component {
  constructor(props){
    super(props);
    let { username, aboutMe, image, links } = this.props.profile
    this.state = {
      username: username,
      links: links,
      aboutMe: aboutMe,
      image: image
    }
    this._onInputChange = this._onInputChange.bind(this);
    this._submit = this._submit.bind(this);
  }
  _onInputChange(event){
    let key = event.target.dataset.statekey;
    let value = event.target.value
    this.setState({[key]: value})
  }
  _submit(event){
    event.preventDefault()
    let profile = this.state
    UserActions.editProfile(profile)
    this.props.closeModal()
  }
  render(){
    return(
      <Modal bsSize="sm" show={this.props.showModal} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-group" onSubmit={this._addProfile}>
          <label>Username:</label>
          <FormControl onChange={this._onInputChange} value={this.state.username} type="text" placeholder="Username" data-statekey='username' required/>
          <label>Links:</label>
          <FormControl onChange={this._onInputChange} value={this.state.links} type="text" placeholder="Links" data-statekey='links'/>
          <label>Image:</label>
          <FormControl onChange={this._onInputChange} value={this.state.image} type="text" placeholder="Image URL" data-statekey='image' />
          <img src={this.state.image} className="img-responsive center-block"/>
          <label>About Me:</label>
          <FormControl onChange={this._onInputChange} value={this.state.aboutMe} type="text" placeholder="About You" data-statekey='aboutMe' required componentClass='textarea'/>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.closeModal}>Close</Button>
          <Button className="btn btn-success" onClick={this._submit}>Submit</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
