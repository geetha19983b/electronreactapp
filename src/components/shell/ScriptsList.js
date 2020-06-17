import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchScripts,startFetchingScripts } from '../../actions';
import { BounceLoader } from "react-spinners";

class ScriptList extends React.Component {
  
  componentDidMount() {
    this.props.startFetchingScripts();
    this.props.fetchScripts();
  }
  renderList() {
   // console.log(typeof(this.props.scriptsList));
    //console.log(this.props.scriptsList);
    // return Object.keys(this.props.scriptsList).map((key,i) => {
    //   console.log(key);
    //   console.log(this.props.scriptsList[key]);
      
    // });
    
    return this.props.scriptsList.map(script => {
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
    if (this.props.loading)
    return (
      <div>
        <BounceLoader />
      </div>
    );
    return (
      <div>
        <h2>Scripts</h2>
        <div className="ui celled list">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = ({scripts}) => {
  return {
    loading:scripts.loading,
    scriptsList:scripts.scriptsList
  };
};

export default connect(
  mapStateToProps,
  { startFetchingScripts,fetchScripts }
)(ScriptList);