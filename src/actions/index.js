import { FETCH_SCRIPTS, FETCH_SCRIPT, EXECUTE_SCRIPT } from './types';
import ScriptData from '../data/ScriptData.json';


export const fetchScripts = () => async dispatch => {
  const response = ScriptData;
  dispatch({ type: FETCH_SCRIPTS, payload: response });
};

export const fetchScript = scriptId => async (dispatch, getState) => {
  const scripts = ScriptData;
  //const currScript = scripts.find(({ id }) => +id === +scriptId);

  dispatch({ type: FETCH_SCRIPT, payload: scripts });
};

export const executeScript = (script) => async (dispatch) => {

  const currScript = script;
 
  // // Create the PS Instance
  // let ps = new window.powershell({
  //   executionPolicy: 'Bypass',
  //   noProfile: true
  // })

  // ps.addCommand(currScript.path)
  //   .then(() => ps.addParameters([
  //     currScript.params.map(parm => {
  //       return `{${parm.paramName} : ${parm.paramValue}},`
  //     })
  //   ]));
  // const response = await ps.invoke();
  // const responseop = {
  //   ...script,
  //   output: response
  // };
   dispatch({ type: EXECUTE_SCRIPT, payload: currScript });

  //  ps.invoke()
  //    .then(output => {
  //      console.log(output)
  //      dispatch({ type: EXECUTE_SCRIPT, payload: output });
  //    })
  //    .catch(err => {
  //      console.error(err)
  //      dispatch({ type: EXECUTE_SCRIPT, payload: err });
  //      ps.dispose()
  //    })  
};

