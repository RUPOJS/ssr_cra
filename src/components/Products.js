import React from "react";
import { connect } from "react-redux";
import { setData, addToCart, removeFromCart } from "../store/appReducer";
import ProductItem from './ProductItem';

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.rootRef = React.createRef();
    this.addItemToCart = this.addItemToCart.bind(this);
  }

  addItemToCart = (item) => {
    // console.log(item);
    let toRemove = false;
    const cartItem = this.props.data.filter((ele) => {
        return item == ele.productId;
    });
    if(this.props.cartItems.length) {
        for(let index = 0; index < this.props.cartItems.length; index++) {
            if(this.props.cartItems[index]['productId'] == item) {
                toRemove = true;
            }
        }
        // console.log(toRemove);
    }
    if(!toRemove) {
        this.props.addToCart(cartItem);
    } else {
        const updatedCartData = this.props.cartItems.filter((ele) => {
            return ele.productId != item;
        });
        this.props.removeFromCart(updatedCartData);
    }
    
  }

  render() {
    const { data } = this.props;
    return (
      <section className="productContainer" ref={this.rootRef}>
        {data.map((item, index) => {
            return <ProductItem key={item.productId} index={index} origin="listing" containerRef={this.rootRef} data={item} updateCart={this.addItemToCart} cartData={this.props.cartItems} />
        })}
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
)(Products);
