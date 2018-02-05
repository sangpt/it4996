import React, { Component } from 'react';
var Highcharts = require('highcharts');

class HighChart extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Highcharts.chart(this.props.container, this.props.config);
  }

  render() {
    return (
      <div id={this.props.container} />
    )
  }
}

export default HighChart;
