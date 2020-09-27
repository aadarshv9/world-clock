import React from "react";

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customTime: "23:59:58",
      unitedStatesTime: "23:59:58",
      londonTime: "13:59:58",
      indiaTime: "17:59:58",
      timeDiffLondon: -10,
      timeDiffIndia: -6,
      timeIntervalId: null,
    };
  }

  componentDidMount = () => {
    this.startTimer();
  };

  startTimer = () => {
    let id = setInterval(() => {
      this.setState({
        unitedStatesTime: this.updateTime(this.state.unitedStatesTime),
        londonTime: this.updateTime(this.state.londonTime),
        indiaTime: this.updateTime(this.state.indiaTime),
      });
    }, 5000);

    this.setState({
      timeIntervalId: id,
    });
  };

  handleInputChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  isTimeValid = (time) => {
    let timeSplit = time.split(":");
    if (timeSplit.length === 3) {
      let hour = Number(timeSplit[0]);
      let min = Number(timeSplit[1]);
      let sec = Number(timeSplit[2]);
      if (
        hour >= 0 &&
        hour < 24 &&
        min >= 0 &&
        min < 60 &&
        sec >= 0 &&
        sec < 60
      ) {
        console.log("TRUE");
        return true;
      }
    }
    return false;
  };

  updateTime = (countryTime) => {
    let countrySplitTime = countryTime.split(":");
    let addMinute = 0;
    let addHour = 0;
    let addSec = 5;
    if (countrySplitTime[2] > 54) {
      addMinute = 1;
    }
    if (countrySplitTime[1] === "59") {
      addHour = 1;
    }
    countrySplitTime[2] = (Number(countrySplitTime[2]) + addSec) % 60;
    countrySplitTime[1] = (Number(countrySplitTime[1]) + addMinute) % 60;
    countrySplitTime[0] = (Number(countrySplitTime[0]) + addHour) % 24;
    return countrySplitTime.join(":");
  };

  getNewTime = (customTime, timeDiff, countryTime) => {
    let countrySplitTime = countryTime.split(":");
    let customSplitTime = customTime.split(":");
    if (timeDiff >= 0) {
      countrySplitTime[0] = (Number(customSplitTime[0]) + timeDiff) % 24;
    } else {
      countrySplitTime[0] = (Number(customSplitTime[0]) + timeDiff + 24) % 24;
    }
    countrySplitTime[1] = Number(customSplitTime[1]);
    countrySplitTime[2] = Number(customSplitTime[2]);
    return countrySplitTime.join(":");
  };

  onSubmitCustomTime = () => {
    const {
      customTime,
      londonTime,
      indiaTime,
      unitedStatesTime,
      timeIntervalId,
      timeDiffLondon,
      timeDiffIndia,
    } = this.state;

    if (
      this.isTimeValid(customTime) &&
      this.isTimeValid(londonTime) &&
      this.isTimeValid(indiaTime) &&
      this.isTimeValid(unitedStatesTime) &&
      Number.isInteger(timeDiffIndia) &&
      Number.isInteger(timeDiffLondon)
    ) {
      clearInterval(timeIntervalId);
      this.setState({
        unitedStatesTime: customTime,
        londonTime: this.getNewTime(customTime, timeDiffLondon, londonTime),
        indiaTime: this.getNewTime(customTime, timeDiffIndia, indiaTime),
      });
      this.startTimer();
    }
  };

  onSubmitTimeDiff = (countryTime, countryTimeDiff, country) => {
    const { unitedStatesTime, timeIntervalId } = this.state;
    if (
      Number.isInteger(countryTimeDiff) &&
      this.isTimeValid(countryTime) &&
      this.isTimeValid(unitedStatesTime)
    ) {
      console.log("in submitTimeDiff", countryTime, countryTimeDiff, country);
      this.setState({
        [country]: this.getNewTime(
          unitedStatesTime,
          countryTimeDiff,
          countryTime
        ),
      });

      console.log("TIME", country, this.state[country]);
      clearInterval(timeIntervalId);
      this.startTimer();
    }
  };

  render() {
    const {
      londonTime,
      indiaTime,
      unitedStatesTime,
      timeDiffIndia,
      timeDiffLondon,
      customTime,
    } = this.state;
    return (
      <div className="view">
        <div className="upper-part">
          <div className="set-custom-time row">
            <div className="col-md-6 col-sm-12">
              <div className="row justify-content-around">
                <span className="col-md-5 col-sm-5">
                  Set United State time:
                </span>
                <input
                  className="col-md-3 col-sm-3"
                  type="text"
                  placeholder="16:26:11"
                  value={customTime}
                  onChange={(e) =>
                    this.handleInputChange("customTime", e.target.value)
                  }
                ></input>
                <button
                  className="col-md-3 col-sm-2"
                  onClick={this.onSubmitCustomTime}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>

          <div className="show-time row">
            <div className="col-md-5 col-sm-12">
              <span className="row justify-content-around">
                <div className="col-md-5 col-sm-5">United State:</div>
                <span className="col-md-5 col-sm-5">{unitedStatesTime}</span>
              </span>
            </div>
            <div className="col-md-3 col-sm-5">
              <span className="row">
                <div className="col-md-5 col-sm-6">London:</div>
                <span className="col-md-5 col-sm-6">{londonTime}</span>
              </span>
            </div>
            <div className="col-md-3 col-sm-5">
              <span className="row">
                <div className="col-md-5 col-sm-5">India:</div>
                <span className="col-md-5 col-sm-5">{indiaTime}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="setting row">
          <div className="difference col-md-6 col-sm-12">
            <div className="row justify-content-around">
              <span className="col-md-6 col-sm-6">
                Time difference for London:
              </span>
              <input
                className="col-md-2 col-sm-2"
                type="number"
                placeholder="-10"
                value={timeDiffLondon}
                onChange={(e) =>
                  this.handleInputChange(
                    "timeDiffLondon",
                    Number(e.target.value)
                  )
                }
              ></input>
              <button
                className="col-md-3 col-sm-2"
                onClick={() => {
                  this.onSubmitTimeDiff(
                    londonTime,
                    timeDiffLondon,
                    "londonTime"
                  );
                }}
              >
                Submit
              </button>
            </div>
          </div>
          <div className="difference col-md-6 col-sm-12">
            <div className="row justify-content-around align-content-around">
              <span className="col-md-6 col-sm-6">
                Time difference for India:
              </span>
              <input
                className="col-md-2 col-sm-2"
                type="number"
                placeholder="-6"
                value={timeDiffIndia}
                onChange={(e) =>
                  this.handleInputChange(
                    "timeDiffIndia",
                    Number(e.target.value)
                  )
                }
              ></input>
              <button
                className="col-md-3 col-sm-2"
                onClick={() => {
                  this.onSubmitTimeDiff(indiaTime, timeDiffIndia, "indiaTime");
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default View;
