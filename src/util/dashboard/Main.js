import React, {Component} from 'react';
import { TopCard, Filter, BottomBoxes, EmailConfirmationOverlay } from './utils';
import ReactLoading from 'react-loading'
import { registeredCompanies } from '../../data';
import { Card, CardBody } from 'mdbreact';
import axios from 'axios';
import {getUrl} from '../../data/urlController';
import {connect} from 'react-redux';
import USER from '../../data/userData';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Timer from '@material-ui/icons/Timer'
import moment from 'moment'
import ArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import BackArrowIcon from '@material-ui/icons/KeyboardBackspace'
import {ToastContainer, toast } from 'mdbreact';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


const mapStateToProps = state =>{
    return {
        user:state.user
    }
}

class Main extends Component {
    constructor(props){
        super(props);

        this.state ={
            companyList:[],
            purposes:[],
            specify_more_details:false,
            date_to_redeem_pledge:undefined,
            type_of_giving:'donate',
            anchorEl_1:null,
            anchorEl_2:null,
            anchorEl_3: null,
            display_texts:['Last 24hrs','Last week','Last Month','Last year','All'],
            dropdown_text1:'All',
            dropdown_text2:'All',
            dropdown_text3:'All',
            donationsAmount:undefined,
            pledgesCount:undefined,
            donationsCount:undefined,
            viewMore:false,
            notifications:[],
            notification_details:{}
        }

        this.populatePurposeField = this.populatePurposeField.bind(this);
        this.handleSelectInput = this.handleSelectInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.payWithPaystack = this.payWithPaystack.bind(this);
        this.savePledge = this.savePledge.bind(this);
        this.verifyTransaction = this.verifyTransaction.bind(this);
        this.getCompanyList = this.getCompanyList.bind(this);
        this.handleClick1 = this.handleClick1.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);
        this.handleClick3 = this.handleClick3.bind(this);
        this.handleTopCardClick = this.handleTopCardClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.fillTopCards = this.fillTopCards.bind(this);
        this.getDonationsCount = this.getDonationsCount.bind(this)
        this.getPledgesCount = this.getPledgesCount.bind(this);
        this.getDonationsAmount = this.getDonationsAmount.bind(this);
        this.getEndAt - this.getEndAt.bind(this);
        this.viewNotification = this.viewNotification.bind(this);
        this.backToNotificationListView = this.backToNotificationListView.bind(this)
    }

componentDidMount() {

   this.getCompanyList();//gets the total companies list in the database
   this.fillTopCards(); // fill in data in the top information cards


   const notifications = [
       {
           type:"Pledges",
           amount:5000,
           date_to_redeem_pledge:moment().subtract(1,'days').format('LL')
       },
       {
           type:"Pledges",
           amount:10000,
           date_to_redeem_pledge:moment().add(1,'days').format('LL')
       }
   ]
   this.setState({
       notifications
   })


}

_onFocus(e){
    // e.currentTarget.type = "date";
    e.target.type = "date";
}
_onBlur(e){
    e.target.type = "text";
    e.target.placeholder = "Enter date to redeem pledge"
}

viewNotification(notification_details){
    
    this.setState({
        viewMore:true,
        notification_details
    })
}

backToNotificationListView(){
    this.setState({
        viewMore:false,
        notification_details:{}
    })
}

fillTopCards() {
const url = getUrl('starter');
const that = this;

const options = {
    method:'GET',
    url:url,
    headers: {
        'Content-Type': 'application/json',
        'x-access-token':  USER.getLocalStorageUserData().token,
    }
}

axios(options)
   .then(function(response){
       const data = response.data;
       let {pledgesCount, donationsCount, donationsAmount} = data;
       if(donationsAmount.length === 0){
            donationsAmount = 0 + " Naira";
       } else {
            donationsAmount = donationsAmount[0].total + " Naira";
       }
       pledgesCount = pledgesCount + " Pledges";
       donationsCount = donationsCount + " Donations"
       that.setState({
            donationsCount,pledgesCount,donationsAmount
       })
   })
   .catch(function(err){
       console.log(err)
   })
}

getCompanyList() {
    const that = this;
    // let companyList = registeredCompanies;
    const url = getUrl('users')
        var options = {
        method: 'GET',
        url: url,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token':  USER.getLocalStorageUserData().token,
        }
        // ,
        // params:{                     //This is no longer necessary as i am enforcing that any non admin
        //     complete:true,              //will only be able to request verified coporate users i.e where
        //     category:'coporate'          //'complete:true' and 'category:coporate'
        // }
    }
    axios(options)
    .then(function(response) {
        if(response.status === 200) {
            const companyList = response.data;
            console.log(companyList)
            if(companyList.length === 0) {
                console.log('no companies registered yet');
                return;
            }
            that.setState({
                companyList
            })
        }
    })
    .catch(function(err){
        console.log(err)
    })

}

handleClick1(event) {

  event.stopPropagation();
//   event.currentTarget.style.background = "black"
this.first = true;
this.second = false;
this.third = false
    this.setState({ anchorEl_1: event.currentTarget });
};
handleClick2(event) {

  event.stopPropagation();
  this.first = false;
  this.second = true;
  this.third = false;
//   event.currentTarget.style.background = "black"
    this.setState({ anchorEl_2: event.currentTarget });
};
handleClick3(event) {

  event.stopPropagation();
  this.first = false;
  this.second = false;
  this.third = true
    this.setState({ anchorEl_3: event.currentTarget });
};

handleClose(e){
    this.setState({ anchorEl_1: null,anchorEl_2: null,anchorEl_3: null});

}


getEndAt(text) {

    switch(text) {
        case 'Last 24hrs':
            return moment().subtract(1,'days').format();
        case 'Last week':
            return moment().subtract(1,'weeks').format();           
        case 'Last Month':
            return moment().subtract(1,'months').format();        
        case 'Last year':
            return moment().subtract(1,'years').format();  
        default:
            return 'All'    //the server will handle this case the server will not use statAt and endAt       
    }
    
}

getDonationsCount(startAt) {
    const that = this;
    const url = getUrl('get_donations_count');
    const endAt = moment().format();
    const options = {
        method:'GET',
        url:url,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token':  USER.getLocalStorageUserData().token,
        },
        params:{
            startAt,
            endAt
        }
    }

    axios(options)
        .then(function(response){
            const data = response.data;
            const count = data.count;
            const donationsCount = count + " Donations"
            that.setState({
                donationsCount
                })
            })
        .catch(function(err){
            console.log(err)
        })
}

getDonationsAmount(startAt) {
    const that = this;
    const url = getUrl('get_donations_amount');
    const endAt = moment().format();
    const options = {
        method:'GET',
        url:url,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token':  USER.getLocalStorageUserData().token,
        },
        params:{
            startAt,
            endAt
        }
    }

    axios(options)
        .then(function(response){
            let data = response.data;
            let donationsAmount;
            
            if(data.length === 0){
                    donationsAmount = 0 + " Naira";
            } else {
                    donationsAmount = data[0].total + " Naira";
            }
            that.setState({
                    donationsAmount
            })
        })
        .catch(function(err){
            console.log(err)
        })
}

getPledgesCount(startAt) {
    const that = this;
    const url = getUrl('get_pledges_count');
    const endAt = moment().format();
    const options = {
        method:'GET',
        url:url,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token':  USER.getLocalStorageUserData().token,
        },
        params:{
            startAt,
            endAt
        }
    }

    axios(options)
        .then(function(response){
            const data = response.data;
            const count = data.count;
            const pledgesCount = count + " Donations"
            that.setState({
                pledgesCount
                })
            })
        .catch(function(err){
            console.log(err)
        })
}


handleTopCardClick(text){
const endAt = this.getEndAt(text)

if(this.first) {
    this.setState({ anchorEl_1: null,dropdown_text1:text,donationsCount:undefined });
    //resetting donationsCount to undefined here is so that donations Card will display 'loading'
    this.getDonationsCount(endAt);
    return;
} 
if(this.second){
    this.setState({ anchorEl_2: null,dropdown_text2:text, donationsAmount:undefined });
        //resetting donationsAmount to undefined here is so that donations Card will display 'loading'

    this.getDonationsAmount(endAt);
    return;
}

if(this.third) {
    this.setState({ anchorEl_3: null,dropdown_text3:text, pledgesCount:undefined });
    //resetting pledgesCount to undefined here is so that donations Card will display 'loading'
    this.getPledgesCount(endAt)
}


}

handleSelectInput(e) {
    const name = e.target.name;
    const value = e.target.value;

    if(name === 'purpose') {
        this.purpose = value;
        if(value === "project" || value==="others") {
            const specify_more_details = true;
            this.setState({
                specify_more_details
            })
        }
    else {
        if(this.state.specify_more_details) {
            const specify_more_details = false;
            this.setState({
                specify_more_details
            })
        }
    }
    }

    else if(name ==='type_of_giving') {
            const type_of_giving = value;
            this.setState({
                type_of_giving
            })
    }

    else if(name === 'pledge_date') {

        const date_to_redeem_pledge = value;
        this.setState({
            date_to_redeem_pledge
        })
    }


}

populatePurposeField = function (e) {
    const companyName = e.target.value
    if(companyName === 'Choose who you want to give') {
        this.setState({
            purposes:[] // When 'Choose who you want to give' is selected,This will remove the purpose field that may have already been populated
            
        })
        return;
    }

    this.coporate_body = this.state.companyList.find(function(el){
        return el.subaccount.business_name === companyName;
    })
        console.log(this.coporate_body)
    // const purposes = coporate_body.purposes;
    const church_purposes = ['tithes','First Fruits','offerings','project','others']
    const other_purposes = ['contributions','project','others'];
    // const purposes = (this.coporate_body.church)? church_purposes:other_purposes;
    const purposes = (this.coporate_body.type_of_organisation === "religious_body")? church_purposes:other_purposes;


    this.setState({
        purposes
    })
}

handleSubmit(e) {
    e.preventDefault();

    const organisation = e.target.organisation;
    if(organisation.value === 'Choose who you want to give') {
         alert('please choose who you want to give to'); 
         organisation.focus();
         return

    }

    let body;
    const type= this.state.type_of_giving; //either 'donate' or 'pledge';
    const beneficiaryId = this.coporate_body._id;
    const purpose = this.purpose; //either tithes or offering or monthly collection or any of the other types
    const amount = Number(e.target.amount.value);
    const platform = 'dashboard'; //from your dashboard another option can be from forms but this function is only accessible from dashboard
    // const benefactorId = this.props.user._id;
    // const email = this.props.user.email;
    const benefactorId = USER.getLocalStorageUserData()._id;
    const email = USER.getLocalStorageUserData().email;
    const description = (this.state.specify_more_details)? e.target.describe.value:"" //if you select 'others' as purpose you will need to describe your purpose in the description field
    const subaccount = this.coporate_body.subaccount.subaccount_code;
    // if(!Boolean(email)) alert('an error occured'); return;



    body = {
        type,beneficiaryId,purpose,amount,benefactorId,platform,email,description,subaccount
    }

    if(type === 'donate') {
        this.payWithPaystack(body)
    } else if(type === 'pledge') {
            const purposeField = e.target.purpose;
            if(purposeField.value === 'Choose purpose for giving') {
                alert("please enter the purpose for your pledge");
                purposeField.focus();
            }
            const date_to_redeem_pledge = this.state.date_to_redeem_pledge;
            const status = 'unredeemed';
            body.date_to_redeem_pledge = date_to_redeem_pledge;
            body.status = status; //All pledge status will be 'unredeemed' at ht estage of initiation.

            this.savePledge(body)

    }

}

verifyTransaction(reference){
    const url = getUrl('verify_payment')+'/'+reference;
    const options = {
        method: 'GET',
        url: url,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token':  USER.getLocalStorageUserData().token,
        },
        params:{
            complete:true,
            category:'coporate'
        }
    }
    axios(options)
        .then(function(response){
            if(response.status === 200){
                const data = response.data
                    if(data.title === 'success') {
                        alert(data.message)
                        }
                    }
                })
        .catch(function(err){
            console.log(err)
        })

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
savePledge(body){
    const url = getUrl('pledge');
    const options = {
        method:'POST',
        data:body,
        url:url,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': USER.getLocalStorageUserData().token
        }
    }
        console.log(options)

    axios(options)
        .then(response=>{
                const {title, message} = response.data;
                const displayMessage = `${title}: ${message}`
                this.notify('success',displayMessage)()
        })
        .catch(err=>{
            const errInfo = err.response
            console.log(errInfo)
            if(errInfo) {
                return this.notify('error', errInfo.data.err.message)()
            }
            this.notify('error','something went wrong')()

        })
}

    payWithPaystack({email,purpose, amount, platform, type, beneficiaryId,benefactorId,description,subaccount}){
        amount = Number(amount) * 100//converting to kobo as used by paystack
        console.log(subaccount)
        const payload = {
            key: 'pk_test_4edb6704ac9c9db84e986ca247970a5160fe5651',
            email,
            amount,
            subaccount,
            // ref: '' + Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
            metadata: {
                custom_fields: [
                    {                          
                        purpose,
                        description,
                        type,
                        platform,
                        beneficiaryId,
                        benefactorId,
                        amount
                    }
                ]
            },
            callback: function (response) {
                alert('success. transaction is submitted for verification ' + response.reference);
                console.log(response)
            },
            onClose: function () {
                alert('window closed');
            }
        };
        if(amount > 500000){        //do this if amount is greater than five thousand naira(500,000 kobo)
            let transaction_charge = (0.02*amount) + 30000;
            const paystack_max_charge = 200000;
            const giveasily_max_profit = 300000; 
            const total_max_charge = giveasily_max_profit + paystack_max_charge;

            const extra_charge = (amount > 200000) ? 10000:0;
            const paystack_charge = (0.02 * amount) + extra_charge;

            transaction_charge = (transaction_charge > total_max_charge)?total_max_charge:transaction_charge;
            console.log(transaction_charge)
            payload.transaction_charge = transaction_charge;
        }
        var handler = window.PaystackPop.setup(payload);
        handler.openIframe();
    }

render() {
    const specifyMoreDetailsClass = (this.state.specify_more_details)?"animated fadeIn":"dont-display";
    const showPledgeDate = (this.state.type_of_giving === 'pledge')?"animated fadeIn input-group":"dont-display";
    const NotificationsClass = this.state.viewMore?"animated slideOutLeft bg-white":"bg-white";
    const viewMoreClass = this.state.viewMore?"animated slideInRight fadeIn":"dont-display";
    const backArrowClass = this.state.viewMore?"animated flipInY cursor-pointer":"dont-display"
    return (

<div style={{margin:"0 auto", width:"99%"}} className="m-0 p-0">

    <div className="row container">       
        <div className="col">
            <TopCard 
                anchorEl={this.state.anchorEl_1}
                handleClose={this.handleClose}
                handleClick={this.handleClick1}
                display_texts={this.state.display_texts}
                dropdown_text={this.state.dropdown_text1}
                purpose="Total Donations Made"
                result={this.state.donationsCount}
                handleTopCardClick={this.handleTopCardClick}
                 />
        </div>
        <div className="col">
                <TopCard 
                anchorEl={this.state.anchorEl_2}
                handleClose={this.handleClose}
                handleClick={this.handleClick2}
                display_texts={this.state.display_texts}
                dropdown_text={this.state.dropdown_text2}
                purpose="Total Amount Donated"
                result={this.state.donationsAmount}
                handleTopCardClick={this.handleTopCardClick}
                 />
        </div>
        <div className="col" >
                <TopCard 
                anchorEl={this.state.anchorEl_3}
                handleClose={this.handleClose}
                handleClick={this.handleClick3}
                handle={this.handleTopCardClick}
                display_texts={this.state.display_texts}
                dropdown_text={this.state.dropdown_text3}
                purpose="Total Pledges"
                result={this.state.pledgesCount}
                handleTopCardClick={this.handleTopCardClick}
                 />
        </div>
    </div>

<br />


    {/*<Card style={{borderRight:"2px solid #290c49"}}>
        <CardBody>*/}
<div className="row container ml-1"  >
    <BrowserRouter><Route exact path="/demo" render={()=><h1>Hey there</h1>} /></BrowserRouter>
            <div className="col-sm-5 bg-white ">
            <form onSubmit={this.handleSubmit} className="donation-form">
                
            <h3 className="align-center pt-4">GiveQuickly<sup >&trade;</sup></h3><br />
            {/*<hr className="bg-theme" /><br />*/}
 
            <div  className="input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">&#8358;</div>
                    </div>
                    <input name="amount" placeholder="Enter amount" required type="text" className="form-control" id="inlineFormInputGroup"/>
            </div><br />

            <div className="form-group"> 
                <select required name="organisation"  onChange={this.populatePurposeField} className="form-control">
                    <option>Choose who you want to give</option>
                        {this.state.companyList.map((val,i)=>{
                            return <option value={val.subaccount.business_name} key={i}>{val.subaccount.business_name}</option>
                        })}
                </select> 
            </div>

            <div className="form-group">
                <select name="purpose" required onChange={this.handleSelectInput} className="form-control">
                    <option>Choose purpose for giving</option>                        
                        {this.state.purposes.map((P,i)=>{
                            return <option value={P} key={i}>{P}</option>
                        }
                   )}
                </select> 
            </div>

            <div className={specifyMoreDetailsClass}>
                <textarea placeholder="Please describe the purpose for your giving" required={this.state.specify_more_details} name="describe" rows="5" className="form-control"></textarea>
            </div><br /> 
            <div className="form-group">
                <select onChange={this.handleSelectInput} name="type_of_giving" required className="form-control"> 
                    <option value="donate">Donate</option>
                    <option value="pledge">Pledge</option>                             
                </select> 
            </div>
                        
            <div className={showPledgeDate}>
                    <div className="input-group-prepend">
                        <div className="input-group-text"><Timer /></div>
                    </div>
                    
                    <input onFocus={this._onFocus} onBlur={this._onBlur} placeholder="Enter date to redeem pledge" onChange={this.handleSelectInput} required={(this.state.type_of_giving === 'pledge')?true:false}
                 name="pledge_date" type="text" value={this.state.pledge_date_at} className="form-control" id="inlineFormInputGroup" />
                 <br />
            </div>            
                <div style={{display:"flex",justifyContent:"flex-end"}} className="my-4">
                    <button style={{background:"#92d050"}} type="submit" className="btn ">Give now!</button>
                </div>

        </form><br />

        </div>
        <div className="col-sm-1"></div>
        <div className="bg-white col-sm-6 mr-0">
            <h3 className="align-center pt-3">Notifications</h3>
            <p style={{display:(this.state.notifications.length === 0)?"block":"none"}}>
                There are no new notifications to display now. notifiations will display here
            </p>
            <div className={backArrowClass} onClick={this.backToNotificationListView}><BackArrowIcon /> back</div>
            
            <div id="o-dashboard-notification-detail" className={viewMoreClass}>
                <br />


            <div  className="input-group">

                    <span style={{height:"100px"}} type="text" className="form-control" id="inlineFormInputGroup">
                       <span><b>{this.state.notification_details.type}</b></span><br />
                        <span>Due: {this.state.notification_details.date_to_redeem_pledge}</span><br />
                        <span>amount: &#8358;{this.state.notification_details.amount}</span>
                    </span>
                    <div  className="input-group-prepend">
                        <div className="input-group-text bg-theme color-white p-2">
                            <span style={{transform:"rotate(90deg)"}}>Redeem</span><br />
                            <ArrowRightIcon style={{color:"white"}} /></div>
                    </div>
            </div><br />


            </div>
            <div id="o-dashboard-notification" className={NotificationsClass}>
            {this.state.notifications.map((N,i)=>{

                return <div onClick={()=>{this.viewNotification(N)}} key={i}>
                        <div className="p-1 py-2 o-notification-list">
                            <div className="o-view-icon">
                                <ArrowRightIcon style={{color:"white"}} />
                            </div>

                           <div className="p-2" style={{borderLeft:"2px solid purple"}}>
                                <h6><b>{N.type}</b></h6>
                                <p>your pledge expires on {N.date_to_redeem_pledge}</p>
                          </div>
                        </div><br />
                       </div>
            })}
            

            </div>
        </div>
        </div>
        <br />
        {/*</CardBody>
    </Card>*/}

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

export default connect(mapStateToProps)(Main);