import React from 'react'
import Pages from '../../components/Pages';
import ViewPage from '../../components/ViewPage';
import FundingSources from '../../components/FundingSources';
import Main from '../../util/dashboard/Main';
import Donations from '../../components/Donations';
import Dashboard from '../../components/Dashboard';
import Register from '../../components/Register';
import Login from '../../components/Login'
import GlobalAdmin from '../../components/GlobalAdmin';
import CoporateRegisteration from '../../components/Coporate_Registeration';
import {Switch, Route, NavLink } from 'react-router-dom';
import VerifyCoporateUser from '../../components/VerifyCoporateUser';
import SideBarView from '../../components/SideBarView';
import {IndexPage} from '../Company/Index';
import {Company} from '../Company/Company';
import Pricing from '../Company/Pricing';
import LoginNew from '../Company/Login';
import RegisterNew from '../Company/Register'
export const ContentView = ()=>{

    return (
        <Switch>
            <Route exact path="dashboard/first" component={Dashboard} />
            <Route exact path="/dashboard/main" component={Main} />
            <Route path="/register" component={Register} />
            <Route  path="/login" component={Login} />
            <Route  path="/dashboard/donations" component={Donations} />
            <Route path="/dashboard/users" component={VerifyCoporateUser} />
            <Route exact  path="/dashboard/pages" component={Pages} />
            <Route path='/dashboard/pages/:id/:slug' component={ViewPage} />
            <Route path='/dashboard/funding' component={FundingSources} />
        </Switch>
    )
}

export const SideBarRouterViews = ()=>{

    return (
        <Switch>

            <Route exact path="/" component={IndexPage} />
            <Route exact path="/company" component={Company} />
            <Route exact path="/pricing" component={Pricing} />
            <Route path="/registeration/coporate" component={CoporateRegisteration} />
            {/*<Route exact path="/login_old" component={Login} />*/}
            <Route exact path="/login" component={LoginNew} />
            {/*<Route  path="/register_old" component={Register} />*/}
            <Route  path="/register" component={RegisterNew} />
            <Route  
            path="/(dashboard/main|dashboard/users|dashboard/donations|dashboard/pages|dashboard/pages/:id/:slug|dashboard/funding|dashboard/first)/" 
            component={SideBarView} />
        </Switch>
    )
}