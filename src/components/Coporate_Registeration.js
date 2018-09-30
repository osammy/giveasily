import React, { Component } from 'react'
import {Button, Fa, Card, CardBody, Popover, PopoverBody, PopoverHeader } from 'mdbreact';
import {getUrl} from '../data/urlController';
import axios from 'axios';
import ReactLoading from 'react-loading'
import USER from '../data/userData'
import {NavLink} from 'react-router-dom'
import LogoblueIcon from '../logo/Logoblue.png';
import { ToastContainer, toast } from 'mdbreact';

// import {bankList} from '../data/bankList'

class CoporateRegisteration extends Component {
   constructor(props) {
    super(props);

    this.state = {
      otherClasses:"dont-display",
      last_name:"",
      first_name:"",
      bvn:"",
      verifiedBvn:false,
      showLoader:false,
      bankList:[],
      ngo:false,
      founder:false,
      on_whatsapp:false,
      on_facebook:false,
      on_twitter:false,
      on_mobile:false,
      on_website:false,
      church:false,
      organisation_type:"religious_body"
    }
    console.log("".length)
    this.bvnVerification = undefined;
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.verifyBvn = this.verifyBvn.bind(this);
    this.makeBvnVerificationRequest = this.makeBvnVerificationRequest.bind(this);
    this.cancelBvnVerificationRequest = this.cancelBvnVerificationRequest.bind(this);
    this.getBankList = this.getBankList.bind(this)
  }

  componentDidMount(){
      this.getBankList();
  }

  getBankList() {
        
        const url = getUrl('bank');

        const options = {
        method: 'GET',
        url: url,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token':  USER.getLocalStorageUserData().token        
            }
        }

        axios(options)
            .then(response => {
                const bankList = response.data;
                this.setState({
                    bankList
                })
            })
            .catch(function(err){
                console.log(err)
            })
  }

  handleSelectChange(e){
      this.collectionMethod = e.target.value;
      const name = e.target.name;
      console.log(name)

      if(name === 'collection_method'){
        if(this.collectionMethod === "other_platforms" || this.collectionMethod === "others") {
            this.setState({
                otherClasses:"animated fadeIn"
                })
        } 
        else {
            if(this.state.otherClasses === "animated fadeIn") {
              this.setState({
                  otherClasses:"dont-display"
                })
          }
          
      }
    } 


  }

notify(type,message,duration){
  return () => {
    switch (type) {
      case 'info':
        toast.info(message, {
          autoClose: duration||10000
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


  handleFormSubmit(e) {
      e.preventDefault();

      const that = this;
      const first_name = this.state.first_name;
      const last_name = this.state.last_name;
      const bvn = this.state.bvn;
      const date_of_birth = this.state.formatted_dob;
      const official_phone = e.target.official_phone.value;
      const personal_phone = e.target.personal_phone.value;
      const founder = this.state.founder;
      const type_of_organisation = this.state.organisation_type;
      const business_name = e.target.business_name.value;
      const abbreviated_name = e.target.abbreviated_name.value;
      const settlement_bank = e.target.bank.value;
      const account_number = e.target.account_no.value
      const other_methods = e.target.other_methods.value;
      const other_platforms = this.collectionMethod;
      const coporate_address = e.target.coporate_address.value;
      const on_website = this.state.on_website;
      const on_facebook = this.state.on_website;
      const on_twitter = this.state.on_twitter;
      const on_whatsapp = this.state.on_whatsapp
      const on_mobile = this.state.on_mobile;
      const church = this.state.church
      const media = [
                     {name:'website',active:on_website},{name:'facebook',active:on_facebook},
                     {name:"twitter",active:on_twitter},{name:'whatsapp',active:on_whatsapp},
                     {name:'mobile',active:on_mobile}
                    ]

      const social_platforms = media.filter(function(P){
                                  return P.active === true;
                             })
      const body = {
                    first_name,last_name,official_phone,personal_phone,founder,bvn,account_number,
                    business_name,abbreviated_name,other_methods,date_of_birth,church,
                    coporate_address,other_platforms,settlement_bank,type_of_organisation,social_platforms
                   }
        const url = getUrl('coporate_registeration');
        const options = {
        method: 'POST',
        url: url,
        data: body,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token':  USER.getLocalStorageUserData().token,        }
    }

    console.log(body)
      axios(options)
        .then(response => {
            if(response.data.title === 'success') {
                // that.history.push('/')  
                const message = `Thank you, It will take 24 - 48hrs to verify yor details. 
                You will recieve a mail from us afterwards`
                this.notify('success',message,2000000)();
            }      
        })
        .catch(err => {
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


  cancelBvnVerificationRequest(){
      console.log('cancelled request')
      clearInterval(this.bvnVerification);
      this.bvnVerification = undefined;
      this.setState({showLoader:false})

  }
  makeBvnVerificationRequest(Response,bvn){
    if(!this.state.showLoader) this.setState({showLoader:true});

    const that = this;



    this.bvnVerification = setTimeout(function(){
        //     const url = getUrl('bvn') +"/"+bvn;//use this in production
        //   console.log('making request to '+url)
                    const url = getUrl('users')
        const options = {
            method: 'GET',
            url: url,
            headers: {
                'Content-Type': 'application/json',
                'x-access-token':  USER.getLocalStorageUserData().token,
            }
        }
        axios(options)
            .then(response => {
                console.log(response)
                if(response.status === 200) {
                    //if(response.data.message === "BVN resolved") { //uncomment this in production
                        const data = Response.data;
                        const {first_name,last_name, personal_phone,formatted_dob} = data;
                        const verifiedBvn = true;const showLoader = false
                        that.setState({
                            first_name,last_name, personal_phone,verifiedBvn,formatted_dob,showLoader
                        })
                    //}
             }

            })
            .catch(err => {
                const status = err.response.status;
                console.log(err.response);
                                console.log(status);
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

                // console.log(err["response"])

            that.setState({showLoader:false})
        })
      },1000)
  }

  verifyBvn(e){
      const bvn = e.target.value;
    this.setState({
          bvn
      })
      const Response = {
    "status": true,
    "message": "BVN resolved",
    "data": {
        "first_name": "OSAMA",
        "last_name": "IMAFIDON",
        "dob": "06-Oct-90",
        "formatted_dob": "1990-10-06",
        "mobile": "2348164695529",
        "bvn": "3413456545"
    },
    "meta": {
        "calls_this_month": 1,
        "free_calls_left": 9
    }
}
            
      if(bvn.length !== 11) {
            if(this.bvnVerification !== undefined) {
                this.cancelBvnVerificationRequest();
            }
          return //bvn must be 11 digits long
      } 

      this.makeBvnVerificationRequest(Response,bvn); 

  }

  handleCheckBox =(e)=>{
    const value = e.target.checked;
    const name = e.target.name;

    this.setState({
        [name]:value
    })
  }

handleRadioButton = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
        [name]:value
    })

  }

  render() {
      const correctClass = (this.state.verifiedBvn)?"col animated fadeIn":"dont-display"
      const dateClass = (!this.state.verifiedBvn)?"dont-display":"animated fadeIn";
    return(
    <div  className="p-4 theme-color coporate-form">

              <div className="myimage align-center">
          
          <NavLink to="/"> <img src={LogoblueIcon} width="30%" /></NavLink>
        
        </div>
    <div  className="topCard coporate-form-body " >
    <div>
        <div className="container">
            <h4 className="align-center theme-logo-color">THANK YOU FOR VERIFYING YOUR E-MAIL</h4>
            <p className="align-center o-form-sub theme-logo-color">You are almost done! please let us get to know you and your coporate entity</p>
            <form onSubmit={this.handleFormSubmit}>
                <div className="p-3" style={{background:"#f5f5f5"}}>
            <h5 className="theme-logo-color">About you</h5>
                <div className="row">
                    <div className="col-sm-10">         
                        <input pattern="[0-9]*" onChange={this.verifyBvn} value={this.state.bvn} disabled={this.state.verifiedBvn} className="form-control" name="bvn" placeholder="bvn number" type="text" />
                    </div>
                    <span style={{fontSize:"20px"}} className={correctClass}><i className="lni-check-mark-circle color-green"></i></span>
            
            {this.state.showLoader && <ReactLoading type="spokes" color="#290c49" height={'3%'} width={'3%'} />}

                </div><br />
            <div className="row">
                <div className={correctClass}>
                    <input defaultValue={this.state.first_name} disabled={this.state.verifiedBvn} name="first_name" placeholder="firstname" className="form-control"  type="text" />
                </div>
                <div className={correctClass}>
                    <input defaultValue={this.state.last_name} disabled={this.state.verifiedBvn} id="lastname" name="last_name" placeholder="lastname" className="form-control"  type="text" />
                </div>
            </div>
            <div className={dateClass}>
                <label className="o-form-sub theme-logo-color">Date of Birth</label>
                <input defaultValue={this.state.formatted_dob} disabled={this.state.verifiedBvn} type="date" className="form-control" />
            </div><br />
             <div className="row">
                <div className="col-sm">
                    <input pattern="[0-9]*" id="email" name="official_phone" placeholder="official Phone" className="form-control" type="text" />
                </div>
                <div className="col-sm">
                    <input pattern="[0-9]*" id="personal_phone" name="personal_phone" placeholder="personal Phone" className="form-control" type="text" />
                </div>
             </div>
             <br /><br />
            <div className="row">
                <div className="col-sm">
                    <p className="o-form-sub theme-logo-color">Are you the founder or presiding pastor of your organisation?</p>
                </div>
                <div className="col-sm">
                    <div className="row">
                        <input  checked={this.state.founder} onChange={this.handleCheckBox} name="founder" className="col-1 social-checkbox"  type="checkbox" /> 
                        <span className="col-11 o-form-sub theme-logo-color">Yes i am</span>
                    </div>
                </div>
            </div>


             </div>
             <br />
             <div className="p-3" style={{background:"#f5f5f5"}}>
            <h5 className="theme-logo-color">About your association NGO,NPO or religious organisation</h5>
            <p className="o-form-sub theme-logo-color">Business Name</p>
            <div className="row">
                <div className=" col-sm">
                    <input name="business_name" placeholder="name of coporate entity" className="form-control"  type="text" /> 
                </div>
                <div className=" col-sm">
                    <input name="abbreviated_name" placeholder="abbreviated name if any" className="form-control"  type="text" /> 
                </div>
            </div><br />
            <p className="o-form-sub theme-logo-color"> Choose your appropriate oranisation </p>
            <div className="row p-3">
                <div className="col-sm">
                    <div className="row">
                        <input value="religious_body" name="organisation_type" checked={this.state.organisation_type === "religious_body"?true:false} onChange={this.handleRadioButton} className="col-1 social-checkbox"  type="radio" /> 
                        <span className="col-11 o-form-sub theme-logo-color">Registered religious organisation in Nigeria<br />
                            <small className="color-grey-2">Choose this option if you have a registered church or mosque</small>
                        </span>
                        
                    </div>
                </div>
                <div className="col-sm">
                    <div className="row">
                        <input value="ngo" name="organisation_type" checked={this.state.organisation_type === "ngo"?true:false} onChange={this.handleRadioButton} className="col-1 social-checkbox"  type="radio" /> 
                        <span className="col-11 o-form-sub theme-logo-color">Registered NGO's &amp; NPO's in nigeria<br />
                            <small className="color-grey-2">Select this if you have a registered NGO in nigeria CAC/IT/NO amongst others</small>
                        </span>
                        
                    </div>
                </div>
                <div className="col-sm">
                    <div className="row">
                        <input value="alumni" name="organisation_type" checked={this.state.organisation_type === "alumni"?true:false}  onChange={this.handleRadioButton} className="col-1 social-checkbox"  type="radio" /> 
                        <span className="col-11 o-form-sub theme-logo-color">Old students / Alumni associations<br />
                            <small className="color-grey-2">Choose this option if you have a registered old school or alumni association</small>
                        </span>
                        
                    </div>
                </div>
                <div className="col-sm">
                    <div className="row">
                        <input value="others" name="organisation_type" checked={this.state.organisation_type === "others"?true:false} onChange={this.handleRadioButton} className="col-1 social-checkbox"  type="radio" /> 
                        <span className="col-11 o-form-sub theme-logo-color">Old kinds of Organisation<br />
                            <small className="color-grey-2">Choose this option if none of the other option fit your organisation</small>
                        </span>
                    </div>
                </div>
            </div>
            <div  className="row">
                <div className="col-sm-6">
                    <p className="o-form-sub theme-logo-color">Enter your detailed cooporate headquarters in Nigeria</p>
                </div>
                <div className="col-sm-6">
                    <textarea required name="coporate_address" rows="7" cols="20" placeholder="coporate Address" className="form-control"></textarea>
                </div>
        </div><br />
            </div>           
            <br />
            <div className="p-3" style={{background:"#f5f5f5"}}>


            <p className="o-form-sub theme-logo-color">Bank details</p>
            <div className="row">
                <div className="col-sm">
                <select name="bank" value={this.state.settlement_bank} className="form-control">
                    {this.state.bankList.map((B,i)=>{
                        return <option  key={i} value={B.name}>{B.name}</option>
                    })}
                </select>
            </div>
                <div className="col-sm">
                    <input pattern="[0-9]*"  id="account_no" name="account_no" placeholder="account number" className="form-control"  type="text" />
                    <small className="color-grey-2">Please make sure that you double check your account details. giveasily will not be held responsible for paying to 
            any inaccurate account details you specify</small>
                </div>
            </div><br />    

            <div className="row">
                <div className="col-sm">
                    <p className="o-form-sub theme-logo-color">What method(s) do you currently use for collecting donations?</p>
                </div>
            <div className="col-sm">
                <select name="collection_method" className="form-control" onChange={this.handleSelectChange}>
                    <option value="">--choose--</option>
                    <option value="bank">Transfer to bank account</option>
                    <option value="cash">Collection in cash</option>
                    <option value="other_platforms">Other collection platforms like giveasily</option>
                    <option value="others">Others</option>
                </select>
            </div>
        </div><br />
        <div className={this.state.otherClasses}>
            <p className="o-form-sub theme-logo-color">Please specify the platform</p>
            <textarea name="other_methods" rows="5" cols="20" className="form-control"></textarea>
        </div><br />
        {/*<div >
            <p>Select Plan</p>
            <div className="row">
                <div className="col-9">
                    <select className="form-control" onChange={this.handleSelectChange} name="plan">
                        <option value="basic">Basic</option>
                        <option value="premium">Premium</option>
                    </select>
                </div>
                <div className="col-3">
                    <Popover
                        component="i"
                        placement="top"
                        popoverBody=""
                        className="lni-question-circle color-blue"
                    >
                        <PopoverHeader></PopoverHeader>
                        <PopoverBody>Premium plan gives you lifetime access to all of giveasily premium features. 
                            <a href="http://localhost:3001/dashboard" target="_blank">&nbsp;Learn More</a>
                        </PopoverBody>
                    </Popover>
                </div>
            </div>
    </div>
    <br />*/}

    <p className="o-form-sub theme-logo-color">Which of the following platforms are you presently active on?</p>
    <div className="row p-0">
        <div className="col-sm">
            <div className="row">
                <input className="col-sm social-checkbox" checked={this.state.on_website} onChange={this.handleCheckBox} name="on_website" type="checkbox" />
                <span className="col-sm o-form-sub theme-logo-color"> Website</span>
            </div>
        </div>
        <div className="col-sm">
            <div className="row">
                <input className="col-sm social-checkbox" checked={this.state.on_mobile} onChange={this.handleCheckBox} name="on_mobile" type="checkbox" />
                <span className="col-sm o-form-sub theme-logo-color"> Mobile App</span>
            </div>
        </div>
        <div className="col-sm">
            <div className="row">
                <input className="col-sm social-checkbox" checked={this.state.on_facebook} onChange={this.handleCheckBox} name="on_facebook" type="checkbox" />
                <span className="col-sm o-form-sub theme-logo-color"> Facebook Page</span>
            </div>
        </div>
        <div className="col-sm">
            <div className="row">
                <input className="col-sm social-checkbox" checked={this.state.on_twitter} onChange={this.handleCheckBox} name="on_twitter"  type="checkbox" />
                <span className="col-sm o-form-sub theme-logo-color"> Twitter Account</span>
            </div>
        </div>
        <div className="col-sm">
            <div className="row">
                <input className="col-sm social-checkbox" checked={this.state.on_whatsapp} onChange={this.handleCheckBox} name="on_whatsapp" type="checkbox" />
                <span className="col-sm o-form-sub theme-logo-color"> WhatsApp</span>
            </div>
        </div>
    </div>
    </div>


    <div className="text-center my-3">
        {/*<Button type="submit" className="btn z-depth-1a">Submit</Button>*/}
        <Button style={{margin:"0 auto"}} type="submit" gradient="blue" className="btn-block  o-buttons">Submit</Button>
    </div>
        <React.Fragment>
        <ToastContainer
          hideProgressBar={true}
          newestOnTop={true}
          autoClose={5000}
        />
      </React.Fragment>
   </form>

  </div>
  </div>
  </div>

</div>
    )
  }
}

export default CoporateRegisteration;