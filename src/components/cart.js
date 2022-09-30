import React, { Component } from "react";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./nav";
import { onDelete, onInc, onDecr, onOp1, onOp2 } from "./Action/Action";

export class Cart extends Component {
  state = {
    items: this.props.items,
  };
  handleDelete = (id) => {
    this.props.onDelete(id);
  };
  handleDecr = (id) => {
    this.props.onDecr(id);
  };
  handleIncr = (id) => {
    this.props.onInc(id);
  };
  onOption1 = (e) => {
    this.props.onOp1(e);
  };
  onOption2 = (e) => {
    this.props.onOp2(e);
  };
  handleOrder = (e) => {
    this.props.placeOrder();
    this.props.history.push("/myorder");
  };

  render() {
    return (
      <div>
        <Navbar />
        <h2>My Cart</h2>
        <br />
        <div>
          {this.props.items.length === 0 && (
            <div>
              <p className="empty">Cart is empty</p>
            </div>
          )}

          <table className="Card">
            <tbody>
              {this.props.items.map((item) => {
                return (
                  <tr key={item.id} >
                    <td>
                      <img src={item.src} height="150px" alt="Phone" />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>
                      <button onClick={() => this.handleIncr(item.id)}>
                        +
                      </button>
                      <span>{item.qty}</span>
                      <button id="increment" onClick={() => this.handleDecr(item.id)}>
                        -
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => this.handleDelete(item.id)}
                        className="btn_cancel"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {this.state.items.length>0 && (
          <div>
            <p>Choose your shipping</p>
            <input
              type="radio"
              id="7days option1"
              name="shipping"
              value="Shipping within 7 days"
              onClick={(event)=>this.onOption1(event)}
            />
            <label htmlFor="7days"> Shipping within 7 days(+50)</label>
            <br />
            <input
              type="radio"
              id="2days option2"
              name="shipping"
              value="Shipping within 2 days"
              onClick={(event)=>this.onOption2(event)}
            />
            <label htmlFor="2days"> Shipping within 2 days(+100)</label>
            <br />
            <button
              id="placeOrder"
              className="btn-success"
              onClick={() => this.handleOrder()}
            >
              Place Order
            </button>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    items: state.addedItems,
    total: state.total,
    shippingPrice: state.shippingPrice,
    disable: state.disable,
    check1: state.checked1,
    check2: state.checked2,
  };
};
const mapDispachToProps = (Dispach) => {
  return {
    onDelete: (id) => Dispach(onDelete(id)),
    onInc: (id) => Dispach(onInc(id)),
    onDecr: (id) => Dispach(onDecr(id)),
    onOp1: (e) => Dispach(onOp1(e)),
    onOp2: (e) => Dispach(onOp2(e)),
    placeOrder: (e) => Dispach({ type: "Place_Order" }),
  };
};

export default connect(mapStateToProps, mapDispachToProps)(Cart);
