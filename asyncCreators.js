//asyncrons action 
const redux=require('redux')
const createStore=redux.createStore
const applyMiddleware=redux.applyMiddleware
const thunkMiddleware=require('redux-thunk').default
const axios=require('axios')


const intitialState={
    loading:true,
    user:[],
    error:''
}
const FETCH_USER_REQUEST='FETCH_USER_REQUEST'
const FETCH_USER_SUCESS='FETCH_USER_SUCESS'
const FETCH_USER_FAILURE='FETCH_USER_FAILURE'


const fetchUserRequest=()=>{
    return {
        type:FETCH_USER_REQUEST
    }
}

const fetchUserSucess=(users)=>{
    return {
        type:FETCH_USER_SUCESS,
        payload:users

    }
}
const fetchUserFailure=(error)=>{
    return {
        type:FETCH_USER_FAILURE,
        payload:error
    }
}

const reducer=(state=intitialState ,action)=>{
    switch(action.type){
        case 'FETCH_USER_REQUEST':{
            return {
               ...state, loading:true,
            }
        }

        case 'FETCH_USER_SUCESS'   :
        return  {
            loading:false,
            user:action.payload,
            error:''
        }    
        case 'FETCH_USER_FAILURE'  :
            return{ loading :false,
                user:[],
            error:action.payload}
        }
}
//asyn action creatore
const fetchusers=()=>{

 return function(dispatch){
     dispatch(fetchUserRequest)
     axios.get('https://jsonplaceholder.typicode.com/users')
     .then(resposne=>{
         const users=resposne.data.map(user=>user.id)
         dispatch(fetchUserSucess(users))


     }).catch(err=>{
         dispatch(fetchUserFailure(err.message))

     })

 }
}

const store=createStore(reducer,applyMiddleware(thunkMiddleware))
store.subscribe(()=>{console.log(store.getState())})
store.dispatch(fetchusers())

