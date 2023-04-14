import { type } from 'os'
import { Action, AnyAction } from 'redux'

export interface UserEvent {
  id: number
  title: string
  dateStart: string
  dateEnd: string
}

interface UserEventState {
  byIds: Record<UserEvent['id'], UserEvent>
  allIds: UserEvent['id'][]
}

// const initialState: UserEventState = {
//   byIds: {},
//   allIds: [],
// }

export interface UserEventStates {
  payload: UserEvent[]
}

const initialState: UserEventStates = {
  payload: [],
}

export const LOAD_REQUEST = 'userEvents/load_request'
export const SET_LOAD_REQUEST = 'userEvents/set_load_request'
export const ADD_USER_EVENT = 'userEvents/add_user_event'
export const DELETE_USER_EVENT = 'DELETE_USER_EVENT'
export const UPDATE_USER_EVENT = 'userEvents/update_user_events'

type LOAD_REQUEST_ACTION = Action<typeof LOAD_REQUEST>

// type SET_LOAD_REQUEST_ACTION = Action<typeof SET_LOAD_REQUEST | UserEventStates['payload']>

interface SET_LOAD_REQUEST_ACTION {
  type: typeof SET_LOAD_REQUEST
  payload: UserEvent[]
}

export interface ADD_USER_EVENT_ACTION {
  type: typeof ADD_USER_EVENT
  payload: Omit<UserEvent, 'id'>
}

export interface DELETE_USER_ACTION {
  type: typeof DELETE_USER_EVENT
  payload: number
}

export interface UPDATE_USER_ACTION {
  type: typeof UPDATE_USER_EVENT
  payload1: number
  payload2: UserEvent
}

export const load = (): LOAD_REQUEST_ACTION => ({
  type: LOAD_REQUEST,
})

export const setload = (payload: UserEvent[]): SET_LOAD_REQUEST_ACTION => ({
  type: SET_LOAD_REQUEST,
  payload,
})

export const addUserEvent = (
  payload: Omit<UserEvent, 'id'>,
): ADD_USER_EVENT_ACTION => ({
  type: ADD_USER_EVENT,
  payload,
})

export const deleteUser = (payload: number): DELETE_USER_ACTION => ({
  type: DELETE_USER_EVENT,
  payload,
})

export const updateUser = (
  payload1: number,
  payload2: UserEvent,
): UPDATE_USER_ACTION => ({
  type: UPDATE_USER_EVENT,
  payload1,
  payload2,
})

const userEventsReducer = (
  state: UserEvent[] = initialState['payload'],
  action: LOAD_REQUEST_ACTION | SET_LOAD_REQUEST_ACTION | ADD_USER_EVENT_ACTION,
) => {
  switch (action.type) {
    case LOAD_REQUEST:
      // console.log(1)
      return state
    case SET_LOAD_REQUEST:
      // console.log('Loading request', action)

      return [...action.payload]
    // case ADD_LOAD_REQUEST:
    //   // console.log([...state, { ...action.payload }])
    //   state = [...state, { ...action.payload }]
    //   return state
    default:
      return state
  }
}

export default userEventsReducer
