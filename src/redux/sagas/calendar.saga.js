import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

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
          project_id: event.project_id,
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
        hoursCommitted: event.hoursCommitted
      }
      transformedResults.push(formattedEvent)
    }
    return transformedResults
  }

}

function* calendarSaga() {
  yield takeLatest('FETCH_CALENDAR_EVENTS_BY_ID', fetchCalendarEventsByID);
}

export default calendarSaga;
