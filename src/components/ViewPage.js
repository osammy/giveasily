import React,{Component} from 'react';
import ReactLoading from 'react-loading'
import { Card, CardBody, ToastContainer, toast } from 'mdbreact';
import Checkbox from '@material-ui/core/Checkbox';
import moment from 'moment';
import axios from 'axios';
import {getUrl }from '../data/urlController'
import USER from '../data/userData'
import CheckIcon from '@material-ui/icons/Check'
import CopyIcon from '@material-ui/icons/FileCopy'
import ArrowRightIcon from '@material-ui/icons/ArrowRightAlt';


class ViewPage extends Component {
    constructor(props){
        super(props);
        if(Boolean(this.props.location.state)){
            const page = this.props.location.state.pageData
            this.state = {
                page,
                loading:false
            }
            this.loaded = true;
        } else {
            this.loaded = false;
            this.pageId = this.props.match.params.id;
            this.slug = this.props.match.params.slug;
            this.state = {
                page:{},
                loading:false
            }
        }

    }

componentDidMount(){
    if(this.loaded)  return

    this.getPage();


}
onCheckBoxClick = ()=>{

}

getPage = ()=>{


const url = getUrl('pages') +"/"+this.pageId + "/"+this.slug;
const options = {
    method:'GET',
    url:url,
    headers: {
        'Content-Type': 'application/json',
        'x-access-token':  USER.getLocalStorageUserData().token
    }
}
axios(options)
    .then(this.handleSuccess)
    .catch(this.handleError)

}

handleSuccess = (response)=>{
const page = response.data;
this.setState({
    page,
    loading:false
})
}

handleError = (err)=>{
console.log(err)
this.setState({
    loading:false
})
}

toggleActive = ()=>{
    this.setState({
    loading:true
})

    const url = getUrl('pages')+"/" + this.state.page._id  +  "/"  +this.state.page.slug;
    const options = {
        method:'PUT',
        url:url,
        data:{
            active:!this.state.page.active
        },
        headers: {
        'Content-Type': 'application/json',
        'x-access-token':  USER.getLocalStorageUserData().token
        }
    }

    axios(options)
        .then(this.handleSuccess)
        .catch(this.handleError)
}

render() {
    const colorClass = this.state.page.published?"color-green medium-font-size":"color-red medium-font-size"
    let buttonClass = this.state.page.active?"bg-red btn float-right":"btn btn-success float-right";
    let buttonText = this.state.page.active?"Deactivate":"Activate"
    let statusText = this.state.page.active?"active":"inactive";
    if(this.state.loading) buttonText = "Loading..."
    
    

    return (
        <div className="container"><br />
            <div className="center-page">

                <div className="input-group mb-2 ">
                    <div className="input-group-prepend">
                        <div className="input-group-text cursor-pointer"><CopyIcon />&nbsp;&nbsp; Copy Link</div>
                    </div>
                    <input style={{background:"white"}} readOnly defaultValue={this.state.page.url}  type="text" className="form-control p-4 modify-input" id="inlineFormInputGroup" placeholder="" />
                    <div className="input-group-append">
                        <div className="input-group-text px-3">
                            <a className="color-blackish" href={this.state.page.url} target="_blank">Visit Link &nbsp;&nbsp;<ArrowRightIcon /></a> 
                        </div>
                    </div>
                </div>
                
                <div className="page-content-layout ">
                    <p>Name</p>
                    <p>{this.state.page.name}</p>
                </div>
                <div className="page-content-layout">
                    <p>Status</p>
                    <p className={colorClass}>
                         {statusText} <CheckIcon style={{display:(this.state.page.active?"inline":"none")}} />
                    </p>
                </div>
                <div className="page-content-layout ">
                    <p>Page Type</p>
                    <p>{this.state.page.type}</p>
                </div>
                <div className="page-content-layout ">
                    <p>Page Type</p>
                    <p>{this.state.page.amount !== ""?this.state.page.amount:"open"}</p>
                </div>
                <div className="page-content-layout">
                    <p>Currency</p>
                    <p>{this.state.page.currency}</p>
                </div>
                <div className="page-content-layout">
                    <p>Created On</p>
                    <p>{moment(this.state.page.paystack_updated_at).format('MMM Do YYYY, h:mm:ss a')}</p>
                </div>
                <button disabled={this.state.loading} onClick={this.toggleActive}  className={buttonClass}>
                    {buttonText}
                </button>
            </div>
        </div>
    )
}
}

export default ViewPage;