import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// import {EmailConfirmationOverlay} from './util/dashboard/utils';
import PledgesUnredeemed from './components/PledgesUnredeemed';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Sidebar from 'react-sidebar';

import {ContentView, SideBarRouterViews} from './util/dashboard/MainContent';

import CreditCardIcon from '@material-ui/icons/CreditCard';
import PagesIcon from '@material-ui/icons/Pages';
import PersonIcon from '@material-ui/icons/Person';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import {SideBarMenu} from './util/dashboard/utils';
import {SidebarTopContent} from './util/dashboard/utils';
import SideBarView from './components/SideBarView'
// import logoIcon from '../logo/logo.png';

import Login from "./components/Login"
const mql = window.matchMedia(`(min-width: 900px)`);


class App extends Component {



    handleSidebar = ()=>{
        this.setState({
            sidebarOpen:!this.state.sidebarOpen
        })
    }

    onSetSidebarOpen(open) {
        console.log(open);
        // if(typeof open === 'Boolean') return;
        this.setState({ sidebarOpen: open });
    }

    mediaQueryChanged() {
        this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
    }
  

  render() {
    return (
    <BrowserRouter>
        <SideBarRouterViews />
    </BrowserRouter>
    );
  }
}

export default App;
