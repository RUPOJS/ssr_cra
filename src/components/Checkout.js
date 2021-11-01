import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { setData, addToCart, removeFromCart } from "../store/appReducer";
import ProductItem from './ProductItem';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let totalCartValue = 0;
    this.props.cartItems.forEach((item) => {
        totalCartValue += parseInt(item.price)
    })
    return (
      <section className="checkoutContainer" ref={this.rootRef}>
        <h1>Your Cart</h1>
        <div className="checkout-labels">
            <label className="product-image">Image</label>
            <label className="product-details">Product</label>
            <label className="product-price">Price</label>
            <label className="product-line-price">Total</label>
        </div>
        {this.props.cartItems.map((item, index) => {
            return (
                <div className="product">
                    <div className="product-image">
                        <img src={item.searchImage} />
                    </div>
                    <div className="product-details">
                        <div className="product-title">{item.brand + " " + item.category + "(" + item.primaryColour + ")"}</div>
                        <p className="product-description">{item.additionalInfo}</p>
                    </div>
                    <div className="product-price">{"₹" + item.price}</div>
                    <div className="product-line-price">{(index === this.props.cartItems.length - 1) ? ("₹" +totalCartValue) : ''}</div>
                </div>
            );
        })}
        <div class="flexBtn">
            <NavLink exact to="/"><button class="removeBtn" style={{'maxWidth': '14rem'}}>
                Go Back
            </button></NavLink>
            <button class="AddBtn" style={{'maxWidth': '14rem'}}>
                Checkout
            </button>            
        </div>
      </section>
    );
  }
}

export default connect(
  ({ app }) => ({
    data: app.data,
    cartItems: app.cartItems
  }),
  (dispatch) => ({
    updateData: (data) => dispatch(setData(data)),
    addToCart: (data) => dispatch(addToCart(data)),
    removeFromCart: (data) => dispatch(removeFromCart(data))
  })
)(Checkout);
