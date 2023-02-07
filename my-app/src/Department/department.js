import './department.css';
import { Component } from "react";
import { Link } from "react-router-dom";

class Department extends Component{
  constructor(props) {
    super(props);
    this.state = { records : [] };
  }

  callAPI() {
    fetch(`http://localhost:8080/course/running`)
    .then(res => res.json())
    .then(res => {
      this.setState({
          records: res
      });
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
      <div className="Department">
        <table border='1' frame='void' rules='rows'>
          <tbody>
            <tr>
              <th>Department Name</th>
            </tr>
            {this.state.records.map((records, i) =>
                <tr key={i}>
                  <td><Link to={'/course/running/' + records.dept_name}>{records.dept_name}</Link></td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Department;
