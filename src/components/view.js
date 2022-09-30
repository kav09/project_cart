import React, { Component } from "react";
import { onAdd } from "./Action/Action";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./nav";

export class View extends Component {
  state = {
    product: this.props.viewItems,
  };

  style = {
    width: "300px",
    text_align: "justify "
  }

  handleClick = (id) => {
    this.props.onAdd(id);
    this.props.history.push("/cart");
  };

  render() {
    // console.log("View Item display",this.props.viewItems)
    /*use this div structure to display the product to be viewed*/
    const productDetail = (
      <div className="view_card" id="List">
        <table>
          {this.state.product.map((item) => (
            <tbody key={item.id}>
              <tr>
                <td>
                  <h3>{item.name}</h3>
                  <br />
                  <img
                    src={item.src}
                    alt="Phone"
                    height="230px"
                    width="350px"
                  />
                </td>
                <td id="">
                  <br />
                  Color:{item.color}
                  <br />
                  RAM:{item.RAM}
                  <br />
                  Storage:{item.Storage}
                  <br />
                  Price:Rs {item.price}
                  <br />
                  <br />
                  <button
                    id="viewProduct" className="btn-success "
                    onClick={() => this.handleClick(item.id)}
                  >
                    Add To Cart
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    );

    return (
      <React.Fragment>
        <Navbar />
        <center><div>{productDetail}</div></center>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return { viewItems: state.view };
};
const mapDispachToProps = (dispach) => {
  return {
    onAdd: (id) => dispach(onAdd(id)),
  };
};

export default connect(mapStateToProps, mapDispachToProps)(View);
