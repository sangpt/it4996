import React from 'react'
import { Route } from 'react-router'
import Dashboard from './dashboard-1/Dashboard'
import DashboardMenu from './Menu'

export default <Route path="/dashboard" component={Dashboard} />
export { DashboardMenu }
