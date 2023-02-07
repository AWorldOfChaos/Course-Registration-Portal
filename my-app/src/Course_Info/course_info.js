import './course_info.css';
import { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

class Course_Info extends Component{
  constructor(props) {
    super(props);
    this.state = { title : "", course_id : "", credits : "", building : "", room_number : "", instructor_name : "", instructor_ID : "", prereq : [] };
  }

  callAPI() {
    const course_id = this.props.match.params.course_id;
    fetch(`http://localhost:8080/course/${course_id}`)
    .then(res => res.json())
    .then(res => {
      // console.log(res.prereq);
      this.setState({
          title: res.course[0].title,
          course_id: res.course[0].course_id,
          credits: res.course[0].credits,
          building: res.course[0].building,
          room_number: res.course[0].room_number,
          instructor_name: res.instructor[0].name,
          instructor_ID: res.instructor[0].id
      });
      if(res.prereq.length!=0){
        console.log("PREREQS PRESENT");
        var prereqs = res.prereq.map((records, i) =>
        <tr key={i}>
          <td> <Link to={'/course/' + records.course_id} >{records.title}</Link></td>
          <td> {records.course_id} </td>
        </tr>);
        this.setState({
          prereq: <table border='1' frame='box' rules='all'>
          <tbody>
          <tr>
            <th>Instructor Name</th>
            <th>Instructor ID</th>
          </tr>
          {prereqs}
          </tbody>
        </table>
        });
      }
      else{
        console.log("NO PREREQS");
        this.setState({
          prereq: <h3> No Prerequisites for this course </h3>
        });
      }
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
      <div className="Course_Info">
        <h1> Welcome to {this.state.title}</h1>
        <h2> Course Details </h2>
        <table border='1' frame='box' rules='all'>
          <tbody>
          <tr>
            <th>Course Name</th>
            <th>Course ID</th>
            <th>Venue</th>
            <th>Credits</th>
          </tr>
          <tr>
            <td> {this.state.title} </td>
            <td> {this.state.course_id} </td>
            <td> Room {this.state.room_number}, {this.state.building} building </td>
            <td> {this.state.credits} </td>
          </tr>
          </tbody>
        </table>
        <h2> Instructor Details </h2>
        <table border='1' frame='box' rules='all'>
          <tbody>
          <tr>
            <th>Instructor Name</th>
            <th>Instructor ID</th>
          </tr>
          <tr>
            <td> {this.state.instructor_name} </td>
            <td> {this.state.instructor_ID} </td>
          </tr>
          </tbody>
        </table>
        <h2> Prerequisites </h2>
        {this.state.prereq}
      </div>
    );
  }
}

export default withRouter(Course_Info);
