import React, { Component } from 'react'
// import { Box } from 'reactjs-admin-lte';
import Sidebar from "react-sidebar";
import CreditCardIcon from '@material-ui/icons/CreditCard';
import PagesIcon from '@material-ui/icons/Pages';
import PersonIcon from '@material-ui/icons/Person';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import Main from '../util/dashboard/Main';
import Donations from './Donations'
import {DashboardChart, SidebarTopContent, EmailConfirmationOverlay} from '../util/dashboard/utils';
import AppSettings from '../util/dashboard/Settings'
import {addDonation, addUser} from '../Actions';
import {connect} from 'react-redux';
import PledgesUnredeemed from './PledgesUnredeemed';
import VerifyCoporateUser from './VerifyCoporateUser';
import Pages from './Pages';
import {getUrl} from '../data/urlController';
import USER from '../data/userData';
import axios from 'axios';
import logoIcon from '../logo/logo.png';


const mapStateToProps = state =>{
    return {
        user:state.user
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        addDonation:donation=>dispatch(addDonation(donation)),
        addUser:user=>dispatch(addUser(user))
    }
}

const mql = window.matchMedia(`(min-width: 900px)`);

class Dashboard extends Component {
    constructor(props) {
        super(props);


        this.state = {
            sidebarDocked: mql.matches,
            sidebarOpen: false,
            mql:mql,
            chart:false,
            completed:100,
            settings:false,
            blockDashboard:false,
            contents:{
                main:true,
                donations:false,
                pages:false,
                users:false
            },
            user:{}
        };

        // if(this.props.user.email === undefined) {
        //     this.props.history.push('/login');
        //     return false;
        // }

        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    // componentWillMount() {
    //     mql.addListener(this.mediaQueryChanged);
    // }

    componentDidMount() {
        mql.addListener(this.mediaQueryChanged);
        this.getUser()


    }


componentWillUnmount() {
        this.state.mql.removeListener(this.mediaQueryChanged);
}

// findDonationsOrPledges=()=>{
//     const that = this;
//     const startAt = this.state.startDate.toISOString();
//     const endAt = this.state.endDate.toISOString();
//     const urlText =`get_${this.state.inOrOut}_${this.state.type}`
    
//     const url = getUrl(urlText);
//     const options = {
//         method: 'GET',
//         url: url,
//         headers: {
//             'Content-Type': 'application/json',
//             'x-access-token':  USER.getLocalStorageUserData().token,
//         },
//         params:{
//             startAt,
//             endAt
//         }
//     }

//     axios(options)
//         .then(this.handleDataSuccess)
//         .catch(function(err){
//             console.log(err);
//             that.setState({
//                 showLoading:false
//             })

//         })


// }

getUser = ()=>{
    const url = getUrl('users') + '/'+ USER.getLocalStorageUserData()._id;
        const options = {
        method: 'GET',
        url: url,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token':  USER.getLocalStorageUserData().token,
        }
    }
        axios(options)
            .then((response)=>{
                console.log(response.data)
            })
            .catch(function(err) {
                console.log(err)
            })
    }


sideBarMenu = ()=>{
    return (
    <div className="pl-2" >
        <div><br />
            <NavLink to='/show' >
                <img src={logoIcon} alt="" width="200" />
            </NavLink><br />
            <p className="pl-4">ID 113350 </p>
            <br />
            <div>
                <div>
                    <p className="color-green  o-sidebar-header">TRANSACTION</p>
                    <ul  className="o-nav-ul p-0">
                        <li onClick={()=>{this.handleView('main')}} className="cursor-pointer">
                            <CreditCardIcon />
                            <span className="small"> DONATIONS / PLEDGES</span>
                        </li><br />
                        <li onClick={()=>{this.handleView('pages')}}  className="color-white cursor-pointer o-letter-spacing">
                            <PagesIcon />
                            <span className="small"> PAGES</span>
                        </li>
                    </ul>
                </div>
                {/*end*/}
                <div>
                    <p className="color-green  o-sidebar-header">TOOLS</p>
                    <ul className="o-nav-ul p-0">
                        <li onClick={()=>{this.handleView('donations')}}  className="color-white cursor-pointer o-letter-spacing">
                            <BusinessCenterIcon />
                            <span className="small"> MANAGE ACTIONS</span>
                        </li>
                    </ul>
                </div>  
                <div>
                    <p className="color-green o-sidebar-header">GLOBAL ADMIN</p>
                    <ul className="o-nav-ul p-0">
                        <li onClick={()=>{this.handleView('users')}}  className="color-white cursor-pointer o-letter-spacing">
                            <PersonIcon />
                            <span className="small"> USERS</span>
                        </li>
                    </ul>
                </div>           
            </div>
        </div>
    </div>
)
}
handleView = (component)=>{
            this.setState({
            contents:{
                main:false,
                donations:false,
                pages:false,
                users:false,
                [component]:true
            }
        })
}


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
<div>
    {/*<div style={{background:"rgba(0,0,0,0.8)",width:"100%",height:"100%",position:"absolute",zIndex:"1222334444444"}}>
    </div>*/}
    {/*{!this.props.user.email_verified && <EmailConfirmationOverlay blockDashboard={this.state.blockDashboard} email={this.props.user.email} />}*/}
    {<EmailConfirmationOverlay blockDashboard={true} email={this.props.user.email} />}

    {/*<div style={{position:"absolute", zIndex:"109029800"}}><LinearProgress variant="determinate" value={this.state.completed} /></div>*/}
<LinearProgress variant="determinate" style={{height:"2px"}} value={this.state.completed} />

    <Sidebar
        sidebar={this.sideBarMenu()}
        open={this.state.sidebarOpen}
        docked={this.state.sidebarDocked}
        onSetOpen={this.onSetSidebarOpen}
        styles={{sidebar: { background:"#290c49", width: "220px", top: "0px", paddingLeft: "5px",color:"white",position:"absolute" },
        content:{background:"#f0f0f0",marginTop:"2px"}}}> 
        <br />

        <SidebarTopContent handleSidebar={this.handleSidebar} sidebarDocked={this.state.sidebarDocked}/>
        
        

           <Main  />

            
            <br /><br /><br />
            {/*<button onClick={
                (e)=>{e.preventDefault();this.props.addDonation({type:"addDonation", payload:{name:"e",amount:2} })}
            }>click me</button>{console.log(this.props)}*/}
            {/*{this.state.chart && <DashboardChart chartData={this.state.data} />}<br /><br />*/}

            {/*{this.settings && <div className="container"><AppSettings /></div>}*/}

            {/*<div className="container"><Donations /></div>*/}
            {/*<div  className="report-issue row" >
                <div  className="col cursor-pointer color-green border-right-white">report an issue</div>
                <div  className="col cursor-pointer color-green ">contact us</div>
            </div>*/}

            <div >
                <div className="p-2 bg-theme color-white cursor-pointer" style={{display:"inline", borderRight:"1px solid #555"}}>
                    report an issue
                </div>
                <div className="p-2 bg-theme color-white cursor-pointer" style={{display:"inline"}}>
                    contact us
                </div>
            </div>

    </Sidebar>

</div>
    
        )}
}



export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);