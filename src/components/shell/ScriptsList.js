import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchScripts } from '../../actions';

class ScriptList extends React.Component {
  componentDidMount() {
    this.props.fetchScripts();
  }
  renderList() {
    return this.props.scripts.map(script => {
      return (
        <div className="item" key={script.id}>
          <i className="large middle aligned icon play" />
          <div className="content">
            <Link to={`/scripts/${script.id}`} className="header">
              {script.title}
            </Link>
            <div className="description">{script.description}</div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h2>Scripts</h2>
        <div className="ui celled list">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    //scripts: Object.values(state.scripts)
    scripts: state.scripts
  };
};

export default connect(
  mapStateToProps,
  { fetchScripts }
)(ScriptList);