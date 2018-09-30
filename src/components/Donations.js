import React, {Component} from 'react';
import { Card, CardBody } from 'mdbreact';
import Checkbox from '@material-ui/core/Checkbox';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import axios from 'axios';
import {getUrl }from '../data/urlController'
import USER from '../data/userData'
import {addDonationsorPledges} from '../Actions';
import {connect} from 'react-redux';
import ReactLoading from 'react-loading'


const mapDispatchToProps = dispatch =>{
    return {
        addDonationsOrPledges:donationsOrPledges=>dispatch(addDonationsorPledges(donationsOrPledges))
    }
}

const mapStateToProps = state =>{
    return {
        donationsOrPledges:state.donationsOrPledges
    }
}
class Donations extends Component {

constructor(props){
    super(props);


    this.state = {
        startDate: moment().subtract(1,'months'),
        endDate:moment(),
        complete:false,
        type:'donations',
        inOrOut:"incoming",
        donationsOrPledges:[],
        allDonationsOrPledges:[],
        showLoading:false,
        perPage:5,
        pageNumber:1,

    }

    this.onSelectAllClick = this.onSelectAllClick.bind(this);
    this.verifyCoporateUser = this.verifyCoporateUser.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this)
    this.paginationResult = this.paginationResult.bind(this);
    this.handleDataSuccess = this.handleDataSuccess.bind(this);
    this.goToPage = this.goToPage.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.getLastPageNumber = this.getLastPageNumber.bind(this);
}

componentDidMount() {
const that = this;
this.findDonationsOrPledges();
//const url = getUrl('get_all_donations')






}

handleDataSuccess(response){
        if(response.status === 200){
            const allDonationsOrPledges = response.data;console.log(allDonationsOrPledges)
            const dataLength = allDonationsOrPledges.length;
            this.lastPageNumber = this.getLastPageNumber(dataLength);

 
            if(dataLength && (dataLength !== 0)) {
                const type = "addDonationsOrPledges";
                const payload = allDonationsOrPledges;
                this.props.addDonationsOrPledges({type,payload});
            }
            const donationsOrPledges= this.paginationResult(this.state.perPage,this.state.pageNumber,allDonationsOrPledges)

                this.setState({
                donationsOrPledges,
                allDonationsOrPledges,
                showLoading:false
            })
            


        }
    }

findDonationsOrPledges=()=>{
    const that = this;
    const startAt = this.state.startDate.toISOString();
    const endAt = this.state.endDate.toISOString();
    const urlText =`get_${this.state.inOrOut}_${this.state.type}`
    
    const url = getUrl(urlText);
    const options = {
        method: 'GET',
        url: url,
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
        .then(this.handleDataSuccess)
        .catch(function(err){
            console.log(err);
            that.setState({
                showLoading:false
            })

        })


}

handleEndDateChange(date){
console.log(date)
this.setState({
    endDate:date
})

}

handleStartDateChange(date){
console.log(date)
this.setState({
    startDate:date
})
}

verifyCoporateUser(e) {
    
}

onSelectAllClick() {
      
}

getLastPageNumber(lengthOfData){

    return Math.ceil(lengthOfData/this.state.perPage);
}

paginationResult(perPage,pageNumber,allDonationsOrPledges){   
    const endPage = pageNumber * perPage;
    
    const lengthOfAllData = allDonationsOrPledges.length;
    const endAt = (endPage > lengthOfAllData)  ? lengthOfAllData:endPage;
    const startAt = endPage - perPage;
    const donationsOrPledges = allDonationsOrPledges.slice(startAt,endAt);
    
    return donationsOrPledges

}
goToPage(){
    const donationsOrPledges = this.paginationResult(this.state.perPage,this.state.pageNumber,this.state.allDonationsOrPledges)
        this.setState({
            donationsOrPledges
        })
}



next(){
    // console.log('this.state.pageNumber == this.noOfPaginationButton')
    //     console.log(this.state.pageNumber+ " == "+ this.noOfPaginationButton)

    if(this.state.pageNumber === this.lastPageNumber){
        alert('pagenumber is max '+this.state.pageNumber)
        return;
    }

        this.setState((prevState)=>({
            pageNumber:prevState.pageNumber+1
        }),this.goToPage)


}


previous(){
if(this.state.pageNumber === 1){
    alert('pagenumber is at  ',this.state.pageNumber)
    return;
}

this.setState((prevState)=>({
    pageNumber:prevState.pageNumber-1
}),this.goToPage)


}



handleInput(e) {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({
        [name]:value
    })
}



  render() {
    const  nextClass = (this.state.pageNumber === this.lastPageNumber || this.state.allDonationsOrPledges.length === 0) ? "page-item disabled":"page-item medium-font-size "
    const prevClass = (this.state.pageNumber === 1 || this.state.allDonationsOrPledges.length === 0) ? "page-item disabled":"page-item medium-font-size "
    const forPledge = (this.state.type === "pledges")?"display-blockade":"dont-display";
    const handleLoading = this.state.showLoading?"display-blockade":"dont-display"
    const showPageDisplayRangeClass = this.state.allDonationsOrPledges.length === 0? "dont-display":"display-blockade"
    const tfootClass = this.state.allDonationsOrPledges.length === 0?"tfoot-content":"dont-display"
    return (
    <div className="container">
        <div>
            <span className="o-donations-select" >
                <select name="inOrOut" value={this.state.inOrOut} onChange={this.handleInput} className="form-control small">
                    <option  value="incoming">INCOMING</option>
                    <option  value="outgoing">OUTGOING</option>
                </select>
            </span>
            <span className="o-donations-select">
                <select name="type" value={this.state.type} onChange={this.handleInput} className="form-control small">
                    <option value="donations">DONATIONS</option>
                    <option value="pledges">PLEDGES</option>
                </select>
            </span>

           
            <div className="row float-right">
                <div className="col"><span className="small">Start Date</span>
                    <DatePicker dayClassName={()=>"calender-day"} 
               className="calender-popper form-control" calendarClassName="calender"
               showYearDropdown dropdownMode="select" name="startdate"
               selected={this.state.startDate} onChange={this.handleStartDateChange} placeholderText="Start date" />
               </div>
                <div className="col"><span className="small">End Date</span>
                    <DatePicker dayClassName={()=>"calender-day"} name="endDate"
               className="calender-popper form-control" calendarClassName="calender"
               showYearDropdown dropdownMode="select"
               selected={this.state.endDate} onChange={this.handleEndDateChange} placeholderText="Start date" />
               </div>
               <div className="col"><button onClick={this.findDonationsOrPledges} className="btn bg-theme">Find</button></div>
            </div>
       </div>
        <br /><br /><br />
<Card style={{background:"white", width:"100%"}}>
    <CardBody style={{padding:"0px"}}>
        <div style={{display:"flex",justifyContent:"center"}}>
            <ReactLoading  className={handleLoading} type="bars" color="#290c49" height={'5%'} width={'5%'} />
         </div>
        <table className="table table-hover  table-condensed">
        <thead >
                <tr className="bg-theme color-white">
                <td>No</td>
                <td>Name</td>
                <td>Amount</td>
                <td>Paid At</td>
                <td>Purpose</td>
                <td className={forPledge}>Redeem On</td>
            </tr>
        </thead>
        <tbody className="animated fadeIn">

            {this.state.donationsOrPledges.map((U,i)=>{
             return (
                
                <tr onClick={()=>{this.viewDonationOrPledge(U)}}  key={i}>
                    <td>{i+1}</td>
                    <td>{U.beneficiaryId.business_name || U.benefactorId.business_name} {U.benefactorId.first_name} &nbsp; {U.benefactorId.last_name}</td>
                    <td>{U.amount}</td>
                    {/*created_at for pledges*/}
                    <td>{moment(U.paystack_paid_at).format('MMM Do YYYY, h:mm:ss a')|| moment(U.created_at).format('MMM Do YYYY, h:mm:ss a')}</td> 
                    <td>{U.purpose}</td>
                    <td className={forPledge}>{U.date_to_redeem_pledge}</td>
                </tr>
                )
            })}
        </tbody>
        <tfoot className={tfootClass} >
            <tr ><td className="medium-font-size" >No data during this time</td></tr>
        </tfoot>
</table>
    </CardBody>
</Card><br /><br /><br />
<p className={showPageDisplayRangeClass}>Showing pages: {this.state.pageNumber} of {this.lastPageNumber}</p>

<div className="float-right">
<nav aria-label="Page navigation example">
  <ul  className="pagination">
    <li name="prev" className={prevClass}><a className="page-link" onClick={this.previous}>Previous</a></li>
&nbsp;&nbsp;
     <li  className="page-item p-1 bg-theme color-white">
        <a style={{color:"white"}} className="p-2 color-white">
          {this.state.pageNumber}
        </a>
     </li>
&nbsp;&nbsp;
    <li name="next" onClick={this.next} className={nextClass}><a className="page-link" >Next</a></li>
  </ul>
</nav>
</div>
</div>
    )}

}

export default connect(mapStateToProps,mapDispatchToProps)(Donations);