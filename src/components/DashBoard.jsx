import React, { Component } from 'react'
import './signin.css';
import axios from 'axios';

export class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: '',
            password: ''
        }
    }
    submit = async() => {
        if(this.state.user_id === ''){
            alert("Please Enter Valid User ID")
        } else {
            const body = {
                user_id: this.state.user_id,
                password: this.state.password
            }
            console.log(body)
            const response = await axios.post('https://putatoetest-k3snqinenq-uc.a.run.app/v1/api/manager_login', body);
            if (response.status !== 200){
                alert(`Server Error - ${response.status}`)
            } else {
                const res = response.data;
                if(res.status === false){
                    alert(res.error)
                } else {
                    localStorage.setItem('authtoken', res.token);
                    this.props.history.push('/home')
                }
            }
        }
    }
  render() {
    return (
      <div className="text-center">
        <main className="form-signin">
        <form>
        <img className="mb-4" src="https://putatoe.com/img/logo.png" alt="" width="72" height="72" />
        <h1 className="h3 mb-3 fw-normal">Area Manager Portal</h1>

        <div className="form-floating">
        <input type="number" className="form-control" id="floatingInput" placeholder="name@example.com" value={this.state.user_id} onChange={(e)=> this.setState({user_id: parseInt(e.target.value)})}/>
        <label for="floatingInput">User ID</label>
        </div>
        <div className="form-floating">
        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={this.state.password} onChange={(e)=> this.setState({password: e.target.value})}/>
        <label for="floatingPassword">Password</label>
        </div>

        <div className="checkbox mb-3">
        <label>
            <input type="checkbox" value="remember-me" /> Remember me
        </label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="button" onClick={this.submit}>Sign in</button>
    </form>
    </main>
      </div>
    )
  }
}

export default DashBoard