import React, { Component } from "react";
import { connect } from "react-redux";
import { viewItem } from "./Action/Action";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./nav";

class Product extends Component {
  handleView = id => {
    this.props.onView(id);
    this.props.history.push("/view");
  };
  render() {
    return (
      <div className="product_list ">
        <Navbar />
        {/* <h1 id="ourProduct">Our Products</h1> */}
        <div>
          <ul>
          {
          this.props.items.map(item => (
          <li key={item.id} className="card">
            <img src={item.src} id="img" alt="Phone" />
            <p>{item.name}<br/>
            {item.price}
            <button onClick={()=>this.handleView(item.id)}>View Product</button></p>
          </li>
          ))
        }
        </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { items: state.items };
};

const mapDispachToProps = dispach => {
  return {
    onView: id => dispach(viewItem(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(Product);
