import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchOutbox (action){
    try{
        console.log('outbox');
        
        const response = yield axios.get(`/api/contracts/outbox/${action.payload.id}`);
        console.log(action.payload.id);

        yield put ({ type: 'SET_OUTBOX', payload: response.data});
    } catch (error) {
        console.log(error);
    }
}

function* fetchInbox (action){
    try{
        console.log('inbox');
        
        const response = yield axios.get(`/api/contracts/inbox/${action.payload.id}`);
        console.log(action.payload.id);

        yield put ({ type: 'SET_INBOX', payload: response.data});
    } catch (error) {
        console.log(error);
    }
}

function* deleteRequest (action){
    try{
        console.log('deleteProject in delete saga project');
        yield axios.delete(`/api/contracts/${action.payload.id}`);
        yield put({
            type: "FETCH_OUTBOX",
            payload: {id:action.payload.managerId}
        })
    }catch (error){
        console.log(error);
    }
}

function* updateRequest (action){
    try{
        console.log('updateProject in update saga project id=', action.payload.id)
        yield axios.put(`/api/contracts/${action.payload.id}`, {status: 'completed'})
        if (action.payload.action) {
            
        }

        yield put({
            type: "FETCH_INBOX",
            payload: {id:action.payload.managerId}
        })
    }catch (error){
        console.log(error);
    }
}

function* contractSaga() {
    yield takeLatest('FETCH_OUTBOX', fetchOutbox);
    yield takeLatest('FETCH_INBOX', fetchInbox);
    yield takeLatest ('DELETE_REQUEST', deleteRequest);
    yield takeLatest ('UPDATE_REQUEST', updateRequest);
}

export default contractSaga;