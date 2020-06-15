import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import ScriptList from './shell/ScriptsList';
import ScriptDetail from './shell/ScriptDetails';
import Header from './Header';
import history from '../history';
import { connect } from 'react-redux';
import { executeScript } from '../actions';


class App extends React.Component {
  componentDidMount() {
    // window.ipcRenderer.on('scriptResults', (evt, data) => {
    //   this.props.executeScript(data);
    // });

  }
  render() {
    return (
      <div className="ui container">
        <Router history={history}>
          <div>
            <Header />
            <Switch>
              <Route path="/" exact component={ScriptList} />
              <Route path="/scripts/:id" exact component={ScriptDetail} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
    return { scripts: state.scripts };
};

export default connect(
  mapStateToProps,
  { executeScript }
)(App);