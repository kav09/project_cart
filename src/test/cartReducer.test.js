import cartReducer from "../components/reducer/cartReducer";
import Phone from "../images/smartphone.jpg";


describe("testing cart reducer", () => {
  const initState = {
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
  };
  it("to check option1", () => {
    expect(cartReducer({}, { type: "on_Op1" })).toEqual({
      shippingPrice: 50
    });
  });
  it("to check option2", () => {
    expect(cartReducer({}, { type: "on_Op2" })).toEqual({
      shippingPrice: 100
    });
  });
  it("handling Add to cart", () => {
    const state = {
      view: [
        {id: 1,src: Phone,name: "ONEPLUS",price: 30000,color: "Nebula Blue",RAM: "8GB",Storage: "128GB"},
        ],
      addedItems: [],
      total: 0,

    };
    expect(cartReducer(state, { type: "on_Add_To_Cart", id: 1 })).toEqual({
      addedItems: [{id: 1,src: Phone,name: "ONEPLUS",price: 30000,color: "Nebula Blue",RAM: "8GB",Storage: "128GB",quantity:1}],
      total: 30000,
      view:state.view,
      shippingPrice:0
    });
  });
  
  it("delete from cart", () => {
    const state = {
      addedItems: [
        {id: 1,src: Phone,name: "ONEPLUS",price: 30000,color: "Nebula Blue",RAM: "8GB",Storage: "128GB",quantity: 1},
        {id: 2,src: Phone,name: "SAMSUNG",price: 23000,color: "Glacier Blue",RAM: "8GB",Storage: "128GB",quantity: 1}
      ],
      total: 53000
    };
    expect(cartReducer(state, { type: "on_Delete", id: 2 })).toEqual({
      addedItems: [{id: 1,src: Phone,name: "ONEPLUS",price: 30000,color: "Nebula Blue",RAM: "8GB",Storage: "128GB",quantity: 1}],
      total: 30000
    });
  });

  it("cancel order", () => {
    const state={
      myOrder:[
      {id: 1,src: Phone,name: "ONEPLUS",price: 30000,color: "Nebula Blue",RAM: "8GB",Storage: "128GB"},
      {id: 2,src: Phone,name: "SAMSUNG",price: 23000,color: "Glacier Blue",RAM: "8GB",Storage: "128GB"}
     ]
    }
    expect(cartReducer({}, { type: "Cancel_Order" })).toEqual({
      myOrder: [],
      total:0
    });
  });
  it("view check", () => {
    const state = {
      items: [
        {id: 1,src: Phone,name: "ONEPLUS",price: 30000,color: "Nebula Blue",RAM: "8GB",Storage: "128GB"},
        {id: 2,src: Phone,name: "SAMSUNG",price: 23000,color: "Glacier Blue",RAM: "8GB",Storage: "128GB"}
      ]
    };
    expect(cartReducer(state, { type: "View", id: 1 })).toEqual({
      view: [
        {id: 1,src: Phone,name: "ONEPLUS",price: 30000,color: "Nebula Blue",RAM: "8GB",Storage: "128GB"}
      ],
      items: state.items
    });
  });
  it("check place order", () => {
    const state = {
      addedItems: [
        {id: 1,src: Phone,name: "ONEPLUS",price: 30000,color: "Nebula Blue",RAM: "8GB",Storage: "128GB",quantity:1},
        {id: 2,src: Phone,name: "SAMSUNG",price: 23000,color: "Glacier Blue",RAM: "8GB",Storage: "128GB",quantity:1}
      ],
      total: 53000,
      shippingPrice: 50,
      Amount: 0,
      myOrder: [],
      price: 0
    };

    expect(cartReducer(state, { type: "Place_Order" })).toEqual({
      myOrder: state.addedItems,
      Amount: state.total,
      price: state.shippingPrice,
      addedItems: [],
      total: 0,
      shippingPrice: 0
    });
  });
  it("increment check", () => {
    const state = {
      addedItems: [
        {id: 1,src: Phone,name: "ONEPLUS",price: 30000,color: "Nebula Blue",RAM: "8GB",Storage: "128GB",quantity: 2},
        {id: 2,src: Phone,name: "SAMSUNG",price: 23000,color: "Glacier Blue",RAM: "8GB",Storage: "128GB",quantity: 1}
      ],
      total: 83000
    };

    expect(cartReducer(state, { type: "on_Inc", id: 2 })).toEqual({
      addedItems: [
        {id: 1,src: Phone,name: "ONEPLUS",price: 30000,color: "Nebula Blue",RAM: "8GB",Storage: "128GB",quantity: 2},
        {id: 2,src: Phone,name: "SAMSUNG",price: 23000,color: "Glacier Blue",RAM: "8GB",Storage: "128GB",quantity: 2}
      ],
      total: 106000
    });
  });

  it("decrement check", () => {
    const state = {
      addedItems: [
        {id: 1,src: Phone,name: "ONEPLUS",price: 30000,color: "Nebula Blue",RAM: "8GB",Storage: "128GB",quantity: 2},
        {id: 2,src: Phone,name: "SAMSUNG",price: 23000,color: "Glacier Blue",RAM: "8GB",Storage: "128GB",quantity: 1}],
      total: 83000
    };

    expect(cartReducer(state, { type: "on_Decr", id: 1 })).toEqual({
      addedItems: [
        {id: 1,src: Phone,name: "ONEPLUS",price: 30000,color: "Nebula Blue",RAM: "8GB",Storage: "128GB",quantity: 1},
        {id: 2,src: Phone,name: "SAMSUNG",price: 23000,color: "Glacier Blue",RAM: "8GB",Storage: "128GB",quantity: 1}
      ],
      total: 53000
    });
  });
});
