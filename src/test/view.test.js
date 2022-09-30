import React from "react";
import View from "../components/view";
import { shallow } from "enzyme";
import configureStore from "redux-mock-store";
import Phone from "../images/smartphone.jpg";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

const mockStore = configureStore([]);
describe("view component", () => {
  const historyMock = { push: jest.fn() };
  let store;
  let component;
  const mockfn1 = jest.fn();

  beforeEach(() => {
    store = mockStore({
      view: [
        {id: 1,src: Phone,name: "1Plus7t",price: 30000,color: "Nebula Blue",RAM: "8GB",Storage: "128GB"}]
    });
    component = shallow(
      <View store={store} onAdd={mockfn1} history={historyMock} />
    )
      .childAt(0)
      .dive();
  });

  it("view content", () => {
    expect(component.find("Navbar").length).toBe(1);
  });
  it("view list", () => {
    const productName = component.find(".view_card");
    expect(productName.length).toEqual(1);
    const item1 = productName
      .at(0)
      .find("tr")
      .map(child => child.text());
    expect(item1).toEqual([
      "1Plus7tColor:Nebula BlueRAM:8GBStorage:128GBPrice:Rs.30000Add To Cart"
    ]);
  });
  it("view button click", () => {
    const spy =jest.spyOn(component.instance(),"handleClick");
    const productName = component.find(".view_card");
    expect(productName.length).toEqual(1);
    const item1 = (productName.at(0).find("table")).find("tbody");
    const item2 = (item1.find("tr").at(0)).find("td").at(1);
    const Add_to_cart = item2.find("#viewProduct");
    expect(Add_to_cart.length).toBe(1);
    Add_to_cart.simulate("click");
    expect(spy).toHaveBeenCalled();
  });
});

