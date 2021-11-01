import React from "react";
import { NavLink } from "react-router-dom";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="header">
        <ul>
          <li>Fresh Stocks</li>
          {this.props.cartItems?.length ? <NavLink exact to="/checkout"><li className="cartPlaceholder">{'Cart(' + this.props.cartItems?.length + ')'}</li></NavLink>: ''}
        </ul>
      </nav>
    );
  }
}
