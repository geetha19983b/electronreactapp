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
  
  window.ipcRenderer.send('exec-shellscript',currScript);
  window.ipcRenderer.on('scriptResults', (evt, data) => {
    dispatch({ type: EXECUTE_SCRIPT, payload: data });
  });  
  
};


