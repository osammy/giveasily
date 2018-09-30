import React from 'react'
import '../../css/main.css'
import {Header, Footer} from '../dashboard/utils';
import butIcon from '../../logo/buticon.png'
import sampleIcon from '../../logo/sample.png';
import pledgeIcon from '../../logo/h.png';
import trackIcon from '../../logo/t.png';
import redeemIcon from '../../logo/m.png';
import setupFeeIcon from '../../logo/l.png';
import pledgeTrackingIcon from '../../logo/h22.png';
import payoutIcon from '../../logo/A.png';
import reportingIcon from '../../logo/r.png';
import instantEmailIcon from '../../logo/me.png'
import donationIcon from '../../logo/take.png'
import d1Icon from '../../logo/d1.png'
import d3Icon from '../../logo/d3.png'
import d4Icon from '../../logo/d4.png'
import securityIcon from '../../logo/security.png'
import adeIcon from '../../logo/ade.png'
import pciIcon from '../../logo/pci.png'
import mcaIcon from '../../logo/mca.png'
import olaIcon from '../../logo/ola.png'
import timiIcon from '../../logo/timi.png'
// import reportingIcon from '../../logo/r.png'
// import reportingIcon from '../../logo/r.png'
// import reportingIcon from '../../logo/r.png'
// import reportingIcon from '../../logo/r.png'
// import reportingIcon from '../../logo/r.png'
// import reportingIcon from '../../logo/r.png'

export const IndexPage = (props)=>{
    return (
    <div>
  
    <Header />
  <section id="headbanner">
       <div className="d-container o-landing-position-relative">
        
            <div className="layerleft"><h1> Financial Pledging &amp; Online <br />Giving Made Easy.</h1> 
        
        <p>Automate your financial pledging and donation process.<br />Increase your pledge redemption rate by up to 200%. 
            <br />Give or Receive Donations easily. Sign up. It's absolutely free. 
           </p>
        
           <div className="playlogo"><img src={butIcon} width="40%" /> </div>
           
           </div>
           
           <div  className="layerright o-modify-landing"> <img src={sampleIcon} width="120%" /></div>
           
       </div>
        
        
        
</section>
    
    <section id="smart">
        <div className="d-container">
        
        <h1> The Smarter Way To Donate <br /> &amp; Manage Pledging Process </h1>
            
            <p> Giveasily is Africa’s first financial technology app designed to track financial pledges 
                from when they are made to when they <br />are fulfilled. It’s the best online tool for 
                giving or receiving online donations easily. There’s no need to promise and fail anymore,
                 <br />with giveasily app, you can now make financial pledges to anyone or any organization
                  and redeem them effortlessly.   
            </p>
        
        
         <div className="box">
             
             <img src={pledgeIcon} />
             <h3> Make A Pledge</h3>
             <p>
             Register on giveasily, make a pledge or donate money to any registered  user in simple steps. 
             Define the amount you want to pledge or give and set the time you wish to redeem your financial pledge. 
            </p>
            
            
            
            </div>
            
            <div className="box">
             
             <img src={trackIcon} />
             <h3> Track Your Pledge/Donations</h3>
             <p>
             Giveasily goes into action by tracking your pledge(s) and donations based on the parameters you have set. 
             It gives you scheduled reminders before the set date of redemption in the case of pledging.  
 
               </p>
            
            
            
            </div>
            
            <div className="box">
             
             <img src={redeemIcon} />
             <h3> Redeem Your Pledge or Donate</h3>
             <p>
             Easily redeem your pledge either by giving giveasily the instruction to deduct the set amount directly 
             from your account or by sending you and pledge redemption page. <br />You can also make instant donation. 

               </p>
            </div>
        
        </div>        
</section>

<section id="allfeat">
    <div className="d-container">
    
    <div className="lefttext">
        <h1>Features That Make Us Unique</h1>
        <p>  We will be glad to have you experience what makes us unique. 
            Giveasily features are designed to put the user in charge and make it effortless for users to make online 
            donations and financial pledges, get redeemed pledges and access reliable
             report of all transactions in one place. 
        </p>
    </div>

    <div className="feat">
        
        <ul>
        
        <li> <div className="eachbox">
        <img src={setupFeeIcon} />
            <h3> Zero Setup Fee</h3>
        <p> No fee necessary to create an account on Giveasily. Register now, It’s absolutely Free! </p>
        
        </div>
            
        </li>

        <li><div className="eachbox">
        <img src={pledgeTrackingIcon} />
            <h3> Pledge Tracking</h3>
        <p> Accept financial pledges &amp; get smart tools for tracking all the pledges made by donors. </p>
        
        </div>
            
            </li>
        <li><div className="eachbox">
        <img src={payoutIcon} />
            <h3> Next Day Payout</h3>
        <p> Receive the value of financial pledges or donations into your bank account the next day. </p>
        
        </div>
            
            </li>
        <li>
            <div className="eachbox">
        <img src={reportingIcon} />
            <h3> Real-time Reporting</h3>
        <p> Gain reliable insight from reports &amp; behavioral analytics from your dashboard in real-time. </p>
        
        </div>
            
            </li>
        <li>
            
            <div className="eachbox">
        <img src={instantEmailIcon} />
            <h3> Instant Email Receipts</h3>
        <p> Donors will instantly receive email receipt with the detail of every donation they made.</p>
        
        </div>
            
            </li>
        <li>
            
            <div className="eachbox">
        <img src={donationIcon} />
            <h3> Instant Donation</h3>
        <p> Users can make instant financial donations. Schedule weekly or monthly donations. </p>
        
        </div>
            
            </li>
        <button> Sign Up Now, It’s Free </button>
        
        </ul>
        
        
        
        </div>
    
    
    </div>
    
    

</section> 

    
    <section id="donate">
    <div className="d-container">
    
        <h1> Donate &amp; Make Pledges <br />on Multiple Platforms </h1>
            
            <p> 
                We understand that people who wants to donate to your cause or make financial pledges are everywhere at different times. They will prefer to make their donations or financial pledges at their own convenience. That’s why we made givasily accessible online, on mobile, via SMS and on pledging kiosks. Whichever platform you prefer, you can effortlessly donate or make financial pledges and track everything in one place.
  
            </p>
        
    <div className="donathings">
        
        
        
      <div> <img src={d1Icon} /></div>
       <div><img src={d3Icon} /></div>
         <div><img src={d4Icon} /></div>
        <div><img src={d4Icon} /></div>
         <div><img src={d4Icon} /></div>
        <div><img src={d4Icon} /></div>
        
       
        
        
        
        </div>
    
    <button> Sign Up Now, It’s Free </button>
    </div>
    
    

</section> 
    
    <section id="secure">
    
    <div className="d-container">
    
    
       <img src={securityIcon} /> 
        
        
    <h1>How Safe is Giveasily?</h1>
    
    <p>  Giveasily is built on bank-grade security features on top of a PCI DSS Level 1 compliant <br />
    payment processor for security of data. We take the security <br />of our platform very seriously.
        </p>
        
       <div className="secureme">
        <img src={pciIcon} />
        <img src={mcaIcon} />
           
           </div>
    
    </div>
    
    
    
    </section>
    
    <div id="wrap">
   <div className="d-container">
    
       <h1>Read Feedback From Our Users</h1>
       <p>Join thousands of Africans using giveasily to make online donations and redeeming their pledges. </p>
       <div className="row">
       <div className="card col-sm p-0 m-2">
     <img src={olaIcon} alt="osa" style={{width:"100%"}} />  
        
        <div className="contain">
        
        <h4 className="mt-4"><b> OLAWUNMI SULE</b></h4>
        <p>Giveasily app is revolutionary. The app helps me redeem multiple financial pledges to my church and family. I particularly love the ability to automate my financial pledges from within the app.</p>
        
            
            
            </div>
    
    </div>
   
        <div className="card col-sm p-0 m-2">
            <img src={adeIcon} alt="ola" style={{width:"100%"}} />  
        
        <div className="contain">
        <h4 className="mt-4"><b> PST. SEGUN ADEDEJI</b></h4>
        
        <p>
            Giveasily helps my church to increase its cash inflow. Now, church members who don’t have money at the moment<br />
             can make financial pledges and giveasily takes care <br />of the rest.
        </p>
        
        </div>
    
    </div>
   
        <div className="card col-sm p-0 m-2">
            <img src={timiIcon} alt="timi" style={{width:"100%"}} />  
        
        <div className="contain">
        <h4 className="mt-4"><b> TEMILADE IBRAHIM</b></h4>
        <p>
            Wow! There’s nothing like giveasily. It’s an amazing app that have been helping me take care of the pledges I make
             to my friends and NGO’s. I get sweet reminders and reports in my dashboard. 
            
        </p>
        </div>
    
    </div>
    </div>
       
       <button> Sign Up Now, It’s Free </button>
       </div>
    </div>

    
<Footer />
</div>
    )
}