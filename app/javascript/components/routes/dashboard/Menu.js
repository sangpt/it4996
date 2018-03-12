import React from 'react'
import { GroupMenuItem, MenuItem } from '../../components/SideBar'

const Menu = (
  <GroupMenuItem title="Dashboard" icon="home" to="/home">
    <MenuItem title="Dashboard" to="/dashboard" />
  </GroupMenuItem>
)

export default Menu
