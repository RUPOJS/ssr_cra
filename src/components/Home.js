import React from 'react';
import { connect } from 'react-redux';
import { setData } from '../store/appReducer';
import Header from './Header';
import Products from './Products';
import logo from '../logo.svg';
import '../App.css';

class Home extends React.Component {
  componentDidMount = () => {
      if(!this.props.message) {
        console.log('Update data on client here if required');
          // this.props.updateData("Hi, I'm from client!");
      }
  }
  render() {
      return (
          <div className="App">
            <Header cartItems={this.props.cartItems}/>
            <Products/>
          </div>
      );
  }
}
export default connect(
  ({ app }) => ({
      data: app.data,
      cartItems: app.cartItems
  }),
  dispatch => ({
      updateData: (data) => dispatch(setData(data)),
  })
)(Home);
