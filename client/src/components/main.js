import React, { Component } from 'react';
import Topbar from './topbar';
import Footer from './footer';
import HighChart from './highchart';


// Load module after Highcharts is loaded
// require('highcharts/modules/exporting')(Highcharts);

var config = {
  chart: {
    type: 'column'
  },
  title: {
    text: 'World\'s largest cities per 2014'
  },
  subtitle: {
    text: 'Source: <a href="http://en.wikipedia.org/wiki/List_of_cities_proper_by_population">Wikipedia</a>'
  },
  xAxis: {
    type: 'category',
    labels: {
      rotation: -45,
      style: {
        fontSize: '13px',
        fontFamily: 'Verdana, sans-serif'
      }
    }
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Population (millions)'
    }
  },
  legend: {
    enabled: false
  },
  tooltip: {
    pointFormat: 'Population in 2008: <b>{point.y:.1f} millions</b>'
  },
  series: [{
    name: 'Population',
    data: [
      ['Shanghai', 23.7],
      ['Lagos', 16.1],
      ['Istanbul', 14.2],
      ['Karachi', 14.0],
      ['Mumbai', 12.5],
      ['Moscow', 12.1],
      ['São Paulo', 11.8],
      ['Beijing', 11.7],
      ['Guangzhou', 11.1],
      ['Delhi', 11.1],
      ['Shenzhen', 10.5],
      ['Seoul', 10.4],
      ['Jakarta', 10.0],
      ['Kinshasa', 9.3],
      ['Tianjin', 9.3],
      ['Tokyo', 9.0],
      ['Cairo', 8.9],
      ['Dhaka', 8.9],
      ['Mexico City', 8.9],
      ['Lima', 8.9]
    ]
  }]
};

class Main extends React.Component {

  render() {
    return(
      <div className="page-container">
        <Topbar />

        <main className='main-content bgc-grey-100'>
          <div id='mainContent'>
            <HighChart container="test" config={config} />
          </div>
        </main>

        <Footer />
      </div>
    )
  }
}

export default Main;
