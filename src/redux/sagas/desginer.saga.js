import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchDesigners() {
  try {
      console.log('designers');
      
    const response = yield axios.get('/api/designers');
    console.log(response.data);
    
    yield put({ type: 'SET_DESIGNERS', payload: response.data });
  } catch (error) {
    console.log(error);
  }
}

function* deleteDesignerInfo(action) {
  try {
    const response = yield axios.post('/api/manager/delete/delete', action.payload);
    yield put({ type: 'FETCH_DESIGNERS', payload: response.data });
  } catch (error) {
    console.log('User delete request failed', error);
  }
}

function* updateDesignerRate(action) {
  try {
    const response = yield axios.put('/api/manager/ratechange', action.payload);
    yield put({ type: 'FETCH_DESIGNERS', payload: response.data });
  } catch (error) {
    console.log('User delete request failed', error);
  }
}

function* designerSaga() {
  yield takeLatest('FETCH_DESIGNERS', fetchDesigners);
  yield takeLatest('DELETE_TEAM_MEMEBER', deleteDesignerInfo);
  yield takeLatest('UPDATE_DESIGNER_RATE', updateDesignerRate);
}

export default designerSaga;
