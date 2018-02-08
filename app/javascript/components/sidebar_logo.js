import React, {Component} from 'react';

class SidebarLogo extends React.Component {
  render() {
    return (
      <div className="sidebar-logo">
        <div className="peers ai-c fxw-nw">
          <div className="peer peer-greed">
            <a className='sidebar-link td-n' href="/" className="td-n">
              <div className="peers ai-c fxw-nw">
                <div className="peer">
                  <div className="logo">
                    <img src="assets/static/images/logo.png" alt="" />
                  </div>
                </div>
                <div className="peer peer-greed">
                  <h5 className="lh-1 mB-0 logo-text">Adminator</h5>
                </div>
              </div>
            </a>
          </div>
          <div className="peer">
            <div className="mobile-toggle sidebar-toggle">
              <a href="" className="td-n">
                <i className="ti-arrow-circle-left"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SidebarLogo;
