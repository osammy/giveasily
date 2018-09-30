import React, { Component } from 'react';
import axios from 'axios';
import {getUrl} from '../../data/urlController';
import {addUser} from '../../Actions';
import {connect} from 'react-redux';
import { ToastContainer, toast } from 'mdbreact';
import {NavLink, Redirect} from 'react-router-dom'
import ReactLoading from 'react-loading'
import USER from '../../data/userData'

import '../../css/main.css'
import '../../css/register.css';

import LogoIcon1 from '../../logo/Logo1.png'

const mapDispatchToProps = dispatch =>{
    return {
        storeUser:user=> dispatch(addUser(user))
    }
}

class Register extends Component {


constructor(props) {
    super(props)

    this.state = {
        highlightP: true,
        showPersonal:false,
        showSignup:true,
        category:"coporate",
        loading:false
    }
}



pTabClick = ()=>{

this.setState({
    showSignup:false,
    showPersonal:true

})

}

cTabClick = ()=>{

this.setState({
    showSignup:true,
    showPersonal:false

})

}




  handleChange = event => {
    this.setState({ category: event.target.value });
    this.category = event.target.value
  };

  addUserToRedux({type,payload}){
    this.props.storeUser({type,payload});
    //this.props.history.push('/dashboard/main')

}

  registerUser = (e)=> {
      e.preventDefault();
      this.setState({
          loading:true
      })
      const confirm_password =  e.target.confirm_password.value;
      const password = e.target.password.value;

      if(password !== confirm_password) return this.notify('info','make sure your passwords match')()
          
      
      

      const email = e.target.email.value;
      const category = this.state.showPerson?"personal":"coporate";


      const body = {
          email,category,password
      }

    if(this.state.showPerson){
            body.first_name = e.target.firstname.value;
            body.last_name = e.target.lastname.value
      }

      const url = getUrl('registeration');

      axios.post(url,body)
        .then((response)=>{
            this.setState({
                loading:false
            })
            const data = response.data
            if(data.title === 'success') {
                const type = 'addUser';
                // this.notify('success','Registeration Succesful')()
                USER.setLocalStorageUserData(data)
                this.addUserToRedux({type,data});
                this.props.history.push('/dashboard/main');
            }
    
        })
        .catch((err)=>{
            this.setState({
                loading:false
            })
            const status = err.response.status;
                console.log(err.response);
                                console.log(status);
                if(status) {
                    switch(status){
                        case 401:
                        this.notify('error','You are not authenticated. Login to continue')();
                        break;

                        case 403:
                        this.notify('error','No auth token provided, Login to continue')();
                        break;

                        default:
                        this.notify('error',"Something went wrong")();
                    }
                }
          
        })
  }

    notify(type,message){
        // console.log("called notify")
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

    render() {
const btnClass = this.state.loading?"display-inline":"dont-display";
const inputClass = (this.state.showPersonal) ?  "blockade input":"dont-display"


        return (
<div id="body"> 
    {/*<Redirect to='/login'  />      */}
<div className="d-container">
    
    <div  className="containall">
    
    
    
      <div className="wrapper">
    <div  className="registerme ">
      <div   className="myimage ">
          
          <NavLink to="/"><img src={LogoIcon1} width="50%" /></NavLink>
        
        </div>
      
        
        <div  className="containtext">
          <h1>Get started</h1>
        <p>Few seconds away to your first financial pledge</p>
          </div>
    <div onClick={this.cTabClick} style={{background:(this.state.showPersonal)?"#e9eaea":"#fff"}} className="signup o-signup">Corporate</div>
      <div onClick={this.pTabClick} style={{background:(!this.state.showPersonal)?"#e9eaea":"#fff"}} className="login o-login">Personal</div>
      <form onSubmit={this.registerUser}>
       <div style={{display:(this.state.showSignup)?"blockade":"dont-display"}} className="signup-form">
          {/*<input style={{display:(this.state.showPersonal) ? "none":"block" }} type="text" placeholder="Organization ( i.e Name of Church e.t.c )" className="input" required />*/}
          <input name="firstname" required={this.state.showPersonal} type="text" placeholder="First Name" className={inputClass} />
           <input name="lastname" required={this.state.showPersonal} type="text" placeholder="Last Name" className={inputClass} />
          <input name="email" required type="email" placeholder="Email" className="input" required />
          <input type="password" required placeholder="Password" className="input" name="password" />
          <input type="password" required placeholder="Confirm Password" className="input" name="confirm_password" />
          <button disabled={this.state.loading?true:false} id="input" type="submit">
              <ReactLoading className={btnClass} type="spokes"  height={'5%'} width={'5%'} />&nbsp;Get Started
          </button>
           <span>By clicking "Get Started" I agree to Giveasily<a href="#"> Terms and Conditions.</a></span>
           <div className="account"><p>Already have account?<a href="login.html"> Login</a></p></div> 
       </div>
      </form>
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
    </div> 
        )
    }
}

export default connect(null,mapDispatchToProps)(Register);