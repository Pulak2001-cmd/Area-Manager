import React, { Component } from 'react';
import axios from 'axios';

export class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: false,
      change: false,
      providers: [],
      index: -1,
    }
  }
  finalcancel = async (id) => {
    const token = localStorage.getItem('authtoken');
    var header = {
      authtoken: token,
    }
    const data = {
      booking_id: id,
    }
    const response = await axios.post('https://putatoetest-k3snqinenq-uc.a.run.app/v1/api/final_Cancel_order', data, { headers: header});
    console.log(response.status);
  }
  viewAddress = (address)=> {
    localStorage.setItem('address', JSON.stringify(address));
    this.props.navigate('/map', {address: address});
  }
  showItem = async(product_id, sub_service_id, index)=> {
    console.log('showItem');
    const token = localStorage.getItem('authtoken');
    console.log(token);
    var header = {
        authtoken: token,
    }
    const body = {
      product_id: product_id,
      sub_service_id: sub_service_id
    }
    const response = await axios.post('https://putatoetest-k3snqinenq-uc.a.run.app/v1/api/ServiceProviderListForProduct', body, {headers: header});
    this.setState({providers: response.data.lists, index: index});
  }
  choose = async (id)=> {
    const booking_id = this.props.order.id;
    const data = {
      booking_id: booking_id,
      serviceprovider_id: id,
    }
    const token = localStorage.getItem('authtoken');
    var header = {
      authtoken: token,
    }
    const response = await axios.post('https://putatoetest-k3snqinenq-uc.a.run.app/v1/api/Assign_ServiceProvider', data, {headers: header});
    console.log(response.data);
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
          <a class="card-link" onClick={()=> this.setState({item: !this.state.item})} style={{cursor: 'pointer'}}>View Items</a>
          <a href="#" class="card-link" onClick={()=> this.viewAddress(this.props.order.address)}>View Address</a>
          {/* {this.props.status && <a href="#" class="card-link" onClick={()=> {this.setState({change: true})}}>Change Status</a>} */}
          {/* {this.state.change &&
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 15}}>
              {this.props.confirm &&<div onClick={()=> this.confirmOrder(this.props.order.id)} style={{backgroundColor: '#51b0aa', borderRadius: 8, color: '#FFF', cursor: 'pointer', margin: 5, padding: 6}}>Confirm Order</div>}
              {this.props.complete &&<div onClick={()=> this.completeOrder(this.props.order.id)} style={{backgroundColor: '#51b0aa', borderRadius: 8, color: '#FFF', cursor: 'pointer', margin: 5, padding: 6}}>Complete Order</div>}
              {this.props.cancel &&<div onClick={()=> this.cancelOrder(this.props.order.id)} style={{backgroundColor: '#51b0aa', borderRadius: 8, color: '#FFF', cursor: 'pointer', margin: 5, padding: 6}}>Cancel Order</div>}
            </div>
          } */}
          {this.props.type === 'Allted_to_ServiceProvider' && 
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <p>
              Alloted to:
              </p>    
                <div style={{border: '1px solid #51b0aa', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', margin: 7, padding: 5, width: 250}}>
                  <strong>{this.props.order.serviceprovider.name}</strong>
                  <img src={this.props.order.serviceprovider.image} height={100} width={100} />
                </div>
            </div>
          }
          {this.props.type === 'cancelled' && 
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 15}}>
            <div onClick={()=> this.finalcancel(this.props.order.id)} style={{backgroundColor: '#51b0aa', borderRadius: 8, color: '#FFF', cursor: 'pointer', margin: 5, padding: 6, width: 200}}>Final cancel Order</div>
          </div>
          }
          {this.state.item && this.props.order.items.map((i, index)=> {
            return <div key={index} style={{border: '1px solid skyblue', padding: 5, borderRadius: 8, margin: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
              <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <div>
              <li style={{listStyleType: 'None'}}>Brand: {i.brand}</li>
              <li style={{listStyleType: 'None'}}>Name: {i.name}</li>
              <li style={{listStyleType: 'None'}}>Pieces: {i.pcs}</li>
              <li style={{listStyleType: 'None'}}>Price: {i.price}</li>
              <li style={{listStyleType: 'None'}}>Quantity: {i.qty}</li>
              </div>
              <img src={i.image} height={100} width={100} style={{marginLeft: 50}}/>
              </div>
              {this.props.type === 'pending' &&
              <div style={{alignItems: 'center', justifyContent: 'center', display: 'flex', cursor: 'pointer', margin: 4}} onClick={()=> this.showItem(i.product_id, i.sub_service_id, index)}>
              <p style={{listStyleType: 'None', backgroundColor: '#28a4de', borderRadius: 8, color:'#FFF', width: 200, padding: 4}}>Available ServiceProvider</p>
              </div>}
              {this.props.type === 'cancelled' &&
              <div style={{alignItems: 'center', justifyContent: 'center', display: 'flex', cursor: 'pointer', margin: 4}} onClick={()=> this.showItem(i.product_id, i.sub_service_id, index)}>
              <p style={{listStyleType: 'None', backgroundColor: '#28a4de', borderRadius: 8, color:'#FFF', width: 200, padding: 4}}>Available ServiceProvider</p>
              </div>}
              {this.state.index == index && this.state.providers.map((i, index)=> {
                return <div key={index} style={{padding: 5, border: '1px solid #28a4df', borderRadius: 8, width: 300, margin: 5}}>
                  <h2 style={{color: '#32a852'}}>{i.name}</h2>
                  <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                  <img src={i.image} height={100} width={100} />
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                  <h6>Rating: {i.rating}</h6>
                  <div onClick={()=> this.choose(i.serviceprovider_id)} style={{backgroundColor: '#e32619', color: '#FFF', padding: 5, borderRadius: 6, cursor: 'pointer'}}>Choose</div>
                  </div>
                  </div>
                  <p style={{color: '#28a23f'}}>Phone: {i.phone}</p>
                  <p style={{color: '#28a4ca', cursor: 'pointer'}} onClick={()=> this.viewAddress(i.address)}>View Address</p>
                  </div>
              })}
            </div>
          })}
        </div>
      </div>
    )
  }
}

export default Order