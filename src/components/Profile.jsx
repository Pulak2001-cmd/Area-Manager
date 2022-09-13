import React, { Component } from 'react'
import Navbar from './Navbar'
import axios from 'axios';

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      f_name: '',
      l_name: '',
      username: '',
      info: {},
      disabled: false,
      token: ''
    }
  }
  async componentDidMount() {
    const token = localStorage.getItem('authtoken');
    var header = {
      authtoken: token
    }
    const response = await axios.get('https://putatoetest-k3snqinenq-uc.a.run.app/v1/api/manager_profile', {headers: header});
    var name = response.data.name;
    name = name.split(' ');
    this.setState({info: response.data, f_name: name[0], l_name: name[1], username: response.data.username, token: token});
  }
  submit = async ()=> {
    const name = this.state.f_name+" "+this.state.l_name;
    const body = {
      name: name,
      username: this.state.username
    };
    console.log(body);
    var headers = {
      authtoken: this.state.token
    };
    const response = await axios.post('https://putatoetest-k3snqinenq-uc.a.run.app/v1/api/UpdateProfile_Manager', body, { headers:  headers});
    console.log(response.status);
  }
  render() {
    return (
      <>
      <Navbar />
      <div style={{display: 'flex', flexDirection: 'row'}}>
      <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{display: 'flex', flexDirection: 'row', marginTop: 8}}>
        <div>
          <p>First Name</p>
          <input type="text" value={this.state.f_name} style={{margin: 5, borderRadius: 8, padding: 5}} onChange={(e)=> this.setState({f_name: e.target.value, disabled: true})}/>
        </div>
        <div>
          <p>Last Name</p>
          <input type="text" value={this.state.l_name} style={{margin: 5, borderRadius: 8, padding: 5}} onChange={(e)=> this.setState({l_name: e.target.value, disabled: true})}/>
        </div>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', marginTop: 8}}>
        <div>
          <p>State</p>
          <input type="text" value={this.state.info.state} style={{margin: 5, borderRadius: 8, padding: 5}}/>
        </div>
        <div>
          <p>District</p>
          <input type="text" value={this.state.info.district} style={{margin: 5, borderRadius: 8, padding: 5}}/>
        </div>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', marginTop: 8}}>
        <div>
          <p>User ID</p>
          <input type="text" value={this.state.info.id} style={{margin: 5, borderRadius: 8, padding: 5}} />
        </div>
        <div>
          <p>Username</p>
          <input type="text" value={this.state.username} style={{margin: 5, borderRadius: 8, padding: 5}} onChange={(e)=> this.setState({username: e.target.value, disabled: true})}/>
        </div>
      </div>
      <div style={{alignItems: 'center'}}>
      <button class="btn btn-primary" style={{margin: 10, width: 120}} onClick={this.submit} disabled={!this.state.disabled}>
        Save
      </button>
      </div>
      </div>
      <img src="https://putatoeapp.web.app/img/account/profile.png" height={400} width={400} />
      </div>
      </>
    )
  }
}

export default Profile