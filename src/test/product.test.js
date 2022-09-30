import React from "react";
import Product from "../components/Product";
import { shallow } from "enzyme";
import configureStore from "redux-mock-store";
import Phone from "../images/smartphone.jpg";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { equal } from "assert";

configure({ adapter: new Adapter() });

const mockStore = configureStore([]);

describe("Product component", () => {
  const historyMock = { push: jest.fn() };
  const mockfn1 = jest.fn();
  let store;
  let component;
  beforeEach(() => {
    store = mockStore({
    items: [ 
            {id: 1,src: Phone,name: "ONEPLUS",price: 30000,color: "Nebula Blue", RAM: "8GB",Storage: "128GB"},
            {id: 2,src: Phone,name: "SAMSUNG",price: 23000,color: "Glacier Blue",RAM: "8GB",Storage: "128GB"},
            {id: 3,src: Phone,name: "MI A7",price: 19000,color: "Frosted Silver",RAM: "6GB",Storage: "64GB"},
            {id: 4,src: Phone,name: "REAL ME",price: 20000,color: "Nebula Blue",RAM: "12GB",Storage: "32GB"},
            {id: 5,src: Phone,name: "MOTO",price: 23000,color: "Glacier Blue",RAM: "4GB",Storage: "32GB"},
            {id: 6,src: Phone,name: "VIVO",price: 19000,color: "Frosted Silver",RAM: "6GB",Storage: "64GB"},
            {id: 7,src: Phone,name: "OPPO",price: 20000,color: "Glacier Blue",RAM: "8GB",Storage: "128GB"},
            {id: 8,src: Phone,name: "REDMI",price: 20000,color: "Nebula Blue",RAM: "4GB",Storage: "64GB"}
            ],
      addedItems: [],
      total: 0,
      shippingPrice: 0,
      myOrder: [],
      view: [],
      Amount: [],
      price: 0
    });
    component = shallow(
      <Product store={store} onView={mockfn1} history={historyMock} />
    ) .childAt(0)
      .dive();
  });

  it("product content", () => {
    expect(component.find("Navbar").length).toBe(1);
    expect(component.find(".card").length).toBe(8);
  });
  it("product card", () => {
    const card = component.find(".card").at(0);
    const Product = card.find("ul").map(child => child.text());
    expect(Product).toEqual(["ONEPLUSRs.30000View Product"]);
  });
  it("view button click", () => {
    const card = component.find(".card").at(0);
    const spy =jest.spyOn(component.instance(),"handleView")
    const viewPro = card
      .find("ul")
      .find("li")
      .at("3");
    const btn = viewPro.find("button");
    expect(btn.length).toBe(1);
    btn.simulate("click");
    expect(spy).toHaveBeenCalledTimes(1);

  });
});
