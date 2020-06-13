import React from 'react';
import SearchBar from './SearchBar';


class App extends React.Component {
  state={message:null};

  onSearchSubmit =  term => {
    
    window.ipcRenderer.send('exec-shellscript',term);

    window.ipcRenderer.on('scriptResults', (evt, data) => {
     console.log(data);
     this.setState({message:data});

    });
  };

  render() {
    return (
      <div className="ui container" style={{ marginTop: '10px' }}>
        <SearchBar onSubmit={this.onSearchSubmit} />
        <div>{this.state.message}</div>
      </div>
    );
  }
}

export default App;