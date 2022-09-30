export const onAdd = id => {
    return {
      type: "on_Add_To_Cart",
      id
    };
  };
  
  export const onDelete = id => {
    return {
      type: "on_Delete",
      id
    };
  };
  export const onInc = id => {
    return {
      type: "on_Inc",
      id
    };
  };
  export const onDecr = id => {
    return {
      type: "on_Decr",
      id
    };
  };
  export const onOp1 = e => {
    return {
      type: "on_Op1"
    };
  };
  export const onOp2 = e => {
    return {
      type: "on_Op2"
    };
  };
  export const viewItem = id => {
    return {
      type: "View",
      id
    };
  };
  