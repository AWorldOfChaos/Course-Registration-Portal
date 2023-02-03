import logo from './logo.svg';
import './App.css';
import { Component } from "react";

class App extends Component{
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch(`http://localhost:8080/courses`)
    .then(res => res.text())
    .then(res => res.map(
      (res)=>{
          return(
              <tr>
                  <td>{res.title}</td>
              </tr>
          )
      }))
    .catch((error) => {
      console.log(error.message);
    });
  }

  componentDidMount() {
      this.callAPI();
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        {/* <tbody>
                {this.state.apiResponse.map(apiResponse =>
                    <tr>
                        <td>{apiResponse.title}</td>
                    </tr>
                )}
            </tbody> */}
        {/* <p className="App-intro">;{this.state.apiResponse}</p> */}
        
      </div>
    );
  }
}

export default App;
