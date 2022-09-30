import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar from "./nav";

export class Order extends Component {
  state = {
    myItems: this.props.myItems,
    total: this.props.total,
    shippingPrice: this.props.shippingPrice,
    Amount: this.props.Amount,
    price: this.props.price,
  };
  handleCancel = (e) => {
    this.props.onCancel(e);
    window.alert("Your order has been cancelled");
    this.props.history.push("/");
  };

  render() {
    const orderDetail = (
      <center>
        <div className="order Order_card">
          <h1>Your Order</h1>
          {this.state.myItems.map((item) => (
            <div key={item.id}>
              <ul>
                <li>Product Name: {item.name}</li>
                <li>Quantity:{item.qty}</li>
                <li>Price:{item.price}</li>
              </ul>
              <hr />
            </div>
          ))}
          <hr />
          <ul>
            <li>Total Amount:{this.state.price} </li>
            <li>Delivery Charges:{this.state.shippingPrice}</li>
            <li>Amount To Pay:{this.state.total}</li>
          </ul>
          <button
            className="btn btn-danger"
            onClick={(e) => this.handleCancel(e)}
          >
            Cancel Order
          </button>
        </div>
      </center>
    );
    return (
      <div>
        <Navbar />
        {this.state.myItems === 0 && (
          <div>
            <p className="empty">No orders yet.</p>
          </div>
        )}
        {this.state.myItems !== 0 && orderDetail}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    myItems: state.myOrder,
    total: state.total,
    shippingPrice: state.shippingPrice,
    Amount: state.Amount,
    price: state.price,
  };
};

const mapDispachToProps = (Dispach) => {
  return {
    onCancel: (e) => Dispach({ type: "Cancel_Order" }),
  };
};
export default connect(mapStateToProps, mapDispachToProps)(Order);
