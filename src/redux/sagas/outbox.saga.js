import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchOutbox (){
    try{
        console.log('outbox');
        
        const response = yield axios.get('/api/managers');
        console.log(response.data);

        yield put ({ type: 'SET_OUTBOX', payload: response.data});
    } catch (error) {
        console.log(error);
    }
}


function* outboxSaga() {
	yield takeLatest('FETCH_OUTBOX', fetchOutbox);
}

export default outboxSaga;