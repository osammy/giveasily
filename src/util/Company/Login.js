import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import axios from 'axios'
import {getUrl} from '../../data/urlController';
import {addUser} from '../../Actions';
import {connect} from 'react-redux';
import USER from '../../data/userData'
import { ToastContainer, toast } from 'mdbreact';
import ReactLoading from 'react-loading'


import LogoIcon1 from '../../logo/Logo1.png'
import '../../css/main.css'
import '../../css/login.css';

const mapDispatchToProps = dispatch =>{
    return {
        storeUser:user=> dispatch(addUser(user))
    }
}

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading:false
        }

        this.loginUser = this.loginUser.bind(this);
        this.addUserToRedux = this.addUserToRedux.bind(this)
    }


addUserToRedux({type,payload}){
    // alert(JSON.stringify(type))
    this.props.storeUser({type,payload});
    this.props.history.push('/dashboard/main')

}

notify(type,message){
  return () => {
    switch (type) {
      case 'info':
        toast.info(message, {
          autoClose: 10000
        });
        break;
      case 'success':
        toast.success(message, {
          position: "top-right",
        });
        break;
      case 'warning':
        toast.warn(message);
        break;
      case 'error':
        toast.error(message);
        break;
    }
  };
};

loginUser(e) {
        e.preventDefault();
                        this.setState({
                    loading:true
                })
        const that = this;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const url = getUrl('login');
        const body = {
            email,password
        }
        axios.post(url,body)
            .then(response =>{
                this.setState({
                    loading:false
                })

                const data = response.data;
                console.log(data)
                if(data.title === 'fail') {
                    this.notify('info',data.message)();
                    return
                }
                if(data.title === 'success') {
                const type = 'addUser';
                const payload = data;
                USER.setLocalStorageUserData(data)
                console.log(payload)
                this.addUserToRedux({type,payload})
                let nextView = (data.completed_registeration)? '/dashboard/main':'/registeration/coporate';
                this.props.history.replace(nextView);
                }


            })
            .catch(err => {
                this.setState({
                    loading:false
                })
                const status = err.response.status;

                if(status) {
                    switch(status){
                        case 401:
                        that.notify('error','You are not authenticated. Login to continue')();
                        break;

                        case 403:
                        that.notify('error','No auth token provided, Login to continue')();
                        break;

                        default:
                        that.notify('error',"Something went wrong")();
                    }
                }
            })

    }

    render(){
        const btnClass = this.state.loading?"display-inline":"dont-display"
       return (<div>
                        <div id="body">   
    
<div className="d-container">
    
    <div className="containme">
    
    
    
      <div className="wrapper">
    <div className="containme">
      <div className="myimage">
          
          <NavLink to="/"> <img src={LogoIcon1} width="50%" /></NavLink>
        
        </div>
      
        
        
    <div className="o-login-text pt-3 pb-0 mb-0" ><strong>Login</strong></div>
      
      <form onSubmit={this.loginUser}>
       <div className="signup-form">
         
          <input name="email" type="email" placeholder="Email" className="input" required/><br />
          <input name="password" type="password" placeholder="Password" className="input" required /><br />
          <button disabled={this.state.loading?true:false} id="input" type="submit">
              <ReactLoading className={btnClass} type="spokes"  height={'5%'} width={'5%'} />&nbsp;Login
          </button>
          <span><NavLink to="/login"> Forgot your password?</NavLink></span>
          <div className="account"><p>Already have account?<NavLink to="/register"> Get Started</NavLink></p></div>
           
       </div>
      
     
       
      </form>
    </div>
  </div>

    </div>
    
   </div>
    </div> 
      <React.Fragment>
        <ToastContainer
          hideProgressBar={true}
          newestOnTop={true}
          autoClose={5000}
        />
      </React.Fragment>
            </div>)
    }
}

export default connect(null,mapDispatchToProps)(Login);