import React from "react";

export default class ChartContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidUpdate() {
    if (this.state.chartData) {
      Highcharts.chart('chart_requests', this.state.chartData);
    }
  }

  render() {
    return (
      <Tabs defaultActiveKey="1" tabBarExtraContent={rangePicker} >
        <TabPane tab="Chart" key="1" >
          { !this.state.chartData ? spin :
            <Row>
              <Col span={18}>
                <div id="chart_requests"></div>
              </Col>
              <Col span={6}>
                <div className="salesRank">
                  <h4 className="rankingTitle">Top usage app</h4>
                  <ul className="rankingList">
                    {
                      this.state.topApp.map((item, i) => {
                        return (
                          <li key={i}>
                            <span className={i < 3 ? 'active' : ''}>{i + 1}</span>
                            <span>{item.app_name}</span>
                            <span>{item.count}</span>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
              </Col>
            </Row>
          }
        </TabPane>
      </Tabs>
    )
  }
}