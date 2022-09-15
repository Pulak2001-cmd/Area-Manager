import React, { Component } from 'react'
import Navbar from './Navbar';
// import './HomePage.css';
import Orders from './Orders';
import Profile from './Profile';

export class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  async componentDidMount() {
    console.log(this.props.navigate);
  }
  render() {
    return (
      <div>
        <Navbar navigate={this.props.navigate}/>
        <Orders navigate={this.props.navigate}/>
      </div>
    )
  }
}

export default HomePage