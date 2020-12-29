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

function* designerSaga() {
  yield takeLatest('FETCH_DESIGNERS', fetchDesigners);
}

export default designerSaga;
