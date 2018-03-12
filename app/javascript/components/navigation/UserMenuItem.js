import React, { Component } from 'react'
import { Item } from '../components/TopNavBar'
import Img from 'images/img.jpg'

class UserMenuItem extends Component {
  render() {
    return (
      <Item {...this.props}>
        <Item.Content className="user-profile">
          <img src={Img} alt=""/>John Doe
          <span className=" fa fa-angle-down"></span>
        </Item.Content>
        <Item.SubMenu className="dropdown-usermenu pull-right">
          <li><a href="#!"> Profile</a></li>
          <li>
            <a href="#!">
              <span className="badge bg-red pull-right">50%</span>
              <span>Settings</span>
            </a>
          </li>
          <li><a href="#!">Help</a></li>
          <li><a href="login.html"><i className="fa fa-sign-out pull-right"></i> Log Out</a></li>
        </Item.SubMenu>
      </Item>
    )
  }
}

export default UserMenuItem