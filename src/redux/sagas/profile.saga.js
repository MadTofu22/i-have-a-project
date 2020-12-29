import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchProfile (action) {
	let id = 4;// action.payload.id;
	let designerResponse = yield axios.get(`/api/profile/designers/${id}`);
	let careerResponse = yield axios.get(`/api/profile/career/${id}`);
	let certificationResponse = yield axios.get(`/api/profile/certification/${id}`);
	let educationResponse = yield axios.get(`/api/profile/education/${id}`);

	const responsePackage = {
		designer: designerResponse.data.rows,
		career: careerResponse.data.rows,
		certification: certificationResponse.data.rows,
		education: educationResponse.data.rows
	}
	console.log('in fetchProfile - responsePackage:', responsePackage);

	yield put({type: 'SET_PROFILE', payload: responsePackage});
}

function* updateProfile(action) {
	yield axios.put('/api/profile', action.payload);
}

function* profileSaga() {
	yield takeLatest('FETCH_PROFILE', fetchProfile);
	yield takeLatest('UPDATE_PROFILE', updateProfile);
}

export default profileSaga;
