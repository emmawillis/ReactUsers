import { applyMiddleware, createStore } from "redux";
import { put, call, takeEvery } from 'redux-saga/effects';
import createSagaMiddleware from "redux-saga";

function reducer(state=initialState, action) {
    switch (action.type) {
        case 'USER_CLICK':
            return { ...state, currentUser: action.payload }
        case 'REQUESTED_LIST':
            return { ...state, loading: true, error: false }
        case 'REQUESTED_LIST_SUCCEEDED':
            var newData = state.loadedUsers.concat(action.payload.data)
            return { ...state, loadedUsers: newData, total_pages: action.payload.total_pages, page: action.payload.page, loading: false, error: false }
        case 'REQUESTED_LIST_FAILED':
            return { ...state, loading: false, error: true }
        default:
            return state;
    }
}

// Actions
const requestList = () => {
    return { type: 'REQUESTED_LIST' }
};

const requestListSuccess = (data) => {
    return { type: 'REQUESTED_LIST_SUCCEEDED', payload: data }
};

const requestListError = () => {
    return { type: 'REQUESTED_LIST_FAILED' }
};

export const fetchList = (page) => {
    if (!page) {
        page = store.getState().page;
    }
    return { type: 'FETCH_LIST', page: page}
};

export const userClick = (data) => {
    return { type: 'USER_CLICK', payload: data }
};

// Sagas
function* watchFetchList() {
    yield takeEvery('FETCH_LIST', fetchListAsync);
}

function* fetchListAsync(action) {
    try {
        yield put(requestList());
        const data = yield call(() => {
            return fetch('https://reqres.in/api/users?page=' + action.page)
                .then(res => res.json())
        });
        yield put(requestListSuccess(data));
    } catch (error) {
        yield put(requestListError());
    }
}

//set up store
const initialState = { loading: false, error: false, total_pages: 0, page: 1, currentUser: null, loadedUsers: [] };
const sagaMiddleware = createSagaMiddleware();
export const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchFetchList);
