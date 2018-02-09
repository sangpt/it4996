import React, { Component } from 'react';
var Highcharts = require('highcharts');

class HighChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {container: Math.random().toString(36)};
  }

  componentDidMount() {
    Highcharts.chart(this.state.container, this.props.config);
  }

  render() {
    return (
      <div id={this.state.container} />
    )
  }
}

export default HighChart;
