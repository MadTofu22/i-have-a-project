import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

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
      let conditionalProperties = ''
      if (event.project_name != null) {
        conditionalProperties = {
          title: event.project_name,
          Status: event.status
        }
      } else {
        conditionalProperties = {
          title: event.name,
        }
      }
      let formattedEvent = {
        ...conditionalProperties,
        start: event.start.slice(0,10),
        id: event.event_Id,
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
    axios.put(`/api/calendar/`, action.payload)
    put({
      type: "FETCH_CALENDAR_EVENTS_BY_ID"
    })
  } catch (error) {
    console.log(error);
  }
}
function* DeleteCalendarEvent(action) {
  try {
    axios.delete('/api/calendar', action.payload);
    put({
      type: "FETCH_CALENDAR_EVENTS_BY_ID"
    })
  } catch (error) {
    console.log(error);
  }
}
function* createCalendarEvent(action) {
  try {
    axios.post('/api/calendar', action.payload);
    put({
      type: "FETCH_CALENDAR_EVENTS_BY_ID"
    })
  } catch (error) {
    console.log(error);
  }
}

function* calendarSaga() {
  yield takeLatest('FETCH_CALENDAR_EVENTS_BY_ID', fetchCalendarEventsByID);
  yield takeLatest('CREATE_CALENDAR_EVENT', createCalendarEvent)
  yield takeEvery('UPDATE_CALENDAR_EVENT', updateCalendarEvent);
  yield takeEvery('DELETE_CALENDAR_EVENT', DeleteCalendarEvent)
}

export default calendarSaga;
