import './course.css';
import { Component } from "react";
import { withRouter } from "react-router";

class Course extends Component{
  constructor(props) {
    super(props);
    this.state = { records : [] };
  }

  callAPI() {
    const dept_name = this.props.match.params.dept_name;
    console.log(dept_name)
    fetch(`http://localhost:8080/course/running/${dept_name}`)
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
          <tbody>
          <tr>
            <th>Course Name</th>
          </tr>
          {this.state.records.map((records, i) =>
              <tr key={i}>
                <td>{records.title} </td>
              </tr>
          )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default withRouter(Course);
