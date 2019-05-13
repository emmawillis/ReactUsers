import { createStore } from "redux";

function reducer(state, action) {
    if (action.type === "userClick") {
        state.currentUser = action.payload;
    }
    else if (action.type === "dataLoad") {
        state.loadedUsers = action.payload;
    }
    return state;
}

const store = createStore(reducer, {currentUser: null, loadedUsers: []});

store.subscribe(() => {
    console.log("store changed", store.getState())
});

export default store;