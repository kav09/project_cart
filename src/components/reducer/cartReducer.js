import Phone from "../../images/smartphone.jpg";
import "bootstrap/dist/css/bootstrap.css";

const initState = {
  items: [
    {
      id: 1,
      src: Phone,
      name: "ONEPLUS",
      price: 30000,
      color: "Nebula Blue",
      RAM: "8GB",
      Storage: "128GB",
    },
    {
      id: 2,
      src: Phone,
      name: "SAMSUNG",
      price: 23000,
      color: "Glacier Blue",
      RAM: "8GB",
      Storage: "128GB",
    },
    {
      id: 3,
      src: Phone,
      name: "MI A7",
      price: 19000,
      color: "Frosted Silver",
      RAM: "6GB",
      Storage: "64GB",
    },
    {
      id: 4,
      src: Phone,
      name: "REAL ME",
      price: 20000,
      color: "Nebula Blue",
      RAM: "12GB",
      Storage: "32GB",
    },
    {
      id: 5,
      src: Phone,
      name: "MOTO",
      price: 23000,
      color: "Glacier Blue",
      RAM: "4GB",
      Storage: "32GB",
    },
    {
      id: 6,
      src: Phone,
      name: "VIVO",
      price: 19000,
      color: "Frosted Silver",
      RAM: "6GB",
      Storage: "64GB",
    },
    {
      id: 7,
      src: Phone,
      name: "OPPO",
      price: 20000,
      color: "Glacier Blue",
      RAM: "8GB",
      Storage: "128GB",
    },
    {
      id: 8,
      src: Phone,
      name: "REDMI",
      price: 20000,
      color: "Nebula Blue",
      RAM: "4GB",
      Storage: "64GB",
    },
  ],
  addedItems: [],
  total: 0,
  shippingPrice: 0,
  myOrder: [],
  view: [],
  Amount: [],
  price: 0,
};

const cartReducer = (state = initState, action) => {
  if (action.type === "on_Add_To_Cart") {
    let qty = 1;
    const cartID = action.id;
    const cartItem = state.items.find((item) => item.id === cartID);
    const alreadyPresent = state.addedItems.findIndex(
      (x) => x.id === cartItem.id
    );

    if (alreadyPresent !== -1) {
      const newAddedItem = [...state.addedItems];
      newAddedItem[alreadyPresent] = {
        ...cartItem,
        qty: newAddedItem[alreadyPresent].qty + 1,
      };

      return {
        ...state,
        addedItems: newAddedItem,
      };
    }

    const updatedCartValue = { ...cartItem, qty };
    return {
      ...state,
      addedItems: [...state.addedItems, updatedCartValue],
    };
  }

  if (action.type === "on_Delete") {
    const id = action.id;
    const index = state.addedItems.findIndex((x) => x.id === id);
    // console.log("index",index)
    // console.log("addedItems",state.addedItems)
    const addedItemArray = [...state.addedItems];

    addedItemArray.splice(index, 1);
    // console.log("addedItemArray",addedItemArray)
    return { ...state, addedItems: [...addedItemArray] };
  }
  if (action.type === "on_Inc") {
    const id = action.id;
    const incItem = state.addedItems.find((x) => x.id === id);
    // console.log("Increment Item Value",incItem)
    const indexOfIncItem = state.addedItems.findIndex(
      (x) => x.id === incItem.id
    );
    // console.log("Index of Inc Item",indexOfIncItem)
    const newAddedItem = [...state.addedItems];
    newAddedItem[indexOfIncItem] = {
      ...incItem,
      qty: newAddedItem[indexOfIncItem].qty + 1,
    };
    return {
      ...state,
      addedItems: newAddedItem,
    };
  }
  if (action.type === "on_Decr") {
    const id = action.id;
    const decItem = state.addedItems.find((x) => x.id === id);

    // console.log("Increment Item Value",incItem)
    const indexOfDecItem = state.addedItems.findIndex(
      (x) => x.id === decItem.id
    );
    // console.log("Index of Inc Item",indexOfDecItem)
    const newAddedItem = [...state.addedItems];
    if (decItem.qty === 1) newAddedItem.splice(indexOfDecItem, 1);
    else {
      newAddedItem[indexOfDecItem] = {
        ...decItem,
        qty: newAddedItem[indexOfDecItem].qty - 1,
      };
    }
    return {
      ...state,
      addedItems: newAddedItem,
    };
  }
  if (action.type === "on_Op1") {
    //code goes here on choosing first option(shipping within 7 days(+50))
    return {
      ...state,
      shippingPrice: 50,
    };
  }
  if (action.type === "on_Op2") {
    return {
      ...state,
      shippingPrice: 100,
    };
  }
  if (action.type === "Place_Order") {
    //code goes here for place order
    const amountArray = [];
    let overallTotal = 0;
    for (const obj1 of state.addedItems) {
      let total = obj1.price * obj1.qty;
      amountArray.push(total);
      overallTotal = total + overallTotal;
      // console.log("overallTotal",overallTotal)
    }
    const totalAfterShipping = state.shippingPrice + overallTotal;
    // console.log("Overall Total After Adding Shipping Price",overallTotal)
    const orderItem = [...state.addedItems];

    return {
      ...state,
      myOrder: [...orderItem],
      price: overallTotal,
      total: totalAfterShipping,
      addedItems: [],
    };
  }
  if (action.type === "Cancel_Order") {
    //code goes here for cancel order
    return {
      ...state,
      myOrder: [],
    };
  }
  if (action.type === "View") {
    const viewId = action.id;
    const viewedItem = state.items.find((item) => item.id === viewId);
    return {
      ...state,
      view: [viewedItem],
    };
  } else {
    return state;
  }
};
export default cartReducer;
