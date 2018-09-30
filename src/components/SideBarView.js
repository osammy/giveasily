import React, {Component} from 'react';
import Sidebar from 'react-sidebar'
import {ContentView} from '../util/dashboard/MainContent'
import {SideBarMenu, SidebarTopContent,EmailConfirmationOverlay} from '../util/dashboard/utils';
import USER from '../data/userData'
const mql = window.matchMedia(`(min-width: 900px)`);


class SideBarView extends Component {

constructor(props) {
  super(props);

try {
    const userData = USER.getLocalStorageUserData();
    var email = userData.email;
    var blockDashboard = !userData.email_verified;
} catch(e){
this.props.history.replace('/login')
console.log(e)
}

console.log(blockDashboard)
          this.state = {
            sidebarDocked: mql.matches,
            sidebarOpen: false,
            mql,
            email,
            blockDashboard
        };

  this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
  this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
}

componentDidMount(){
          mql.addListener(this.mediaQueryChanged);

}

componentWillUnmount() {
        this.state.mql.removeListener(this.mediaQueryChanged);
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
    render(){
        return (     
        <div>
            <EmailConfirmationOverlay blockDashboard={this.state.blockDashboard} email={this.state.email} />

        <Sidebar
          sidebar={<SideBarMenu />}
          open={this.state.sidebarOpen}
          docked={this.state.sidebarDocked}
          onSetOpen={this.onSetSidebarOpen}
          styles={{sidebar: { background:"#290c49", width: "220px", top: "0px", paddingLeft: "5px",color:"white",position:"absolute" },
          content:{background:"#f0f0f0",marginTop:"2px"}}}> 
          <SidebarTopContent handleSidebar={this.handleSidebar} sidebarDocked={this.state.sidebarDocked}/>
        
            <ContentView />
         </Sidebar>
         </div>)
    }
}

export default SideBarView;