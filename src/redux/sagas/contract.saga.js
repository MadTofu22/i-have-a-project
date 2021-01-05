import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchOutbox (action){
    try{
        console.log('outbox');
        
        const response = yield axios.get(`/api/contracts/outbox/${action.payload}`);
        console.log(response.data);

        yield put ({ type: 'SET_OUTBOX', payload: response.data});
    } catch (error) {
        console.log(error);
    }
}

function* fetchInbox (action){
    try{
        console.log('inbox');
        
        const response = yield axios.get(`/api/contracts/inbox/${action.payload}`);
        console.log(response.data);

        yield put ({ type: 'SET_INBOX', payload: response.data});
    } catch (error) {
        console.log(error);
    }
}

function* contractSaga() {
    yield takeLatest('FETCH_OUTBOX', fetchOutbox);
    yield takeLatest('FETCH_INBOX', fetchInbox);
}

export default contractSaga;