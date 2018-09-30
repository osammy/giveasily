import React, {Component} from 'react';
import { Card, CardBody } from 'mdbreact';
import Checkbox from '@material-ui/core/Checkbox';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import axios from 'axios';
import {getUrl }from '../data/urlController'
import USER from '../data/userData'
import {addusers} from '../Actions';
import {connect} from 'react-redux';
import ReactLoading from 'react-loading'


class VerifyCoporateUser extends Component {

constructor(props){
    super(props);


    this.state = {
        users:[],
        allUsers:[],
        perPage:10,
        pageNumber:1,
        initial:1,
        startDate:moment().subtract(1,'months'),
        endDate:moment(),
        category:'coporate',
        showLoading:false

    }


    this.verifyCoporateUser = this.verifyCoporateUser.bind(this);
    this.getData = this.getData.bind(this);
    this.paginationResult = this.paginationResult.bind(this);
    this.handleDataSuccess = this.handleDataSuccess.bind(this);
    this.goToPage = this.goToPage.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.getLastPageNumber = this.getLastPageNumber.bind(this);
    this.viewUser = this.viewUser.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleInput = this.handleInput.bind(this)
    this.findUsers = this.findUsers.bind(this)
}

componentDidMount() {
const that = this;
this.findUsers();
// const options = {
//         method: 'GET',
//         url: url,
//         headers: {
//             'Content-Type': 'application/json',
//             'x-access-token':  USER.getLocalStorageUserData().token
//         },
//         params:{
//             category:'coporate',
//             completed_email_verification:true
//         }
//     }


// this.getData(options)
//     .then(this.handleDataSuccess)
//     .catch(function(err){
//         console.log(err)
//     })

}

handleDataSuccess(response) {
        if(response.status === 200) {
            const allUsers = response.data;
            const dataLength = allUsers.length;
            this.lastPageNumber = this.getLastPageNumber(dataLength);
            const users= this.paginationResult(this.state.perPage,this.state.pageNumber,allUsers);
            
            this.setState({
                users,
                allUsers,
                showLoading:false
            })

        }
}


verifyCoporateUser(i,id){
    const that = this;
    const url = getUrl('users') +"/"+id;
    const options = {
        method: 'PUT',
        url: url,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token':  USER.getLocalStorageUserData().token,
        },
        data:{complete:true}
    }

    axios(options)
        .then(function(response){
                if(response.status === 200) {
                    const data = response.data;
                        console.log(data);
                        const copyOfUsers = JSON.parse(JSON.stringify(that.state.users));
                        copyOfUsers[i] = data;
                        that.setState({
                            users:copyOfUsers
                        })
                    
                }
        })
        .catch(function(err) {
            console.log(err);
        })


}



getData(options) {
    return axios(options)

}

viewUser(user) {

}



getLastPageNumber(lengthOfData){

    return Math.ceil(lengthOfData/this.state.perPage);
}

paginationResult(perPage,pageNumber,allUsers){   
    const endPage = pageNumber * perPage;  
    const lengthOfAllData = allUsers.length;
    const endAt = (endPage > lengthOfAllData)  ? lengthOfAllData:endPage;
    const startAt = endPage - perPage;
    const users = allUsers.slice(startAt,endAt);
    
    return users;

}
goToPage(){
    const users = this.paginationResult(this.state.perPage,this.state.pageNumber,this.state.allUsers)
        this.setState({
            users
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

getPaginationButtonNo(i) {
    console.log(typeof this.state.pageNumber)
return this.state.PageNumber+i
}

handleInput(e) {
    const type = e.target.value;
    this.setState({
        type
    })
}


handleStartDateChange(date){
console.log(date)
this.setState({
    startDate:date
})
}
handleEndDateChange(date){
console.log(date)
this.setState({
    endDate:date
})

}

handleInput(e) {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({
        [name]:value
    })
}

findUsers=()=>{
    const that = this;
    const startAt = this.state.startDate.toISOString();
    const endAt = this.state.endDate.toISOString();
    const category = this.state.category;
    const url = getUrl('query_users')
    this.setState({
        showLoading:true
    })
    
const options = {
        method: 'GET',
        url: url,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token':  USER.getLocalStorageUserData().token,
        },
        params:{
            startAt,
            endAt,
            category
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
  render() {
    const  nextClass = (this.state.pageNumber === this.lastPageNumber||this.state.users.length === 0) ?
     "page-item disabled":"page-item"
    const prevClass = (this.state.pageNumber === 1||this.state.users.length === 0) ?
     "page-item disabled":"page-item";
    const handleLoading = this.state.showLoading ? "display-blockade":"dont-display"
    return (
<div className="container">
        <div>
            <span className="top-form-select" >
                <select name="category" value={this.state.category} onChange={this.handleInput} className="form-control">
                    <option value="coporate">Coporate</option>
                    <option value="personal">Personal</option>
                    <option value="all">All</option>
                </select>
            </span>
            <div style={{float:"right"}} className="row">
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
               <div className="col"><button  onClick={this.findUsers} className="btn bg-theme p-2">Find Users</button></div>
            </div>
       </div>
       <br /><br /><br />
 {/*<Card style={{background:"white", width:"100%"}}>
    <CardBody style={{padding:"0px"}}>*/}
        <div style={{display:"flex",justifyContent:"center"}}>
            <ReactLoading  className={handleLoading} type="bars" color="#290c49" height={'5%'} width={'5%'} />
         </div>        
         <table className="table table-hover  table-condensed">
        <thead>
                <tr >
                <td className="page-table-row">No</td>
                <td className="page-table-row">Verified</td>
                <td className="page-table-row">Business Name</td>
                <td className="page-table-row">Plan</td>
                <td className="page-table-row">Email</td>
                <td className="page-table-row">Paid At</td>
                <td className="page-table-row">Action</td>
            </tr>
        </thead>
        <tbody className="animated fadeIn">

            {this.state.users.map((U,i)=>{
             return (
                
                <tr onClick={()=>{this.viewUser(U)}}  key={i}>
                    <td>{i+1}</td>
                    <td ><Checkbox 
                        indeterminate={!U.complete}
                        checked={U.complete}
                        onChange={this.onSelectAllClick}
                        style={{color:(U.complete)?"green":"red"}} /></td>
                    <td>{U.business_name}</td>
                    <td>{U.plan}</td>
                    <td>{U.email}</td>
                    <td>{moment(U.created_at).format('MMM Do YYYY, h:mm:ss a')}</td>
                    <td><button className="btn btn-default p-2" onClick={()=>{this.verifyCoporateUser(i,U._id)}}>Verify User</button></td>
                    
                </tr>
                )
            })}
        </tbody>
        <tfoot  style={{display:this.state.allUsers.length === 0?"flex":"none",justifyContent:"center"}}>
            <tr ><td>No Registered user during this time</td></tr>
        </tfoot>
</table>
    {/*</CardBody>
</Card>*/}
<br /><br /><br />
<p className={this.state.users.length === 0?"o-visibility-hidden":"o-visibility-visible"}>Showing pages: {this.state.pageNumber} of {this.lastPageNumber}</p>

<div className="float-right">
<nav aria-label="Page navigation example">
  <ul  className="pagination">
    <li name="prev" className={prevClass}><a className="page-link" onClick={this.previous}>Previous</a></li>
&nbsp;&nbsp;
     <li  className="page-item bg-theme color-white">
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
)
  }

}

export default VerifyCoporateUser;