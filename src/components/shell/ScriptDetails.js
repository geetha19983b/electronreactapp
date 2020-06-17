import React from 'react';
import { connect } from 'react-redux';
import { startFetchingScripts, fetchScripts, executeScript } from '../../actions';
import { BounceLoader } from "react-spinners";

class ScriptDetail extends React.Component {
  componentDidMount() {
    //const { id } = this.props.match.params;
    //this.props.fetchScript(id);
    //this.props.startFetchingScripts();
    //this.props.fetchScripts();
  }

  executeScript() {
    const currScript = this.props.script;
    this.props.executeScript(currScript);
  }
  renderMessage() {
    const { message } = this.props.script;
    return (
      <div className="ui info message">
          <i className="close icon"></i>
          <div className="header">
            {message}
           </div>
        </div>
    )
  }
  render() {
    if (this.props.loading)
    return (
      <div>
        <BounceLoader />
      </div>
    );

    const { title, description, output, execution, message } = this.props.script;

    return (
      <div>
        <h1>{title}</h1>
        <h5>{description}</h5>
        <button className="ui button primary"
          disabled={execution}
          onClick={() => this.executeScript()}>Execute</button>
        {message ? this.renderMessage() : null}
        <p>{output}</p> 
      </div>

    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { script: state.scripts.scriptsList.find(({ id }) => +id === +ownProps.match.params.id) };
};

export default connect(
  mapStateToProps,
  { executeScript, fetchScripts,startFetchingScripts }
)(ScriptDetail);