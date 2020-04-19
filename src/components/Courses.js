import React, { Component } from "react";

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
    };
  }

  componentDidMount() {
    fetch("/courses", {
      headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` },
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Network Response was not ok");
      })
      .then((response) => {
        this.setState({ courses: response.courses });
      })
      .catch((err) => {
        this.setState({ message: err.message });
      });
  }

  render() {
    return (
      <ul>
        {this.state.courses.map((course) => {
          return <li key={course.id}>{course.title}</li>;
        })}
      </ul>
    );
  }
}

export default Courses;
