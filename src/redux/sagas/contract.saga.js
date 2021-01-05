import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchOutbox (){
    try{
        console.log('outbox');
        
        const response = yield axios.get('/api/outbox');
        console.log(response.data);

        yield put ({ type: 'SET_OUTBOX', payload: response.data});
    } catch (error) {
        console.log(error);
    }
}

function* fetchInbox (){
    try{
        console.log('inbox');
        
        const response = yield axios.get('/api/inbox');
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