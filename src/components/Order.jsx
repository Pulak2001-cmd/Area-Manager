import React, { Component } from 'react';
import axios from 'axios';

export class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: false,
      change: false,
    }
  }
  componentDidMount(){
    console.log(this.props);
    console.log('hi')
  }
  confirmOrder = async(id)=>{
    console.log(id);
    const body = {
        booking_id: id,
    }
    const token = localStorage.getItem('authtoken');
    console.log(token);
    var header = {
        authtoken: token,
    }
    const response = await axios.post('https://putatoetest-k3snqinenq-uc.a.run.app/v1/api/confirmOrder', body, { headers:  header});
    console.log(response.data);
  }
  cancelOrder = async(id)=>{
    console.log(id);
    const body = {
        booking_id: id,
    }
    const token = localStorage.getItem('authtoken');
    console.log(token);
    var header = {
        authtoken: token,
    }
    const response = await axios.post('https://putatoetest-k3snqinenq-uc.a.run.app/v1/api/cancelOrder', body, { headers:  header});
    console.log(response.data);
  }
  completeOrder = async(id)=>{
    console.log(id);
    const body = {
        booking_id: id,
    }
    const token = localStorage.getItem('authtoken');
    console.log(token);
    var header = {
        authtoken: token,
    }
    const response = await axios.post('https://putatoetest-k3snqinenq-uc.a.run.app/v1/api/completeOrder', body, { headers:  header});
    console.log(response.data);
  }
  viewAddress = (address)=> {
    localStorage.setItem('address', JSON.stringify(address));
    this.props.navigate('/map', {address: address});
  }
  render() {
    return (
        <div class="card" style={{width: '38rem', margin: 10}}>
        <div class="card-body">
          <h5 class="card-title">{this.props.order.order_id}</h5>
          <p class="card-text">Amount: {this.props.order.amt}</p>
          <h6 class="card-subtitle mb-2 text-muted">Username: {this.props.order.username}</h6>
          <h6 class="card-subtitle mb-2 text-muted">Mobile: {this.props.order.phone}</h6>
          <p class="card-text">Order Date: {this.props.order.datetime}</p>
          <a href="#" class="card-link" onClick={()=> this.setState({item: !this.state.item})}>View Items</a>
          <a href="#" class="card-link" onClick={()=> this.viewAddress(this.props.order.address)}>View Address</a>
          {this.props.status && <a href="#" class="card-link" onClick={()=> {this.setState({change: true})}}>Change Status</a>}
          {this.state.change &&
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 15}}>
              {this.props.confirm &&<div onClick={()=> this.confirmOrder(this.props.order.id)} style={{backgroundColor: '#51b0aa', borderRadius: 8, color: '#FFF', cursor: 'pointer', margin: 5, padding: 6}}>Confirm Order</div>}
              {this.props.complete &&<div onClick={()=> this.completeOrder(this.props.order.id)} style={{backgroundColor: '#51b0aa', borderRadius: 8, color: '#FFF', cursor: 'pointer', margin: 5, padding: 6}}>Complete Order</div>}
              {this.props.cancel &&<div onClick={()=> this.cancelOrder(this.props.order.id)} style={{backgroundColor: '#51b0aa', borderRadius: 8, color: '#FFF', cursor: 'pointer', margin: 5, padding: 6}}>Cancel Order</div>}
            </div>
          }
          {this.state.item && this.props.order.items.map((i, index)=> {
            return <div style={{border: '1px solid skyblue', padding: 5, borderRadius: 8, margin: 5}}>
              <li style={{listStyleType: 'None'}}>Brand: {i.brand}</li>
              <li style={{listStyleType: 'None'}}>Name: {i.name}</li>
              <li style={{listStyleType: 'None'}}>Pieces: {i.pcs}</li>
              <li style={{listStyleType: 'None'}}>Price: {i.price}</li>
              <li style={{listStyleType: 'None'}}>Quantity: {i.qty}</li>
            </div>
          })}
        </div>
      </div>
    )
  }
}

export default Order