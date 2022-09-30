import React from "react";
import Navbar from "../components/nav";
import { shallow } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("testing NavBar", () => {
  it("navbar_content", () => {
    const component = shallow(<Navbar />);
    const div = component.find("div").at(0);
    expect(div.length).toBe(1);
    const nav = component.find("nav").at(0);
    expect(nav.length).toBe(1);   
    const Cart=(component.find("Link")).at(1);
    expect(Cart.props().to).toContain("/cart");
    const Order=(component.find("Link")).at(2);
    expect(Order.props().to).toContain("/myorder");
  });
});
