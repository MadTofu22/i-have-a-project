import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {
	try {
		console.log('in register saga', action.payload);
		// clear any existing error on the registration page
		yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

		// passes the username and password from the payload to the server
		yield axios.post('/api/user/register', action.payload);

		// automatically log a user in after registration
		yield put({ type: 'LOGIN', payload: action.payload });

		// set to 'login' mode so they see the login screen
		// after registration or after they log out
		yield put({ type: 'SET_TO_LOGIN_MODE' });
	} catch (error) {
		console.log('Error with user registration:', error);
		yield put({ type: 'REGISTRATION_FAILED' });
	}
}

// Handles creating a single designer when a manager sends an email to invite the designer
function* registerDesigner(action) {
	try {
		const softwareList = yield axios.get('/api/profile/software')
		const designerResponse = yield axios.post(`/api/profile/designers/${action.payload.designerData.manager_id}`, action.payload.designerData);
		const designer_id = designerResponse.data.rows[0].id;
		console.log('in registerDesigner saga - designer_id:', designer_id);
		yield axios.post(`/api/designers/register/${designer_id}`, action.payload.userData);
		
		for (let software of softwareList.data) {
			yield axios.post(`/api/profile/software/${designer_id}`, {label: software.label, software_id: software.id, proficient: false});
		}

	} catch (error) {
		console.log('Error with user registration:', error);
	}
}

function* registrationSaga() {
	yield takeLatest('REGISTER', registerUser);
	yield takeLatest('REGISTER_DESIGNER', registerDesigner)
}

export default registrationSaga;
