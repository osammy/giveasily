import React, {Component} from 'react'
import {Header, Footer} from '../dashboard/utils';

class Pricing extends Component {
    state = {
      amount:2000,
      yourSettlement:1960
    }

handleChange = (e)=>{
    e.preventDefault();

    if(!e.target.validity.valid) return ;

    const conditionalCharge = 300;
    const maxCharge =  5000;
    const amount = Number(e.target.value)
    const maxAmountWithoutConditionalCharge = 2000;
    if(amount > maxAmountWithoutConditionalCharge) {
        const yourPay = amount - (amount * 0.02) + conditionalCharge;
        const charge = (amount * 0.02) + conditionalCharge;
        const yourCharge = (charge > maxCharge) ? maxCharge: charge;
                console.log("one charge",yourCharge)

        const yourSettlement =  amount - yourCharge;
        console.log("one",yourSettlement)
        this.setState({
            amount,
            yourSettlement
        })
    }

    else {
        const yourSettlement =  (amount * 0.98);

        this.setState({
            amount,
            yourSettlement
        })
    } 


}

  componentDidMount(){
    this.amountInput.focus();
  }

    render() {
        return (
    <div>
        <Header />
          <section id="wrap2">
    <div className="d-container">
    <h1> Pricing</h1>
        <p> Simple &amp; Transparent Commission Based Pricing </p>
    
    <div className="col">
    <ul className="price-box">
       <li className="header">Local Transactions</li> 
        <li className="emph"><strong><h3>2% + NGR 300</h3></strong><p>per successful local card charge</p></li>
        <li>The ₦300 fee is waived for all transactions less than ₦2,000.</li>
        
        <li>Local transactions fees are capped at ₦5,000, this means that the absolute maximum you'll ever pay in fees 
            per transaction.</li>
        
        
        
        </ul>
    
    </div>
    
    <div className="col">
    <ul className="price-box best">
       <li className="header header-green">Int’l Transactions</li> 
        <li className="emph"><strong><h3>4.5% + NGR 300</h3></strong> <p>per successful international transaction</p></li>
        <li>The ₦300 fee is waived for all transactions less than ₦2,000.</li>
        <li>International cards are charged and settled in Naira. <br />You'll soon be able to get settled <br />in USD.</li>
        
        
        
        </ul>
    
    </div>
     
    
    
    
    
    
    </div>
    
    </section>
 
     <section id="cal">
    <div className="d-container">
    <div className="conme">
        
        <span style={{fontSize:"45px"}}> Lets Do The Math For You</span>
          
        <p>Understand how much giveasily charge you whenever someone fulfill 
his or her financial pledge <br />or donate to you. Enter an amount into the calculator
 to see our charges. </p>
        <h1>IF ANYONE PLEDGED TO GIVE YOU </h1>
       
        <div className="cashbox"> 
            <span >
                <span style={{fontSize:"2em"}}>&#8358;</span> 
            <input ref={(input) => { this.amountInput = input; }}  pattern="[0-9]*" onChange={this.handleChange} maxLength="13"  value={this.state.amount} className="form-control" type="text" /></span>
        </div><br /><br /><br />
        
        <div className="para"><p> WE’LL SETTLE YOU: <b>NGR {this.state.yourSettlement}</b> | 2% GIVEASILY FEES: NGR 100</p></div>
        
        <ul>
        
        <li> <b>&#10003;</b>  Free automatic settlement within 24 hours.</li>
        <li> <b>&#10003;</b>  Local fees capped at NGN 5,000.</li>
        <li> <b>&#10003;</b>  No hidden fees or charges.</li>
        <li> <b>&#10003;</b>  Highly secure transaction channel.</li>
        <li><button> Sign Up Now, It’s Free </button>  </li>
        
        </ul>
        
        
        
        </div>
        
        </div>
    
    </section>
    <Footer />
    </div>
)
    }
}

export default Pricing;