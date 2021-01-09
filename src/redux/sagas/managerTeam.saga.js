import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* loadDesignerInfo() {
  try {
    console.log("in loadDesignerInfo Saga");
    const response = yield axios.get('/api/manager/delete');
    yield put({ type: 'SET_MANAGER_TEAM', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}
function* deleteDesignerInfo(action) {
  try {
    const response = yield axios.post('/api/manager/delete/delete', action.payload);
    yield put({ type: 'FETCH_TEAM_MEMEBERS', payload: response.data });
  } catch (error) {
    console.log('User delete request failed', error);
  }
}

function* adminSaga() {
  yield takeLatest('FETCH_TEAM_MEMEBERS', loadDesignerInfo);
  yield takeLatest('DELETE_TEAM_MEMEBER', deleteDesignerInfo);
}

export default adminSaga;