import React, {Component} from 'react';

class NavItem extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <li className={"nav-item " + this.props.isActive} key={this.props.title}>
        <a className={'sidebar-link ' + this.props.isActive} href={this.props.href || "#"}>
          <span className="icon-holder">
            <i className={this.props.icon}></i>
          </span>
          <span className="title">{this.props.title}</span>
        </a>
      </li>
    )
  }
}

export default NavItem;
