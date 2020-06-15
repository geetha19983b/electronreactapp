import _ from 'lodash';
import { FETCH_SCRIPTS, EXECUTE_SCRIPT, FETCH_SCRIPT } from '../actions/types';

// export default (state = {}, action) => {
//   switch (action.type) {
//     case FETCH_SCRIPTS:
//       return { ...state, ..._.mapKeys(action.payload, 'id') };
//     case FETCH_SCRIPT:
//       return { ...state, [action.payload.id]: action.payload };  
//     case EXECUTE_SCRIPT:
//       return { ...state, [action.payload.id]: action.payload };
//     default:
//       return state;
//   }
// };

const initialState = {
  scripts: []
};



export default (state = initialState.scripts, action) => {
  switch (action.type) {
    case FETCH_SCRIPTS:
      // return state.concat(action.payload);
      //return [...state,...action.payload]
      return action.payload;
    case FETCH_SCRIPT:
      // return [...state,  ...action.payload ];
      return action.payload;
    case EXECUTE_SCRIPT:
      return state.map(script =>
        script.id === action.payload.id ? action.payload : script
      );
  
    default:
      return state;
  }
};