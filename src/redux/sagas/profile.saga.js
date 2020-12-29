import axios from 'axios';
import { response } from 'express';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchProfile () {
	const id = 4; //this.props.store.user.id;
	const designerResponse = yield axios.get('/api/profile/designers', {id});
	const careerResponse = yield axios.get('/api/profile/career', {id});
	const certificationResponse = yield axios.get('/api/profile/certification', {id});
	const educationResponse = yield axios.get('/api/profile/education', {id});

	console.log('in fetchProfile - response:', designerResponse, careerResponse, certificationResponse, educationResponse);

	// const responsePackage = {
	// 	designer: designerResponse,
	// 	career: careerResponse,
	// 	certification: certificationResponse.data,
	// 	education: educationResponse.data
	// }
	// console.log('in fetchProfile - responsePackage:', responsePackage);

	yield put({type: 'SET_PRFOILE', payload: {}});
}

function* updateProfile(action) {
	yield axios.put('/api/profile', action.payload);
}

function* profileSaga() {
	yield takeLatest('FETCH_PROFILE', fetchProfile);
	yield takeLatest('UPDATE_PROFILE', updateProfile);
}

export default profileSaga;
