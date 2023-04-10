import React from "react";
import { motion } from "framer-motion";

export default class QuestionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: 1,
      locationButton: true,
      buttonText: "Current Location",
    };
  }
  handleClick = (e) => {
    const { name, value } = e.target;
    this.props.handleUpdate(name, value);
    if (this.state.question < 4) {
      this.setState({
        question: this.state.question + 1,
      });
    } else {
      this.setState({
        question: 1,
      });
      this.props.handleNext();
    }
  };

  handleSkip = () => {
    this.setState({
      question: this.state.question + 1,
    });
  };

  handleLocation = async () => {
    await this.setState({
      searchRadius: "",
      buttonText: "Getting location...",
    });
    await navigator.geolocation.getCurrentPosition(
      (position) => {
        this.props.handleUpdate("area", {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        this.setState({
          question: this.state.question + 1,
        });
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          alert("Can't find your location!");
          this.setState({
            locationButton: false,
          });
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: Infinity,
      }
    );
  };

  render() {
    const { question } = this.state;
    let displayQuestion;
    if (question === 1) {
      displayQuestion = (
        <div className="question-box">
          <h2>Which?</h2>
          <div className="question-options">
            <button onClick={this.handleClick} name="meal" value="Breakfast">
              Breakfast
            </button>
            <button onClick={this.handleClick} name="meal" value="Brunch">
              Brunch
            </button>
            <button onClick={this.handleClick} name="meal" value="Lunch">
              Lunch
            </button>
            <button onClick={this.handleClick} name="meal" value="Dinner">
              Dinner
            </button>
            <button onClick={this.handleClick} name="meal" value="Dessert">
              Dessert
            </button>
          </div>
        </div>
      );
    } else if (question === 2) {
      displayQuestion = (
        <div className="question-box">
          <h2>What?</h2>
          <div className="question-options">
            <button onClick={this.handleClick} name="type" value="H">
              Hawker
            </button>
            <button onClick={this.handleClick} name="type" value="C">
              Casual Dining
            </button>
            <button onClick={this.handleClick} name="type" value="R">
              $$$ Dining
            </button>
          </div>
        </div>
      );
    } else if (question === 3) {
      displayQuestion = (
        <div className="question-box">
          <h2>Where?</h2>
          <div className="question-options">
            <button onClick={this.handleClick} name="area" value="NT">
              North
            </button>
            <button onClick={this.handleClick} name="area" value="NE">
              Northeast
            </button>
            <button onClick={this.handleClick} name="area" value="CN">
              Central
            </button>
            <button onClick={this.handleClick} name="area" value="WT">
              West
            </button>
            <button onClick={this.handleClick} name="area" value="ET">
              East
            </button>
          </div>
          {this.props.locationAvailable && this.state.locationButton ? (
            <button id="get-location" onClick={this.handleLocation}>
              <img src="./icons/location.svg" alt="location icon" />
              {this.state.buttonText}
            </button>
          ) : (
            <div></div>
          )}
        </div>
      );
    } else if (question === 4) {
      displayQuestion = (
        <div className="question-box">
          <h2>Tap here</h2>
          <button id="logo-button" onClick={this.handleClick}>
            <img src="./logos/icon-white.svg" alt="logo" />
          </button>
          <h2>
            to get
            <br />
            your rec!
          </h2>
        </div>
      );
    }
    return (
      <div className="screen" id="question">
        <div className="header">
          <img src="./logos/logo-white-wide.svg" alt="logo" />
        </div>
        {displayQuestion}
        <div className="footer">
          <button onClick={this.props.handleRestart}>Restart</button>
          {question !== 4 && <button onClick={this.handleSkip}>Skip</button>}
        </div>
      </div>
    );
  }
}
