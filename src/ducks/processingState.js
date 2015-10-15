const initialState = {
  processing: "none"
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "processing":
      return {
        processing: "processing"
      };
    case "done":
      return {
        processing: "done"
      };
    case "none":
      return {
        processing: "none"
      };
    default:
      return state;
  }
}

export function setToProecessing() {
  return {
    type: "processing"
  };
}
export function done() {
  return {
    type: "done"
  };
}
export function none() {
  return {
    type: "none"
  };
}