import axios from 'axios';
import { put, select, takeEvery, takeLatest } from 'redux-saga/effects';

function* fetchCalendarEventsByID() {
  try {
    console.log('in fetch calendar');
    const calendarEventsData = yield axios.get(`/api/calendar/`)
    console.log(transformData(calendarEventsData.data));
    yield put({
      type: 'SET_DESIGNER_EVENTS',
      payload: transformData(calendarEventsData.data)
    })
  } catch (error) {
    console.log(error);
  }

  function transformData(calendarEvents) {
    let transformedResults = [];
    for (const event of calendarEvents) {
      let formattedEvent = {
        start: event.start.slice(0,10),
        id: event.event_id,
        designer_Id: event.designer_id,
        hoursCommitted: event.hoursCommitted,
        project_id: event.project_id,
      }
      transformedResults.push(formattedEvent)
    }
    return transformedResults
  }
}

function* updateCalendarEvent(action) {
  try {
    yield axios.put(`/api/calendar/`, action.payload)
    yield put({
      type: "DETERMINE_CALENDAR_FETCH"
    })
  } catch (error) {
    console.log(error);
  }
}
function* DeleteCalendarEvent(action) {
  try {
    yield axios.delete(`/api/calendar/${action.payload.id}`);
    yield put({
      type: "DETERMINE_CALENDAR_FETCH"
    })
  } catch (error) {
    console.log(error);
  }
}
function* createCalendarEvent(action) {
  try {
    yield axios.post(`/api/calendar/`, action.payload);
    yield put({
      type: "FETCH_CALENDAR_EVENTS_BY_ID"
    })
  } catch (error) {
    console.log(error);
  }
}
function* fetchManagerCalendar(action) {

  try {
    const calendarData = yield axios.get('/api/calendar/manager')
    yield put({
      type: "SET_MANAGER_CALENDAR",
      payload: calendarData.data
    })
  } catch (error) {
    console.log(error);
  }
}
function* determineFetch() {
  try {
    const store =  yield select()
    let userType = store.user.user_type
    if (userType === 'manager') {
      yield put({
        type: "FETCH_MANAGER_CALENDAR"
      })
    } else {
      yield put({
        type: "FETCH_CALENDAR_EVENTS_BY_ID"
      })
    }
  } catch (error) {
    console.log(error);
  }
}

function* calendarSaga() {
  yield takeLatest('FETCH_CALENDAR_EVENTS_BY_ID', fetchCalendarEventsByID);
  yield takeLatest('CREATE_CALENDAR_EVENT', createCalendarEvent)
  yield takeEvery('UPDATE_CALENDAR_EVENT', updateCalendarEvent);
  yield takeEvery('DELETE_CALENDAR_EVENT', DeleteCalendarEvent)
  yield takeLatest('DETERMINE_CALENDAR_FETCH', determineFetch);
  yield takeLatest('FETCH_MANAGER_CALENDAR', fetchManagerCalendar)
}

export default calendarSaga;
