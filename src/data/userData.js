const KEY = 'zxhjaaxxcrgiveasilyxjjd11101'
const userData = {
    getLocalStorageUserData:function(){
        return JSON.parse(localStorage.getItem(KEY))
    },

    setLocalStorageUserData:function(user){
        localStorage.setItem(KEY,JSON.stringify(user))
    }
}

export default userData;