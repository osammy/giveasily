import React, { Component } from 'react';
import { TopCard, QueryTransactions } from '../util/dashboard/utils';
import moment from 'moment';
import ReactLoading from 'react-loading';
import axios from 'axios'
import {ajaxController} from '../data/ajaxController';
import {getUrl} from '../data/urlController';
import USER from '../data/userData';

// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';

import { BarChart } from 'react-easy-chart'
const crud = ajaxController("http://jsonplaceholder.typicode.com/todos");



class GlobalAdmin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            age: 23,
            startDate: moment(),
            anchorEl:null,
            anchorEl_1:null,        //manage TopCards
            anchorEl_2:null,
            anchorEl_3: null,
            anchorEl_cUser:null,
            anchorEl_pUser:null,
            display_texts:['Last 24hrs','Last week','Last Month','Last year','All'],
            dropdown_text1:'All',
            dropdown_text2:'All',
            dropdown_text3:'All',
            dropdown_text_cUser:'All',
            dropdown_text_pUser:'All',
            personalUsersCount:undefined,
            coporateUsersCount:undefined,
            donationsAmount:undefined,
            pledgesCount:undefined,
            donationsCount:undefined,        //end TopCards
            buttonText: "DONATE",
            windowWidth:window.innerWidth,
            data: [],
            xDomainRange:[]

            

        }
        this.handleClick = this.handleClick.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDonateClose = this.handleDonateClose.bind(this);
        this.handlePledgeClose = this.handlePledgeClose.bind(this);
        this.handleExportClick = this.handleExportClick.bind(this);
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
    }


componentDidMount() {
    const that = this;const todoId = 5;
    this.fillTopCards();

    // crud.get().then(function(response){
    //     console.log(response.data)
    // })
//     axios.get('http://jsonplaceholder.typicode.com/todos' ,{
//     params: {
//       id: todoId
//     }
//   })
//     .then(function (response) {
//       console.log(response);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });

    const data = [
                    { x: '10-Jan-15', y: 20 },
                    { x: '12-Jan-15', y: 10 },
                    { x: '15-Jan-15', y: 33 }
                 ]
    const xDomainRange = ['1-Jan-15', '20-Jan-15'];

    setTimeout(function(){
        that.setState({data,xDomainRange})
    })


    window.addEventListener('resize',function() {
    const windowWidth = Math.round(this.innerWidth);
        // const height = this.innerHeight;
    that.setState({
        windowWidth
        })  

    }) 
}

componentWillUnmount(){
    window.removeEventListener('resize')
}

handleChange(event) {
        alert([event.target.name] + " " + event.target.value)
}

handleExportClick() {

}

handleDateChange(date) {

        this.setState({
            startDate: date
        });
}
    
handleClick(event) {
          console.log(event.currentTarget);
    this.setState({ anchorEl: event.currentTarget });
};

handleDonateClose(e) {
    const buttonText = "DONATE"
    this.setState({ anchorEl: null, buttonText });
};
handlePledgeClose(e) {
    console.log(e.target)
    const buttonText = "PLEDGE"
    this.setState({ anchorEl: null, buttonText });
};

handleClick1(event) {

  event.stopPropagation();
//   event.currentTarget.style.background = "black"
this.first = true;
this.second = false;
this.third = false
this.cUser = false;
this.pUser = false
    this.setState({ anchorEl_1: event.currentTarget });
};
handleClick2(event) {

  event.stopPropagation();
  this.first = false;
  this.second = true;
  this.third = false;
  this.cUser = false;
this.pUser = false
//   event.currentTarget.style.background = "black"
    this.setState({ anchorEl_2: event.currentTarget });
};
handleClick3(event) {

  event.stopPropagation();
  this.first = false;
  this.second = false;
  this.third = true
  this.cUser = false;
  this.pUser = false
    this.setState({ anchorEl_3: event.currentTarget });
};

handleClickPuser =(event)=>{
  event.stopPropagation();
  this.first = false;
  this.second = false;
  this.third = false
  this.cUser = false;
  this.pUser = true;
  this.setState({ anchorEl_pUser: event.currentTarget });

}
handleClickCuser = (event)=>{
  event.stopPropagation();
  this.first = false;
  this.second = false;
  this.third = false;
  this.cUser = true;
  this.pUser = false;
  this.setState({ anchorEl_cUser: event.currentTarget });

  
}
handleClose(e){
    this.setState({ anchorEl_1: null,anchorEl_2: null,anchorEl_3: null,anchorEl_pUser:null,anchorEl_cUser:null});

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

if(this.cUser) {
    this.setState({ anchorEl_3: null,dropdown_text3:text, pledgesCount:undefined });
    //resetting pledgesCount to undefined here is so that donations Card will display 'loading'
    this.getPledgesCount(endAt)
}

if(this.pUser) {
    this.setState({ anchorEl_3: null,dropdown_text3:text, pledgesCount:undefined });
    //resetting pledgesCount to undefined here is so that donations Card will display 'loading'
    this.getPledgesCount(endAt)
}


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
       let {pledgesCount, donationsCount, donationsAmount, coporateUsersCount, personalUsersCount} = data;
       if(donationsAmount.length === 0){
            donationsAmount = 0 + " Naira";
       } else {
            donationsAmount = donationsAmount[0].total + " Naira";
       }
       pledgesCount = pledgesCount + " Pledges";
       donationsCount = donationsCount + " Donations";
       coporateUsersCount = coporateUsersCount + " Users";
       personalUsersCount = personalUsersCount + " Users"

       that.setState({
            donationsCount,pledgesCount,donationsAmount,coporateUsersCount,personalUsersCount
       })
   })
   .catch(function(err){
       console.log(err)
   })
}


render() {
    const loaderClass = (this.state.data.length===0 && this.state.xDomainRange.length==0)
    ?"position-loader":"dont-display"
    return (
     <div className="container">
    <div className="row">       
        <div className="col">
                <TopCard 
                anchorEl={this.state.anchorEl_cUser}
                handleClose={this.handleClose}
                handleClick={this.handleClick1}
                display_texts={this.state.display_texts}
                dropdown_text={this.state.dropdown_text_cUser}
                purpose="Coporate Users"
                result={this.state.coporateUsersCount}
                handleTopCardClick={this.handleTopCardClick}
                 />
            </div>
            <div className="col">
                <TopCard 
                anchorEl={this.state.anchorEl_pUser}
                handleClose={this.handleClose}
                handleClick={this.handleClick1}
                display_texts={this.state.display_texts}
                dropdown_text={this.state.dropdown_text_pUser}
                purpose="Personal Users"
                result={this.state.personalUsersCount}
                handleTopCardClick={this.handleTopCardClick}
                 />
            </div>
            <div className="col">
                <TopCard 
                anchorEl={this.state.anchorEl_1}
                handleClose={this.handleClose}
                handleClick={this.handleClick1}
                display_texts={this.state.display_texts}
                dropdown_text={this.state.dropdown_text1}
                purpose="Total Donations"
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

    </div><br /><br /><br />

        <QueryTransactions 
        handlePledgeClose={this.handlePledgeClose} 
        buttonText={this.state.buttonText} 
        anchorEl={this.state.anchorEl}
        handleDonateClose= {this.handleDonateClose}
        handleClick = {this.handleClick}
        startDate = {this.state.startDate}
        handleClose={this.handleClose}
        handleDateChange={this.handleDateChange}
        handleExportClick= {this.handleExportClick} 
        />
        <br /><br />

        <div className="bg-off-white" >
        <div className={loaderClass}><ReactLoading type="bars" color="#290c49" height={'10%'} width={'10%'} /></div> 
        <div className="pl-5 pt-3 "><span className="medium-font-size"><b>&#8358;0.00</b></span>&nbsp;&nbsp;
        <span className="medium-font-size">Total Donations </span></div>
        <br /><br />
        <BarChart
        axisLabels={{ x: 'Time', y: 'Total Amount' }}
        axes
        grid
        colorBars
        height={350}
        width={(this.state.windowWidth)>900?Math.round(0.8 * this.state.windowWidth):(this.state.windowWidth)}
        barWidth={20}
        xTickNumber={5}
        yTickNumber={3}
        xType={'time'}
        xDomainRange={this.state.xDomainRange}
        data={this.state.data}
        />
        </div><br /><br />
        {/*<ArrowUp />*/}
            </div>)
    }
}

export default GlobalAdmin;