import axios from 'axios'

export const ajaxController = (url,params={},body={})=>{
    const controller = {
        get: function(){
            return axios.get(url,{params})
                    
        },
        createOne: function() {
            return axios.post(url,body)
        },
        updateOne:function() {
            return axios.put(url,body)
        },
        deleteAll:function(){
            return axios.delete(url,body)
        }
    }
    return controller;
}

