import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchProfile (action) {
	try {
		const id = action.payload;
		const designerResponse = yield axios.get(`/api/profile/designers/${id}`);
		const careerResponse = yield axios.get(`/api/profile/career/${id}`);
		const educationResponse = yield axios.get(`/api/profile/education/${id}`);
		const skillsResponse = yield axios.get(`/api/profile/skills/${id}`);
		const softwareResponse = yield axios.get(`/api/profile/software/${id}`);

		yield put({
			type: 'SET_PROFILE',
			payload: {
				designer: designerResponse.data.rows[0],
				career: careerResponse.data.rows,
				education: educationResponse.data.rows,
				skills: skillsResponse.data.rows,
				software: softwareResponse.data.rows,
			}
		});
	} catch (error) {
		console.log('Unexpected ERROR in fetchProfile saga:', error);
	}
}

function formatData (data) {
	let results = {
		update: {
			designer: data.newData.designer,
			software: data.newData.software,
			career: [],
			education: [],
			skills: [],
		},
		create: {
			career: [],
			education: [],
			skills: [],
		},
	};
	console.log('in getExisting of profile.saga - data:', data);
	for (let section in results.create) {
		console.log('in section loop - newData.section:', data.newData[section], '; oldData.section:', data.oldData[section]);
		for (let index in data.newData[section]) {
			if (index < data.oldData[section].length){
				results.update[section].push(data.newData[section][index]);
			} else {
				results.create[section].push(data.newData[section][index]);
			}
		}
	}
	return results;
}

function* updateProfile(action) {
	// Separate action.payload into parsable data that can be sent for each query to the server
	const data = formatData(action.payload);
	console.log('in updatProfile of profile.saga - after formatData, data:', data);
	// Call each of the put and post requests for all of the arrays/objects
	yield axios.put(`/api/profile/designers/${action.payload.designer_id}`, data.update);
	for (let row of data.update.software) {
		yield axios.put(`/api/profile/software/${action.payload.designer_id}`, row);
	}

	for(let section in data.create) {
		for (let row of data.update[section]) {
			yield axios.put(`/api/profile/${section}/${action.payload.designer_id}`, row);
		}
		for (let row of data.create[section]) {
			yield axios.post(`/api/profile/${section}/${action.payload.designer_id}`, row);
		}
	}
	
	// Update the redux state by fetching the updated data
	yield put({type: 'FETCH_PROFILE', payload: action.payload.designer_id});
}

function* profileSaga() {
	yield takeLatest('FETCH_PROFILE', fetchProfile);
	yield takeLatest('UPDATE_PROFILE', updateProfile);
}

export default profileSaga;
