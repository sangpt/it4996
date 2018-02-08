import React, { Component } from 'react';
import NavItem from './nav_item';
import SidebarLogo from './sidebar_logo';

const props = {
  dashboard: {
    isActive: "active",
    title: "Dashboard",
    icon: "c-blue-500 ti-home",
    className: "nav-item mT-30 active"
  },
  email: {
    isActive: false,
    title: "Email",
    icon: "c-blue-500 ti-email",
    href: "email.html",
    className: "nav-item"
  },
}

class Sidebar extends React.Component {
  render() {
    return(
      <div className="sidebar">
        <div className="sidebar-inner">
          <SidebarLogo />

          <ul className="sidebar-menu scrollable pos-r">
            <NavItem {...props.dashboard} />
            <NavItem {...props.email} />

            <li className="nav-item">
              <a className='sidebar-link' href="compose.html">
                <span className="icon-holder">
                  <i className="c-blue-500 ti-share"></i>
                </span>
                <span className="title">Compose</span>
              </a>
            </li>
            <li className="nav-item">
              <a className='sidebar-link' href="calendar.html">
                <span className="icon-holder">
                  <i className="c-deep-orange-500 ti-calendar"></i>
                </span>
                <span className="title">Calendar</span>
              </a>
            </li>
            <li className="nav-item">
              <a className='sidebar-link' href="chat.html">
                <span className="icon-holder">
                  <i className="c-deep-purple-500 ti-comment-alt"></i>
                </span>
                <span className="title">Chat</span>
              </a>
            </li>
            <li className="nav-item">
              <a className='sidebar-link' href="charts.html">
                <span className="icon-holder">
                  <i className="c-indigo-500 ti-bar-chart"></i>
                </span>
                <span className="title">Charts</span>
              </a>
            </li>
            <li className="nav-item">
              <a className='sidebar-link' href="forms.html">
                <span className="icon-holder">
                  <i className="c-light-blue-500 ti-pencil"></i>
                </span>
                <span className="title">Forms</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Sidebar;
