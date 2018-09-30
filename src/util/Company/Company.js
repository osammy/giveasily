import React from 'react'
import team1Icon from '../../logo/team1.png';
import team2Icon from '../../logo/team2.png';
import team3Icon from '../../logo/team3.png';
import {Header, Footer} from '../dashboard/utils';




export const Company = ()=>(
     <div>
         <Header />
 <section id="wrap2">
    <div className="d-container">

    <h1>  Our Company</h1>
    
    <p> 
        Gloveries Business Solutions Ltd is an innovative start-up solution company that focused on 
        developing solutions that solves fundamental problems for a large number of target audiences in Africa
         by leveraging on modern web &amp; mobile technologies including AI, AR/VR and Blockchain technologies. 
         At Gloveries, we are driven by Passion, Innovation, Constant Learning, Transparency, Excellent Customer Service and 
         Giving back <br />to the society.  
   </p>
    
        
           <div id="team-area">
   <div style={{width:"100%"}} className="d-container row">
    
       
       <div className="team-area-inner col-sm ">
     <img src={team1Icon} alt="team1" style={{width:"100%"}} />  
        
        <div className="containall">
        
        <h4><b> Paul Oseghale</b></h4>
        <p>Co-founder/CEO</p>
        
            
            
            </div>
    
    </div>
   
        <div className="team-area-inner col-sm">
     <img src={team2Icon} alt="team2" style={{width:"100%"}} />  
        
        <div className="containall">
        <h4><b> Ayoyemi Ayeyemi</b></h4>
        
        <p>Co-founder/Growth </p>
        
        </div>
    
    </div>
   
        <div className="team-area-inner col-sm">
     <img src={team3Icon} alt="team3" style={{width:"100%"}} />  
        
        <div className="containall">
        <h4><b> Samuel Imafidon</b></h4>
        <p> Co-founder/CTO</p>
        
        </div>
    
    </div>
       
       
       </div>
    </div>

    
    </div>
    
    </section>

    
    <section id="about">
    
    <div className="d-container">
  <div className="aboutall">  
   <div className="upperlayer">
      <h1>  About Giveasily</h1>
    
      <p> 
        Giveasily is a web and mobile app solution developed for Associations, NGO’s, NPO’s, Religious organization and Philanthropies <br />
        by a small team of passionate friends working together from all over the world to simplify the way our 
        audience make and receive <br />financial pledges and donations in Africa. 

        </p>
       
    </div> 
    
    <div className="vimi"> 
        
       <div className="vision"> 
        
        <h1> Our Vision </h1>
        
        <p> To become the most preferred and reliable digital giving <br />and engagement management solution provider in Africa.</p>
        
        </div>    
        <div className="mission"> 
        
        <h1> Our Mission </h1>
        
        <p> To constantly find simpler, quicker and more innovative ways of helping our clients to collect more donations and improve the ways they engage with their donors.</p>
        
        </div>
        </div>
    
    </div>
    </div>
    </section>
    <Footer />
    </div>
)