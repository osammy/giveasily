const BASEURL = ""
const login = `${BASEURL}/api/v1/users/login`;
const registerUrl = `${BASEURL}/api/v1/users/register`
const bvn = `${BASEURL}/api/v1/bvn`;
const usersUrl = `${BASEURL}/api/v1/users`;
const complete_coporate_user_reg =`${BASEURL}/api/v1/users/coporate/complete_reg`;
const pledge = `${BASEURL}/api/v1/pledges`;
const get_unredeemed_pledge =`${BASEURL}/api/v1/pledges/unredeemed`;
const verify_payment = `${BASEURL}/api/v1/donations/verify`
const get_all_donations =`${BASEURL}/api/v1/donations`;
const get_outgoing_donations = `${BASEURL}/api/v1/donations/outgoing`
const get_outgoing_pledges = `${BASEURL}/api/v1/pledges/outgoing`;
const get_incoming_donations = `${BASEURL}/api/v1/donations/incoming`
const get_incoming_pledges = `${BASEURL}/api/v1/pledges/incoming`;
const verify_coporate_user = `${BASEURL}/api/v1/users/coporate/verify`;
const get_donations_count = `${BASEURL}/api/v1/starter/donations_count`
const get_pledges_count = `${BASEURL}/api/v1/starter/pledges_count`;
const get_donations_amount = `${BASEURL}/api/v1/starter/donations_amount`;
const starter = `${BASEURL}/api/v1/starter`;
const query_users = `${BASEURL}/api/v1/users/user_query`;
const pages = `${BASEURL}/api/v1/pages`
const bank = `${BASEURL}/api/v1/bank`





export const getUrl = function(purpose){
    switch(purpose) {
        case 'registeration':
        
        return registerUrl;

        case 'login':
        return login;

        case 'bvn':
        return bvn;

        case 'users':
        return usersUrl;

        case 'coporate_registeration':
        return complete_coporate_user_reg;

        case 'pledge':
        return pledge;

        case 'get_unredeemed_pledge':
        return get_unredeemed_pledge;

        case 'verify_payment':
        return verify_payment;
        
        case 'get_all_donations':
        return get_all_donations;

        case 'get_outgoing_donations':
        return get_outgoing_donations;

        case 'get_outgoing_pledges':
        return get_outgoing_pledges;

        case 'verify_coporate_user':
        return verify_coporate_user;

        case 'get_donations_count':
        return get_donations_count;

        case 'get_pledges_count':
        return get_pledges_count;

        case 'get_donations_amount':
        return get_donations_amount;

        case 'get_incoming_pledges':
        return get_incoming_pledges

        case 'get_incoming_donations':
        return get_incoming_donations

        case 'starter':
        return starter

        case 'query_users':
        return query_users;

        case 'pages':
        return pages;

        case 'bank':
        return bank;

    }
}