const LOAD = 'candidateDynamicData/LOAD';
const LOAD_SUCCESS = 'candidateDynamicData/LOAD_SUCCESS';
const LOAD_FAIL = 'candidateDynamicData/LOAD_FAIL';
import request from 'superagent';

const sheetsuURL = 'https://sheetsu.com/apis/82407032'

const initialState = {
  loaded: false
};

export default function candidateDynamicData (state = initialState, action = {}) {
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
  return globalState.candidates && globalState.candidates.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: () => {
        return new Promise((resolve) => {
            request
                .get('http://cors.io/?u='+sheetsuURL)
                .set('Accept', 'application/json')
                .end(function(err, res){
                    
                    let value = JSON.parse(res.text).result;
                    resolve({
                       value: value
                    });
                });

    
        });
        
    }
  };
}