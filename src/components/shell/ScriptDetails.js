import React from 'react';
import { connect } from 'react-redux';
import { fetchScript, executeScript } from '../../actions';

class ScriptDetail extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchScript(id);
  }

   executeScript() {
     const currScript = this.props.script;
    /*let ps = new window.powershell({
      executionPolicy: 'Bypass',
      noProfile: true
    })

    ps.addCommand(currScript.path)
      .then(() => ps.addParameters([
        currScript.params.map(parm => {
          return `{${parm.paramName} : ${parm.paramValue}},`
        })
      ]));
    const response = await ps.invoke();
    const responseop = {
      ...currScript,
      output: response
    };
    this.props.executeScript(responseop); */

    window.ipcRenderer.send('exec-shellscript',currScript
    );
  }

  render() {
    if (!this.props.script) {
      return <div>Loading...</div>;
    }

    const { title, description, output } = this.props.script;
    const currScript = this.props.script;
    return (
      <div>
        <h1>{title}</h1>
        <h5>{description}</h5>
        <button className="ui button primary" onClick={() => this.executeScript()}>Execute</button>
        <p>{output}</p>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  //return { script: state.scripts[ownProps.match.params.id] };
  return { script: state.scripts.find(({ id }) => +id === +ownProps.match.params.id) };
};

export default connect(
  mapStateToProps,
  { fetchScript, executeScript }
)(ScriptDetail);