const redux = require('redux')
const reduxlogger = require('redux-logger')
const createStore = redux.createStore
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware
const logger = reduxlogger.createLogger()

//action type
const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM= 'BUY_ICECREAM';



// action creator - fnc that returns action type
function buyCake(){
    return{
        type: BUY_CAKE,
        info: 'info'
    }
}

function buyIcecream(){
    return{
        type: BUY_ICECREAM,
        info: 'info'
    }
}



// (previousState, action)=> newState

// const initialState = {
//     numOfCakes:10,
//     numOfIcecream:20
// }
const initialCakeState = {
    numOfCakes:10
}
const initialIceCreamState = {
    numOfIcecream:20
}

// const reducer = (state=initialState, action) => {
//     switch(action.type){
//         case BUY_CAKE: 
//         return{
//             ...state,
//             numOfCakes: state.numOfCakes -1
//         }
//         case BUY_ICECREAM:
//             return{
//                 ...state,
//                 numOfIcecream: state.numOfIcecream-1
//             }
//         default: return state
//     }
// }

const cakeReducer = (state=initialCakeState, action) => {
    switch(action.type){
        case BUY_CAKE: 
        return{
            ...state,
            numOfCakes: state.numOfCakes -1
        }
        default: return state
    }
}
const iceCreamReducer = (state=initialIceCreamState, action) => {
    switch(action.type){
        case BUY_ICECREAM:
            return{
                ...state,
                numOfIcecream: state.numOfIcecream-1
            }
        default: return state
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    icecream: iceCreamReducer
})

const store = createStore(rootReducer, applyMiddleware(logger))// middle for logging,etcno


//const store = createStore(reducer)  // singlereducer
console.log('initial state', store.getState())
const unsubscribe = store.subscribe(()=>{})
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())
unsubscribe()