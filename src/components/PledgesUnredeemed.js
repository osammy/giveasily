import React, {Component} from 'react';
import { Card, CardBody } from 'mdbreact';
import axios from 'axios';
import {getUrl} from '../data/urlController';
import USER from '../data/userData';
import { NavLink } from 'react-router-dom'

class PledgesUnredeemed extends Component {

constructor(props) {
    super(props);

    this.state = {
        unredeemedPledges:[],
        message:""
    }

    this.getUnredeemedPledges = this.getUnredeemedPledges.bind(this);
    this.formatDateToString = this.formatDateToString.bind(this);
    this.getPledgeDisplayMessage = this.getPledgeDisplayMessage.bind(this);
    this.payWithPaystack = this.payWithPaystack.bind(this);
    this.verifyTransaction = this.verifyTransaction.bind(this);

   
}

componentDidMount(){
this.getUnredeemedPledges();

}

getUnredeemedPledges(){

const url = getUrl('get_unredeemed_pledge')
const that = this
const options = {
    method: 'GET',
    url: url,
    headers: {
        'Content-Type': 'application/json',
        'x-access-token': USER.getLocalStorageUserData().token
    },
    params:{
        status:'unredeemed'
    }
}

axios(options)
    .then(function(response){
        if(response.status === 200) {
            console.log(response.data)

            const unredeemedPledges = response.data;
            console.log(unredeemedPledges)
            if(unredeemedPledges.length === 0) {
                const message = "No unredeemed pledges to show"
                that.setState({
                unredeemedPledges,
                message
            })
                return;
            }
            
            that.setState({
                unredeemedPledges
            })
        }
    })
}

verifyTransaction(reference){
    const url = getUrl('verify_payment')+'/'+reference;
    console.log(url)
    const options = {
    method: 'GET',
    url: url,
    headers: {
        'Content-Type': 'application/json',
        'x-access-token': USER.getLocalStorageUserData().token
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

    payWithPaystack(data){
        console.log(data);
        const type = 'pledge'  //Note this is not saved in the database
        const { purpose, amount, platform, benefactorId,description } = data;
        const email = USER.getLocalStorageUserData().email;
        const beneficiaryId = data.beneficiaryId._id;
        const pledgeId = data._id;
        var that = this;
         

        var handler = window.PaystackPop.setup({
            key: 'pk_test_4edb6704ac9c9db84e986ca247970a5160fe5651',
            email,
            amount,
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
                        amount,
                        pledgeId
                    }
                ]
            },
            callback: function (response) {
                // alert('success. transaction ref is ' + response.reference);
                console.log(response);
                that.verifyTransaction(response.reference)
                    

            },
            onClose: function () {
                alert('window closed');
            }
        });
        handler.openIframe();
    }
formatDateToString(date){
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let day = date.getDate();

    if(month < 10) month = '0'+month;
    if(day < 10) day = '0'+day;
    const formattedDateInString = year +'-'+month+"-"+day;
   
    return formattedDateInString;
}

getPledgeDisplayMessage(pledge,todaysDate){
    const formattedDateInString = this.formatDateToString(todaysDate);

                let diff = +new Date(pledge.date_to_redeem_pledge) - +new Date(formattedDateInString); 
                var text;
                const remainder = (Math.abs(diff))%86400000;
                const quotient = Math.floor((Math.abs(diff))/86400000);
                
                if(diff > 0) {
                    
                    if(quotient === 0 ) {
                        const extraTime = Math.floor(remainder/60000)
                        if(extraTime > 0) text = 'Due in '+extraTime +'mins time';
                        else text = 'Due today!'
                        
                    }
                    else {
                        text = 'Due in  '+quotient+" day(s) time"
                    }
                }
                else if(diff < 0) {
                    text = 'Overdue '+quotient+" day(s) ago";
                }
                else text = 'Pledge is due today!'

                return text
}


    render(){
        
        return (
        <div className="container">
            <br /><br />
            <div>
                <h2>{this.state.message}</h2>
                <button style={{color:"black"}} className="btn ">
                   <NavLink to="/dashboard"> 
                       <i className="lni-angle-double-left medium-font-size">&nbsp;&nbsp;Make a Pledge</i>
                    </NavLink>
                    </button>
            </div><br />
            {this.state.unredeemedPledges.map((P,i)=>{
                let todaysDate = new Date();
                const txt = this.getPledgeDisplayMessage(P,todaysDate);
                const determineColor = (+new Date(P.date_to_redeem_pledge)) > (+new Date(this.formatDateToString(todaysDate)));



               
                {/*style={{background:determineColor?'#fe8111':'#ff1111' }} */}
                return (
                    <div style={{position:'relative'}} key={i}>
                         <div style={{background:determineColor?'#fe8111':'#ff1111' }}
                         className="pledge-redeem-alert">{txt}</div>

                        <Card >

                            <CardBody >
                                <br />
                                <span>You pledged  </span><span className="bg-color-grey">{P.amount}</span>
                                <span className="bg-color-grey">&nbsp; to {P.beneficiaryId.business_name}</span>
                                <span>To be redeemed on or before</span><span>&nbsp;{P.date_to_redeem}</span>
                                <span className="bg-color-grey">&nbsp;{P.date_to_redeem_pledge}</span>
                                <div className="o-position-flex-content-end">
                                    <button onClick={e=>{this.payWithPaystack(P)}} className="btn btn-success o-correct-btn-radius">Redeem
                                       &nbsp;&nbsp;&nbsp; <i className="lni-angle-double-right"></i>
                                    </button>
                                </div>
                            </CardBody>
                        </Card><br /><br />
                    </div>
                    
                )
            })}
        </div>
        )
    
    }
}

export default PledgesUnredeemed;