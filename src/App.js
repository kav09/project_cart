import React, { Component } from "react";

import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Product from "./components/Product";
import Cart from "./components/cart";
import Order from "./components/Order";
import view from "./components/view";

class App extends Component {
  render() {
    return (
      <div>
        <div className="topBackground">
          <center>
            <h1 className="title">
              <br />
              GADGETS
            </h1>
          </center>
        </div>
        <Router>
          <Route exact path="/" component={Product} />
          <Route path="/cart" component={Cart} />
          <Route path="/myorder" component={Order} />
          <Route path="/view" component={view} />
        </Router>
        { /*<Navbar />*/ }
      </div>
    );
  }
}

export default App;
