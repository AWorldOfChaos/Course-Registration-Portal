import { Component } from "react";

class Login extends Component{
  constructor(props) {
    super(props);
    this.state = { records : [] };
  }

  callAPI() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ID: '34567', password : 'Zhnag' })
    };
    fetch('http://localhost:8080/user/login', requestOptions)
    .then(response => response.json())
    .then(response => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error.message);
    });
  }

  componentDidMount() {
      this.callAPI();
  }

  
  render(){
    return (
      <div className="Login">
        Hello
      </div>
    );
  }
}

export default Login;
