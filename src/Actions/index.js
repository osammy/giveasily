export const addDonation = function({type,payload}){
    return {
        type,payload
    }
}
export const addUser = function({type,payload}) {
    console.log(type)
    console.log(payload)
    return {
        type,payload
    }
}

export const addDonationsorPledges = function({type, payload}) {
    return {
        type,payload
    }
}