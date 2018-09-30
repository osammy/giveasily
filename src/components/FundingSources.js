import React, {Component} from 'react'
import CreditCardIcon from '@material-ui/icons/CreditCard';
import axios from 'axios'

class FundingSources extends Component {
    constructor(props) {
        super(props);
        this.state ={

        }
    }

    getUserAuthorisation


    render() {


        return (
            <div className="container">
                <div className="width-70-percent margin-zero-auto">
                    <h2>Funding Sources </h2><br /><br /><br />
                    <h3><CreditCardIcon /> Debit Cards</h3><br />
                    <div>
                        <p>Access Bank ***********1234</p>
                    </div><br />

                    <div>
                        <p>Guaranteed Bank ***********1234</p>
                    </div><br />

                    <div>
                        <p>Access Bank ***********1234</p>
                    </div><br />
                </div>
            </div>
        )
    }
}

export default FundingSources;