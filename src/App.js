import React from "react";
import Papa from "papaparse";
import HomeScreen from "./Components/HomeScreen";
import QuestionScreen from "./Components/QuestionScreen";
import FinalScreen from "./Components/FinalScreen";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      stage: 1,
      locationAvailable: false,
      searchRadius: 4,
      meal: "",
      type: "",
      area: "",
    };
  }

  componentDidMount() {
    this.getCsvData();
    if ("geolocation" in navigator) {
      this.setState({
        locationAvailable: true,
      });
    }
  }

  getCsvData = () => {
    fetch(
      "https://docs.google.com/spreadsheets/d/1lr6rakViESEyL92WLERkX7ZY3lRuKr5O8UG5B7LlIq4/export?format=csv"
    ).then((rawOutput) => {
      rawOutput.text().then((finalOutput) => {
        const outputData = Papa.parse(finalOutput, {
          header: true,
          skipEmptyLines: true,
        });
        this.setState({
          data: outputData.data,
        });
      });
    });
  };

  handleNext = () => {
    this.setState({
      stage: this.state.stage + 1,
    });
  };

  handleRestart = () => {
    this.setState({
      stage: 1,
      meal: "",
      type: "",
      area: "",
    });
  };

  handleUpdate = async (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { stage, data, locationAvailable, searchRadius, meal, type, area } =
      this.state;
    let currentStage;
    if (stage === 1) {
      currentStage = (
        <HomeScreen data={this.state.data} handleNext={this.handleNext} />
      );
    } else if (stage === 2) {
      currentStage = (
        <QuestionScreen
          locationAvailable={locationAvailable}
          searchRadius={searchRadius}
          handleUpdate={this.handleUpdate}
          handleRestart={this.handleRestart}
          handleNext={this.handleNext}
        />
      );
    } else if (stage === 3) {
      currentStage = (
        <FinalScreen
          searchRadius={searchRadius}
          data={data}
          meal={meal}
          type={type}
          area={area}
          handleRestart={this.handleRestart}
        />
      );
    }

    return <div className="container">{currentStage}</div>;
  }
}

export default App;
