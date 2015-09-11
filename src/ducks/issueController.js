const VIEW_PARTY = 'VIEW_PARTY';
const VIEW_LEGISLATOR = 'VIEW_LEGISLATOR';
const VIEW_POSITION = 'VIEW_POSITION';
const INCREMENT = 'redux-example/counter/INCREMENT';

const initialState = {
  views: [
        {
          'title' : '看政黨',
          'id' : VIEW_PARTY
        },
        {
          'title' : '看委員',
          'id' : VIEW_LEGISLATOR
        },
        {
          'title' : '看表態',
          'id' : VIEW_POSITION
        }
  ],
  activeView: VIEW_PARTY
};

export default function reducer(state = initialState, action = {}) {
  
  switch (action.type) {
    case VIEW_PARTY:
      return {
        views: state.views,
        activeView: VIEW_PARTY
      };
    case VIEW_LEGISLATOR:
      return {
        views: state.views,
        activeView: VIEW_LEGISLATOR
      };
    case VIEW_POSITION:
      return {
        views: state.views,
        activeView: VIEW_POSITION
      };
    default:
      return state;
  }
}
export function setActiveView(value) {
  return {
    type: value
  };
}

