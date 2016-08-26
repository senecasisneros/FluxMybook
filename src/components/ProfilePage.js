import React, { Component } from 'react';
import UserStore from '../stores/UserStore'
import UserActions from '../actions/UserActions'
import ProfileForm from './ProfileForm'

export default class ProfilePage extends Component {
  constructor(){
    super();
    this.state = {
      profile: UserActions.getProfile(),
      showModal: false
    }
    this.closeModal = this.closeModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this._onChange = this._onChange.bind(this);
  }
  componentDidMount(){
    UserStore.startListening(this._onChange)
  }
  componentWillUnmount(){
    UserStore.stopListening(this._onChange)
  }
  _onChange(){
    this.setState({profile: UserStore.get()})
  }
  showModal(){
    this.setState({showModal: true})
  }
  closeModal(){
    this.setState({showModal: false})
  }
  render(){
    if(this.state.profile){
      let { username, image, aboutMe, links } = this.state.profile
      return(
        <div className="row well well-small">
        <div className="col-xs-12">
        <img width="250"  height="250"src={image} />
            </div>
        <div className="col-xs-12">
        <p>Username: {username}</p>
        <p>links: {links}</p>
        <p>About Me: {aboutMe}</p>
        <button onClick={this.showModal} className="btn btn-success">Edit Profile</button>
        </div>
        <ProfileForm showModal={this.state.showModal} closeModal={this.closeModal} profile={this.state.profile} />
        </div>
      )
    } else{
      return(
        <h1></h1>
      )
    }
  }
}
