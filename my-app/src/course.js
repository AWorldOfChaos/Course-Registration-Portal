import './course.css';
import { Component } from "react";

class Course extends Component{
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
      <div className="Course">
        <table border='1' frame='void' rules='rows'>
          <tr>
            <th>Department Name</th>
          </tr>
          {this.state.records.map((records, i) =>
              <tr>
                <td key={i}>{records.dept_name} </td>
              </tr>
          )}
        </table>
      </div>
    );
  }
}

export default Course;
