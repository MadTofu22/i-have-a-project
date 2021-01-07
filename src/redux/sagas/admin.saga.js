import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* loadUserAccounts() {
  try {
    console.log("in loadUserAccounts Saga");
    const response = yield axios.get('/api/admin');
    yield put({ type: 'UPDATE_USERS_LIST_IN_STORE', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}
function* deleteUserAccounts(action) {
  try {
    const response = yield axios.post('/api/admin/delete', action.payload);
    yield put({ type: 'FETCH_USERS', payload: response.data });
  } catch (error) {
    console.log('User delete request failed', error);
  }
}

function* adminSaga() {
  yield takeLatest('FETCH_USERS', loadUserAccounts);
  yield takeLatest('DELETE_USERS', deleteUserAccounts);
}

export default adminSaga;
