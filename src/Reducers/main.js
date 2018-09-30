export const donationsReducer = function(state={}, action) {
    switch(action.type) {
        case 'donations':
        return state

        case 'addDonation':
        return state.concat(action.payload)
        

        default:
        return state;
    }
    
}

export const userReducer = function(state={}, action) {
    switch(action.type) {
        case 'addUser':
        return {...action.payload}

        default:
        return state;
    }
}

export const donationsOrPledgesReducer = function(state=[], action){
    switch(action.type){
        case 'addDonationsOrPledges':
        return action.payload;

        default:
        return state;
    }
}
