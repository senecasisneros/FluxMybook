import React, { Component } from 'react';
import NavbarPage from './NavbarPage'

export default class Layout extends Component {
  render() {
    return (
      <div>
        <NavbarPage/>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    )
  }
}
