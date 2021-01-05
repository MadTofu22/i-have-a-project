import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

function* fetchsoftware() {
  try {
    const response = yield axios.get('/api/profile/software');
    yield put({ type: 'SET_SOFTWARE_LIST', payload: response.data });
  } catch (error) {
    console.log('software fetch failed', error);
  }
}
function* findDesignerSearch(action) {
  try {    
    console.log('hello from find designer saga', action.payload);
    
    const response = yield axios.post('/api/search', action.payload);
    
    console.log(response.data);
    yield put({
      type: "SET_SEARCH",
      payload: response.data
    })
  } catch (error) {
    console.log(error);
  }
}



function* searchSaga() {
  yield takeLatest('FETCH_SOFTWARE_LIST', fetchsoftware);
  yield takeEvery('FIND_DESIGNER', findDesignerSearch)
}

export default searchSaga;
