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
    let searchResults = []
    console.log('hello from find designer saga', action.payload);
    
    const response = yield axios.post('/api/search', action.payload);

    for (const designer of response.data) {
      console.log(designer.designer_id);
      
      const fetchDesignerData = yield axios.get(`/api/designers/${designer.designer_id}`);
      const designerSkills = yield axios.get(`/api/profile/skills/${designer.designer_id}`);
      const fetchDesignerData = yield axios.get(`/api/search/manager/${designer.manager_id}`);
      
       searchResults.push({
        designerName: fetchDesignerData.data,
        designerInfo: designer,
        managerInfo: fetchManagerData.data,
        skills: designerSkills.data.rows,
      })
    }
    console.log(searchResults);
    
    yield put({
      type: "SET_SEARCH",
      payload: searchResults
    })
  } catch (error) {
    console.log(error);
  }
}
function* createContractRequest(action) {
  try {
    /**
     * req.user.id,
        req.body.contracted_manager_id,
        req.body.contracted_designer_id,
        req.body.project_id,
        req.body.software_id,
        req.body.requested_hours,
        req.body.date_sent,
     */
    console.log('saga', action.payload);
    
    let newRequest = {
        contracted_manager_id: action.payload.designer.designerInfo.manager_id,
        contracted_designer_id: action.payload.designer.designerInfo.designer_id,
        project_id: action.payload.search.project_id,
        software_id: action.payload.designer.designerInfo.software_id,
        requested_hours: action.payload.search.requested_hours,
    }
    yield axios.post('/api/contracts', newRequest)
  } catch (error) {
    console.log(error);
    
  }
}



function* searchSaga() {
  yield takeLatest('FETCH_SOFTWARE_LIST', fetchsoftware);
  yield takeEvery('FIND_DESIGNER', findDesignerSearch)
  yield takeLatest('CREATE_CONTRACT_REQUEST', createContractRequest)
}

export default searchSaga;
