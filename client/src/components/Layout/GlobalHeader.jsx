import React, { PureComponent } from 'react';
import { Menu, Icon, Spin, Tag, Dropdown, Avatar, Divider, Tooltip, Input } from 'antd';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
// import groupBy from 'lodash/groupBy';
// import Debounce from 'lodash-decorators/debounce';
import { Link } from 'dva/router';
import styles from './GlobalHeader.less';
import logo from '../../../public/images/vbee-logo.png';

const Search = Input.Search;

class GlobalHeader extends PureComponent {
  componentWillUnmount() {
    // this.triggerResizeEvent.cancel();
  }
  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    // this.triggerResizeEvent();
  };
  /* eslint-disable*/
  // @Debounce(600)
  // triggerResizeEvent() {
  //   const event = document.createEvent('HTMLEvents');
  //   event.initEvent('resize', true, false);
  //   window.dispatchEvent(event);
  // }
  handleSearch = (value) => {
    this.props.history.push({
      pathname: '/search',
      search: `?q=${value}`,
      state: {q: value}
    });
  }

  render() {
    // const {
    //   currentUser,
    //   collapsed,
    //   fetchingNotices,
    //   isMobile,
    //   logo,
    //   onNoticeVisibleChange,
    //   onMenuClick,
    //   onNoticeClear,
    // } = this.props;
    // console.log(history.location);
    const {
      collapsed,
      onCollapse
    } = this.props;
    const currentUser = {
      name: 'Sang Pham'
    }
    const menu = (
      <Menu className="menu">
        <Menu.Item>
          <Icon type="setting" />Setting
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <a href="javascript:void(0)" onClick={this.props.handleLogout}><Icon type="logout" />Logout</a>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="header">
        <Icon
          className="trigger"
          onClick={this.toggle}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
        />
        <div className="right">
          <Search
            placeholder="Input search text"
            onSearch={this.handleSearch}
            style={{ width: 200 }}
            defaultValue={new URLSearchParams(this.props.location.search).get('q')}
          />
          <Dropdown overlay={menu}>
            <span className="action account">
              <Avatar size="small" className="avatar" src={logo} />
              <span className="name">{currentUser.name}</span>
            </span>
          </Dropdown>
        </div>
      </div>
    );
  }
}

export default withRouter(GlobalHeader);