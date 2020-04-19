import React, { Component } from "react";

class Public extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
  }

  componentDidMount() {
    fetch("/public")
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Network Response was not ok");
      })
      .then((response) => {
        this.setState({ message: response.message });
      })
      .catch((err) => {
        this.setState({ message: err.message });
      });
  }

  render() {
    return <p>{this.state.message}</p>;
  }
}

export default Public;
