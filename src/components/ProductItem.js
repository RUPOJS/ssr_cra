import { findAllByTestId } from "@testing-library/react";
import React from "react";

class ProductItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
        this.productItemRef = React.createRef();
        this.observerCallback = this.observerCallback.bind(this);
        this.updateCart = this.updateCart.bind(this);
    }

    shouldComponentUpdate = (newProps, newState) => {
        if((newState.visible !== this.state.visible) || newProps.cartData.length !== this.props.cartData.length) {
            return true;
        }
        return false;
    }

    componentDidMount = () => {
        // console.log('bind observer here');
        this.intersectionObserver = new IntersectionObserver(this.observerCallback, {root: null, rootMargin: '0px', threshold: '0'});
        this.intersectionObserver.observe(this.productItemRef.current);    
    }

    observerCallback = (entries) => {
        // this.props.renderIfInViewport(entries);
        entries.forEach(element => {
            if(element.isIntersecting && element.target.className === 'productItem_hidden') {
                setTimeout(() => {
                    this.setState({ visible: !this.state.visible });
                }, 100);
            }

            if(!element.isIntersecting && element.target.className === 'productItem_visible') {
                setTimeout(() => {
                    this.setState({ visible: !this.state.visible });
                }, 100);                
            }
        });        
    }

    updateCart = (item) => {
        // console.log(item);
        this.props.updateCart(item);
    }

    render() {
        const item = this.props.data;
        let btnText = 'Add To Cart';
        this.props.cartData.forEach((ele) => {
            if(ele.productId == item.productId) {
                btnText = 'Remove';
            }
        });
        return (
            <section
                className={this.state.visible ? "productItem_visible" : "productItem_hidden"}
                id={item.productId}
                ref={this.productItemRef}
                visible={this.state.visible ? 'true' : 'false'}
                >{false && this.props.index}
                {this.state.visible ? <><img
                    src={item.searchImage}
                    alt={item.productName}
                    loading="lazy"
                />
                <h2>
                    {item.brand +
                    " " +
                    item.category +
                    "(" +
                    item.primaryColour +
                    ")"}
                </h2>
                <span>{item.additionalInfo}</span>
                <aside>
                    <ul>
                    <li>{"Price: ₹" + item.price}</li>
                    <li>In Stock</li>
                    </ul>
                    <button className={btnText === 'Remove' ? 'removeBtn' : ''} onClick={this.updateCart.bind(this, item.productId)}>{btnText}</button>
                </aside></> : <></>}
            </section>
        );
    }
};

export default ProductItem