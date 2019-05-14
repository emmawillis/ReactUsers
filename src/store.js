import { applyMiddleware, createStore } from "redux";


const logger = (store) => (next) => (action) => {
    console.log("action fired");
    next(action)
}

const middleware = applyMiddleware(logger);

function reducer(state, action) {
    if (action.type === "userClick") {
        state = {...state, currentUser: action.payload}
    }
    else if (action.type === "dataLoad") {
        state = { ...state, loadedUsers: action.payload }
    }
    return state;
}

const store = createStore(reducer, {currentUser: null, loadedUsers: []}, middleware);

store.subscribe(() => {
    console.log("store changed", store.getState())
});

export default store;