import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* deleteDesignerInfo(action) {
  try {
    const response = yield axios.post('/api/manager/delete/delete', action.payload);
    yield put({ type: 'FETCH_DESIGNERS', payload: response.data });
  } catch (error) {
    console.log('User delete request failed', error);
  }
}

function* adminSaga() {
  yield takeLatest('DELETE_TEAM_MEMEBER', deleteDesignerInfo);
}

export default adminSaga;