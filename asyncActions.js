const redux = require('redux')
const thunk = require('redux-thunk').default
const axios = require('axios')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware

const initialState={
    loading:false,
    users:[],
    error:''
}


const FETCH_USERS_REQUEST='FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS='FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE='FETCH_USERS_FAILURE'


const fetchUsersRequest= () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess= (users) => {
    return {
        type: FETCH_USERS_REQUEST,
        payload: users
    }
}

const fetchUsersFailure= (error) => {
    return {
        type: FETCH_USERS_REQUEST,
        payload: error
    }
}


const reducer = (state = initialState, action) => {
    switch(action.type){
            case FETCH_USERS_REQUEST:
            return{
                ...state,
                loading: true
            }
            case FETCH_USERS_SUCCESS:
            return{
                loading:false,
                users: action.payload
            }
            case FETCH_USERS_FAILURE:
            return{
                loading:false,
                users: [],
                error: action.payload
            }
    }
}

// 
const fetchUsers = () =>{
    return function(dispatch) {
        dispatch(fetchUsersRequest)
        axios.get('https://jsonplacholder.typicode.com/users')
        .then(res => {
            //res.data is array of usrs
            const users = res.data.map(users => users.id)
            dispatch(fetchUsersSuccess(users))
        })
        .catch(error =>{
            //errro.message is the errro messgae
            dispatch(fetchUsersFailure(error.message))
        })
    }
}

// store
const store = createStore(reducer, applyMiddleware(thunk))

store.subscribe(() => {console.log(store.getState())})
store.dispatch(fetchUsers())