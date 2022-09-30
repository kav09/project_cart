import React from "react";
import Cart from "../components/cart";
import { shallow } from "enzyme";
import configureStore from "redux-mock-store";
import Phone from "../images/smartphone.jpg";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

const mockStore = configureStore([]);
describe("cart component", () => {
  let store;
  const mockfn1 = jest.fn();
  window.alert = jest.fn();
  const historyMock = { push: jest.fn() };
  let component;
  let empty;
  beforeEach(() => {
    store = mockStore({
      addedItems: [
        {id: 1,src: Phone,name: "1Plus7t",price: 30000,color: "Nebula Blue",RAM: "8GB",Storage: "128GB"},
        {id: 2,src: Phone,name: "samsung",price: 23000,color: "Glacier Blue",RAM: "8GB",Storage: "128GB"}],
      total: 0,
      shippingPrice: 50,
      myOrder: [],
      view: [],
      Amount: [],
      price: 0
    });
    component = shallow(
      <Cart
        store={store}
        onOp1={mockfn1}
        onOp2={mockfn1}
        onInc={mockfn1}
        history={historyMock}
      />
    )
      .childAt(0)
      .dive();
    empty = mockStore({
      addedItems: []
    });
  });

  it("cart items", () => {
    const spy =jest.spyOn(component.instance(),"handleOrder");
    const shipping = component.find("p").at(1);
    expect(shipping.render().text()).toContain("Choose your shipping");
    const Place_Order = component.find("#place_order");
    expect(Place_Order.render().text()).toContain("Place Order");
    Place_Order.simulate("click");
    expect(spy).toHaveBeenCalledTimes(1);
    
  });

  it("cart list", () => {
    const opt1 = component.find(".Card");
    expect(opt1.length).toBe(2);
    const items1 = opt1.at(0);
    const item1 = items1.find("table tbody tr").map(child => child.text());
    expect(item1).toEqual(["1Plus7tRs.30000+-Delete"]);
    const items2 = opt1.at(1);
    const item2 = items2.find("table tbody tr").map(child => child.text());
    expect(item2).toEqual(["samsungRs.23000+-Delete"]);
  });
  it("button click", () => {
    const spy =jest.spyOn(component.instance(),"handleIncr");
    const opt1 = component.find(".Card").at(0);
    const item1 = opt1.find("table tbody tr td").at(3);
    const btn = item1.find("#increment");
    btn.simulate("click");
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it("onchange shipping price", () => {
    const spy1 =jest.spyOn(component.instance(),"onOption1");
    const spy2 =jest.spyOn(component.instance(),"onOption2");
    const option1 = component.find("#option1");
    expect(option1.length).toBe(1);
    option1.simulate("change" );
    expect(spy1).toHaveBeenCalledTimes(1);
    const option2 = component.find("#option2");
    option2.simulate("change");
    expect(spy2).toHaveBeenCalledTimes(1);

  });

  it("empty cart check", () => {
    var data = [];
    const wrapper = shallow(<Cart store={empty} />)
      .childAt(0)
      .dive();
    const nav = wrapper.find("Navbar");
    expect(nav.length).toBe(1);
    const cart_msg = wrapper.find("p");
    expect(cart_msg.text()).toBe("Your cart is empty");
  });
});
