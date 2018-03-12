import React from 'react';
import PageContent from './PageContent';
import SideBar from '../components/SideBar';
import { HomeMenu } from './home';
import { FormsMenu } from './forms';
import { ExtrasMenu } from './extras';
import { DashboardMenu } from './dashboard';

export const Menu = (
  <SideBar>
    <SideBar.MenuSection title="General">
      { DashboardMenu }
      { HomeMenu }
      { FormsMenu }
      { ExtrasMenu }
    </SideBar.MenuSection>
  </SideBar>
);

export default PageContent
