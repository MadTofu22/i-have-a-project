import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchDesignerProjects(action) {
  try {
    const response = yield axios.get(`/api/projects/${action.payload}`);
    yield put({ type: 'SET_DESIGNER_PROJECTS', payload: response.data });
  } catch (error) {
    console.log(error);
  }
}

function* projectSaga() {
  yield takeLatest('FETCH_DESIGNER_PROJECTS', fetchDesignerProjects);
}

export default projectSaga;
