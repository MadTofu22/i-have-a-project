import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* sampleName() {
  try {
    const response = yield axios.get('/api/sampleName');
    yield put({ type: 'SAMPLE_DISPATCH_CALL', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* searchSaga() {
  yield takeLatest('FETCH_USER', sampleName);
}

export default searchSaga;
