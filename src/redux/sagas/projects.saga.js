import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

function* fetchDesignerProjects(action) {
  try {
    const response = yield axios.get(`/api/projects/${action.payload}`);
    yield put({ type: 'SET_DESIGNER_PROJECTS', payload: response.data });
  } catch (error) {
    console.log(error);
  }
}
function* fetchProjectDetails(action) {
  try {
    const response = yield axios.get(`/api/projects/details/${action.payload}`)
    yield put({
      type: "SET_PROJECT_DETAILS",
      payload: response.data
    })
  } catch (error) {
    console.log(error);
  }
}

function* projectSaga() {
  yield takeLatest('FETCH_DESIGNER_PROJECTS', fetchDesignerProjects);
  yield takeEvery('FETCH_PROJECT_DETAILS', fetchProjectDetails)
}

export default projectSaga;
