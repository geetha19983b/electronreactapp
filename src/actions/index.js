import { FETCH_SCRIPTS, FETCH_SCRIPT, EXECUTE_SCRIPT,START_FETCHING_SCRIPTS,START_EXECUTING_SCRIPTS } from './types';
import ScriptData from '../data/ScriptData.json';

export const startFetchingScripts = () => {
  return { type: START_FETCHING_SCRIPTS };
};

export const fetchScripts = () => async dispatch => {
 // const response = ScriptData;
 window.ipcRenderer.send("scripts:get");
 window.ipcRenderer.on(
  "scripts:list",
  (event, data) => {
    dispatch({
      type: FETCH_SCRIPTS,
      //payload: data['scriptsList']
      payload: data
    });
  }
);
  //dispatch({ type: FETCH_SCRIPTS, payload: response });
};

export const fetchScript = scriptId => async (dispatch, getState) => {
  const scripts = ScriptData;
  //const currScript = scripts.find(({ id }) => +id === +scriptId);

  dispatch({ type: FETCH_SCRIPT, payload: scripts });
};

export const executeScript = (script) => async (dispatch) => {
  const currScript = script;
  
  window.ipcRenderer.send('exec-shellscript',currScript);
  window.ipcRenderer.on('script:execution:inprogress',(evt,data) => {

    dispatch({type:START_EXECUTING_SCRIPTS,payload:data});
  });
  window.ipcRenderer.on('scriptResults', (evt, data) => {
    dispatch({ type: EXECUTE_SCRIPT, payload: data });
  });  
  
};


