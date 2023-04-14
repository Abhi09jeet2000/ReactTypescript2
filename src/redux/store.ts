import { combineReducers } from 'redux'
import userEventsReducer from './user-events'
import { configureStore } from '@reduxjs/toolkit'

import recordReducer from '../components/Recorder/record'
import loadingSaga from './loadingSaga'
import createSagaMiddleware from 'redux-saga'

const rootReducer = combineReducers({
  userEvents: userEventsReducer,
  recorder: recordReducer,
})

const sagaMiddleware = createSagaMiddleware()

export type RootState = ReturnType<typeof rootReducer>

const store = configureStore({
  reducer: rootReducer,
  middleware: () => [sagaMiddleware],
})

sagaMiddleware.run(loadingSaga)

export default store
