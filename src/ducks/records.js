const LOAD = 'records/LOAD';
const LOAD_SUCCESS = 'records/LOAD_SUCCESS';
const LOAD_FAIL = 'records/LOAD_FAIL';
import request from 'superagent';

const sourceURL = 'http://data.wevote.tw/records.json'

const initialState = {
  loaded: false
};

export default function records (state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.records && globalState.records.loaded;
}

export function loadRecords() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: () => {
        return new Promise((resolve) => {
            request
                .get(sourceURL)
                .set('Accept', 'application/json')
                .end(function(err, res){
                    //console.log(res.text)
                    let value = JSON.parse(res.text);
                    resolve({
                       value: value
                    });
                });

    
        });
        
    }
  };
}

