import React from "react";
import Order from "../components/order";
import { shallow } from "enzyme";
import configureStore from "redux-mock-store";
import Phone from "../images/smartphone.jpg";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

const mockStore = configureStore([]);
describe("order component", () => {
  let store;
  let component;
  let empty;
  const mockLoginfn1 = jest.fn();
  window.alert = jest.fn();
  beforeEach(() => {
    store = mockStore({
      addedItems: [],
      total: 0,
      shippingPrice: 0,
      myOrder: [
        {id: 1,src: Phone,name: "ONEPLUS",price: 30000,color: "Nebula Blue",RAM: "8GB",Storage: "128GB"},
        {id: 2,src: Phone,name: "SAMSUNG",price: 23000,color: "Glacier Blue",RAM: "8GB",Storage: "128GB"}
      ],
      view: [],
      Amount: [],
      price: 0
    });
    empty = mockStore({
      myOrder: []
    });
    component = shallow(<Order store={store} onCancel={mockLoginfn1} />)
      .childAt(0)
      .dive();
  });

  it("your order recipt", () => {
    const spy =jest.spyOn(component.instance(),"handleCancel");
    const firstRow = component.find("h1");
    expect(firstRow.render().text()).toContain("Your Order");
    const btn_cancel = component.find("button");
    expect(btn_cancel.render().text()).toContain("Cancel Order");
    btn_cancel.simulate("click");
    expect(spy).toHaveBeenCalledTimes(1);
    expect(window.alert).toHaveBeenCalledWith('Your order has been cancelled');
  });
  it("product ordered", () => {
    const Card = component.find(".Order_card");
    const pro1 = Card.at(0);
    const products = pro1.find("ul").map(child => child.text());
    expect(products).toEqual([
      "Product Name:ONEPLUSQuantity:Price:Rs.30000",
      "Product Name:SAMSUNGQuantity:Price:Rs.23000"
    ]);
  });
  it("empty order check", () => {
    const wrapper = shallow(<Order store={empty} />)
      .childAt(0)
      .dive();
    const nav = wrapper.find("Navbar");
    expect(nav.length).toBe(1);
    const cart_msg = wrapper.find("p");
    expect(cart_msg.text()).toBe("No orders yet");
  });

  
});
