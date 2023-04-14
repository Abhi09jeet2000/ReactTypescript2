import { takeEvery, put, call } from 'redux-saga/effects'
import {
  ADD_USER_EVENT,
  ADD_USER_EVENT_ACTION,
  DELETE_USER_ACTION,
  DELETE_USER_EVENT,
  LOAD_REQUEST,
  SET_LOAD_REQUEST,
  UPDATE_USER_ACTION,
  UPDATE_USER_EVENT,
  UserEvent,
} from './user-events'
import axios from 'axios'

import * as Effects from 'redux-saga/effects'
const getEvents = () =>
  axios.get<UserEvent, UserEvent[]>('http://localhost:8080/events')

const addEvents = (data: Omit<UserEvent, 'id'>) =>
  axios.post('http://localhost:8080/events', {
    ...data,
  })

const deleteEvent = (data: string) =>
  axios.delete(`http://localhost:8080/events/${data}`)

const updateEvent = (data1: number, data2: UserEvent) =>
  axios.put(`http://localhost:8080/events/${data1}`, {
    ...data2,
  })

function* getEventsSaga(): any {
  let data = yield call(getEvents)
  data = yield data.data
  // let response: UserEventStates = yield data.json()
  // console.log(data)
  yield put({
    type: SET_LOAD_REQUEST,
    payload: data,
  })
}

function* addUserEvent({ payload }: ADD_USER_EVENT_ACTION): any {
  const call: any = Effects.call
  // let response = yield call(addEvents, payload)
  yield call(addEvents, payload)
  // response = yield response.data
  let data = yield call(getEvents)
  data = yield data.data
  // console.log(data)
  yield put({
    type: SET_LOAD_REQUEST,
    payload: data,
  })
}

function* deleteUserEvent({ payload }: DELETE_USER_ACTION): any {
  const call: any = Effects.call
  yield call(deleteEvent, payload)
  let data = yield call(getEvents)
  data = yield data.data
  console.log(data)
  yield put({
    type: SET_LOAD_REQUEST,
    payload: data,
  })
}

function* updateUseEvent({ payload1, payload2 }: UPDATE_USER_ACTION): any {
  const call: any = Effects.call
  yield call(updateEvent, payload1, payload2)
  let data = yield call(getEvents)
  data = yield data.data
  console.log(data)
  yield put({
    type: SET_LOAD_REQUEST,
    payload: data,
  })
}

function* loadingSaga() {
  yield takeEvery(LOAD_REQUEST, getEventsSaga)
  yield takeEvery(ADD_USER_EVENT, addUserEvent)
  yield takeEvery(DELETE_USER_EVENT, deleteUserEvent)
  yield takeEvery(UPDATE_USER_EVENT, updateUseEvent)
}

export default loadingSaga
