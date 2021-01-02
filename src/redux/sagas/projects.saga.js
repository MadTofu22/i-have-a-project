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
function* createProject(action) {
  try {
    yield axios.post('/api/projects', action.payload)
    yield put({
      type: 'FETCH_MANAGER_PROJECTS'
    })
  } catch (error) {
    console.log(error);
  }
}
function* fetchManagerProjects(){
  try {
    const response = yield axios.get(`/api/projects/`)
    yield put({
      type: "SET_MANAGER_PROJECTS",
      payload: response.data
    })
  } catch (error) {
    console.log(error);
  }
}
function* updateProject(action){
  try {
    yield axios.put(`/api/projects/`, action.payload)
    yield put({
      type: "FETCH_PROJECT_DETAILS",
      payload: action.payload.projectDetails.id
    })
  } catch (error) {
    console.log(error);
  }
}
function* addDesignerToProject(action){
  try {
    yield axios.post(`/api/projects/addDesigner`, action.payload)
    yield put({
      type: "FETCH_PROJECT_DETAILS",
      payload: action.payload.project_id
    })
  } catch (error) {
    console.log(error);
  }
}
function* removeDesignerFromProject(action) {
  try {
    yield axios.delete('/api/projects/removeDesigner', action.payload)
    yield put({
      type: "FETCH_PROJECT_DETAILS",
      payload: action.payload.project_id
    })
  } catch (error) {
    console.log(error);
  }
}
function* updateDesignerHours(action) {
  try {
    yield axios.put(`/api/projects/hours_est`, action.payload)
    yield put({
      type: "FETCH_PROJECT_DETAILS",
      payload: action.payload.projectDetails.id
    })
  } catch (error) {
    console.log(error);
  }
}

function* projectSaga() {
  yield takeLatest('FETCH_DESIGNER_PROJECTS', fetchDesignerProjects);
  yield takeEvery('FETCH_PROJECT_DETAILS', fetchProjectDetails)
  yield takeEvery('CREATE_PROJECT', createProject)
  yield takeEvery('UPDATE_PROJECT', updateProject)
  yield takeLatest('FETCH_MANAGER_PROJECTS', fetchManagerProjects)
  yield takeLatest('ADD_DESIGNER_TO_PROJECT', addDesignerToProject)
  yield takeLatest('REMOVE_DESIGNER_FROM_PROJECT', removeDesignerFromProject)
  yield takeLatest('UPDATE_DESIGNER_HOURS', updateDesignerHours)
}

export default projectSaga;
