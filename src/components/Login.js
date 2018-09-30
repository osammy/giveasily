import React, { Component } from 'react';
import { Container, Row, Col, Input, Button, Fa, Card, CardBody, ModalFooter, ToastContainer, toast } from 'mdbreact';
import {NavLink} from 'react-router-dom'
import axios from 'axios'
import {getUrl} from '../data/urlController';
import {addUser} from '../Actions';
import {connect} from 'react-redux';
import USER from '../data/userData'
import logoIcon from '../logo/logo.png'



const mapDispatchToProps = dispatch =>{
    return {
        storeUser:user=> dispatch(addUser(user))
    }
}

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {

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
        const that = this;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const url = getUrl('login');
        const body = {
            email,password
        }
        axios.post(url,body)
            .then(function(response){
                const data = response.data;
                if(data.title === 'success') {
                const type = 'addUser';
                const payload = data;
                USER.setLocalStorageUserData(data)
                console.log(payload)
                that.addUserToRedux({type,payload})
                let nextView = (data.completed_registeration)? '/dashboard/main':'/dashboard/registeration/coporate';
                that.props.history.push(nextView);
             

            }
            
            console.log(response.data)

            })
            .catch(err => {
                console.log(err.response);
                let response = err.response;
                if(response.status === 401) {
                    
                    const statusText = response.statusText;
                    const errBody = response.data.err.message;
                    const message = `${statusText}: ${errBody} `
                    this.notify('error',message)()
                }
                for (let i in err) {
                    console.log(i)
                }
            })

    }

    render() {
        return (
            <div className="bg-theme" >
                <div className="text-center ">
                    <NavLink  to="https://giveasily.ng/" className="logo">
                        <img src={logoIcon} height="150" />
                    </NavLink>
                </div>
              <Card className="login-card">
                <CardBody  className="mx-4">
                  <div className="text-center">
                    <h5 className="color-theme "><strong>SIGN IN</strong></h5>
                  </div><br />
                  <form onSubmit={this.loginUser}>
                  <Input style={{padding:"0px"}} label="Your email" group type="email" name="email" validate error="wrong" required success="right"/>
                  <Input style={{padding:"0px"}} label="Your password" group type="password" name="password" validate required containerClass="mb-0"/>
                  <p className="font-small blue-text d-flex justify-content-end pb-3"><a href="#" className="blue-text ml-1">Forgot Password?</a></p>
                  <div className="text-center mb-3">
                    <Button type="submit" gradient="blue" className="btn-block z-depth-1a o-buttons">Sign in</Button>
                  </div>
                  </form>
                  {/*<p className="font-small dark-grey-text text-right d-flex justify-content-center"> or Sign in with:</p>
                  <div className="row d-flex justify-content-center">
                    <Button type="button" color="white" rounded className="mr-md-3 z-depth-1a rounded-border"><Fa icon="facebook" className="blue-text text-center" /></Button>
                    <Button type="button" color="white" rounded className="mr-md-3 z-depth-1a rounded-border"><Fa icon="twitter" className="blue-text" /></Button>
                    <Button type="button" color="white" rounded className="z-depth-1a rounded-border"><Fa icon="google-plus" className="blue-text" /></Button>
                  </div>*/}
                </CardBody>
                <ModalFooter className="mx-5 mb-1">
                  <p className="font-small grey-text d-flex justify-content-end">Not a member? <NavLink to="/register" className="blue-text ml-1"> Sign Up</NavLink></p>
                </ModalFooter>
              </Card>
            <React.Fragment>
        {/*<button className='btn btn-info' onClick={this.notify('info')}>Info</button>
        <button className='btn btn-success' onClick={this.notify('success')}>Success</button>
        <button className='btn btn-warning' onClick={this.notify('warning')}>Warning</button>
        <button className='btn btn-danger' onClick={this.notify('error')}>Error</button>*/}
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

export default connect(null,mapDispatchToProps)(Login);