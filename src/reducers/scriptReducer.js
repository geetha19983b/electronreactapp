import _ from 'lodash';
import { FETCH_SCRIPTS, EXECUTE_SCRIPT, FETCH_SCRIPT,START_FETCHING_SCRIPTS,START_EXECUTING_SCRIPTS } from '../actions/types';

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
  loading:false,
  scriptsList: []
};



export default (state = initialState, action) => {
  let scriptData = null;
  let scriptList =[];
  switch (action.type) {
    case START_FETCHING_SCRIPTS:
      return { ...state, loading: true };
    case FETCH_SCRIPTS:
      // return state.concat(action.payload);
      //return [...state,...action.payload]
      return {...state, scriptsList:action.payload,loading:false};
    case FETCH_SCRIPT:
      // return [...state,  ...action.payload ];
      return action.payload;
    case START_EXECUTING_SCRIPTS:
     scriptData = {...action.payload,execution:true,message:'Script Execution InProgress'};
      scriptList = state.scriptsList.map(script =>
        script.id === scriptData.id ? scriptData : script
      );
      return {...state,scriptsList:scriptList};
    case EXECUTE_SCRIPT:
      scriptData = {...action.payload,execution:false,message:'Script Execution Completed'};
      scriptList= state.scriptsList.map(script =>
        script.id === action.payload.id ? scriptData : script
      );
      return {...state,scriptsList:scriptList};
  
    default:
      return state;
  }
};