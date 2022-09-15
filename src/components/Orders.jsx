import React, { Component } from 'react';
import axios from 'axios';
import Order from './Order';

export class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pending: [],
      ongoing: [],
      completed: [],
      cancelled: [],
      visible: 'pending',
    }
  }
  async componentDidMount() {
    const token = localStorage.getItem('authtoken');
    console.log(token);
    if(token === null) {
      this.props.navigate('/');
    }
    var header = {
      authtoken: token,
    }
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var end_date = yyyy+"-"+mm+"-"+dd+" 23:59:59";
    var days = 15;
    var last = new Date(today.getTime() - (days * 24 * 60 * 60 * 1000));
    var dd1 = String(last.getDate()).padStart(2, '0');
    var mm1 = String(last.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy1 = last.getFullYear();
    var start_date = yyyy1+"-"+mm1+"-"+dd1+" 00:00:00";
    console.log(start_date);
    console.log(end_date);
    const body = {
        start_date: start_date,
        end_date: end_date
    }
    console.log(body)
    const response = await axios.post('https://putatoetest-k3snqinenq-uc.a.run.app/v1/api/orders_manager', body, { headers:  header})
    if (response.status === 400){
      this.props.navigate('/');
    }
    console.log(response.data.pending_orders);
    this.setState({pending: response.data.pending_orders});
    this.setState({ongoing: response.data.ongoing_orders});
    this.setState({completed: response.data.completed_orders});
    this.setState({cancelled: response.data.cancelled_orders});
  }
  reload = async ()=> {
    console.log('reload');
    this.setState({pending: [], ongoing: [], completed: [], canceled: []})
    const token = localStorage.getItem('authtoken');
    console.log(token);
    var header = {
      authtoken: token,
    }
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var end_date = yyyy+"-"+mm+"-"+dd+" 23:59:59";
    var days = 15;
    var last = new Date(today.getTime() - (days * 24 * 60 * 60 * 1000));
    var dd1 = String(last.getDate()).padStart(2, '0');
    var mm1 = String(last.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy1 = last.getFullYear();
    var start_date = yyyy1+"-"+mm1+"-"+dd1+" 00:00:00";
    console.log(start_date);
    console.log(end_date);
    const body = {
        start_date: start_date,
        end_date: end_date
    }
    console.log(body)
    const response = await axios.post('https://putatoetest-k3snqinenq-uc.a.run.app/v1/api/orders_manager', body, { headers:  header})
    console.log(response.data.pending_orders);
    this.setState({pending: response.data.pending_orders});
    this.setState({ongoing: response.data.ongoing_orders});
    this.setState({completed: response.data.completed_orders});
    this.setState({cancelled: response.data.cancelled_orders});
  }
  render() {
    return (
      <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
        <div onClick={this.reload} style={{backgroundColor: 'blue', color: '#FFF', padding: 4, width: 140, borderRadius: 8, margin: 8, cursor: 'pointer'}}>Reload</div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
        <div onClick={()=> this.setState({visible: 'pending'})} style={{backgroundColor: this.state.visible === 'pending' ? '#2d4cb3': null, border: '2px solid #2d4cb3', color: this.state.visible === 'pending'?'#fff': '#2d4cb3', margin: 8, padding: 8, borderRadius: 8, cursor: 'pointer'}}>Pending Orders</div>
        <div onClick={()=> this.setState({visible: 'ongoing'})} style={{backgroundColor: this.state.visible === 'ongoing' ? '#2d4cb3': null, border: '2px solid #2d4cb3', color: this.state.visible === 'ongoing'?'#fff': '#2d4cb3', margin: 8, padding: 8, borderRadius: 8, cursor: 'pointer'}}>Ongoing Orders</div>
        <div onClick={()=> this.setState({visible: 'completed'})} style={{backgroundColor: this.state.visible === 'completed' ? '#2d4cb3': null, border: '2px solid #2d4cb3', color: this.state.visible === 'completed'?'#fff': '#2d4cb3', margin: 8, padding: 8, borderRadius: 8, cursor: 'pointer'}}>completed Orders</div>
        <div onClick={()=> this.setState({visible: 'cancelled'})} style={{backgroundColor: this.state.visible === 'cancelled' ? '#2d4cb3': null, border: '2px solid #2d4cb3', color: this.state.visible === 'cancelled'?'#fff': '#2d4cb3', margin: 8, padding: 8, borderRadius: 8, cursor: 'pointer'}}>Cancelled Orders</div>
        </div>
        {this.state.visible === 'pending' &&
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          {this.state.pending.length === 0 &&
          <img src="https://putatoeapp.web.app/img/cart/noOrders.png" height={400} width={400}/>
          }
          {this.state.pending.map((i, index)=> {
            return <Order type={'pending'} navigate={this.props.navigate} key={index} order={i} status={true} confirm={true} cancel={true} complete={false}/>
          })}
        </div>}
        {this.state.visible === 'ongoing' &&
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          {this.state.ongoing.length === 0 &&
          <img src="https://putatoeapp.web.app/img/cart/noOrders.png" height={400} width={400}/>
          }
          {this.state.ongoing.map((i, index) =>{
            return <Order type={'ongoing'} navigate={this.props.navigate} key={index} order={i} status={true} confirm={false} cancel={true} complete={true}/>
          })}
        </div>}
        {this.state.visible === 'completed' &&
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          {this.state.completed.length === 0 &&
          <img src="https://putatoeapp.web.app/img/cart/noOrders.png" height={400} width={400}/>
          }
         { this.state.completed.map((i, index) =>{
            return <Order type={'completed'} navigate={this.props.navigate} key={index} order={i} status={false} confirm={false} cancel={false} complete={false}/>
          })}
        </div>}
        {this.state.visible === 'cancelled' &&
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          {this.state.cancelled.length === 0 &&
          <img src="https://putatoeapp.web.app/img/cart/noOrders.png" height={400} width={400}/>
          }
         {this.state.cancelled.map((i, index) =>{
            return <Order type={'cancelled'} navigate={this.props.navigate} key={index} order={i} status={false} confirm={false} cancel={false} complete={false}/>
          })}
        </div>}
      </div>
    )
  }
}

export default Orders