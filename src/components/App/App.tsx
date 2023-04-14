import React, { useEffect, useRef, useState } from 'react'

import './App.css'
import Recorder from '../Recorder/Recorder'
import Calendar from '../Calendar'
import { useDispatch, useSelector } from 'react-redux'
import loadingSaga from '../../redux/loadingSaga'
import userEventsReducer, {
  UserEvent,
  addUserEvent,
  deleteUser,
  load,
  updateUser,
} from '../../redux/user-events'
import { RootState } from '../../redux/store'
import { createDate } from '../../utils/conversion'

function App() {
  let data: UserEvent[] = useSelector((state: RootState) => state.userEvents)
  // console.log(data)
  const [groups, setGroups] = useState<Record<string, UserEvent[]>>({})

  const dispatch = useDispatch()

  const dispatchAddEvent = (dateStart: string) => {
    dispatch(
      addUserEvent({
        title: 'Sample Task',
        dateStart: dateStart,
        dateEnd: new Date().toISOString(),
      }),
    )
    // dispatch(load())
    // loadUserEvent()
    // console.log(data)
  }

  const dispatchDeleteEvent = (id: number) => {
    dispatch(deleteUser(id))
    setGroups({})
  }

  const dispatchUpdateEvent = (id: number, data: UserEvent) => {
    dispatch(updateUser(id, data))
    setGroups({})
  }

  const loadUserEvent = () => {
    if (data) {
      data.forEach((value: any) => {
        const dateStart = createDate(value.dateStart)
        const dateEnd = createDate(value.dateEnd)
        // console.log(value)
        if (groups[dateStart] === undefined) {
          // console.log(1)
          groups[dateStart] = []
        }
        if (!groups[dateStart].find((val) => val.id === value.id)) {
          // console.log(groups[dateStart])
          groups[dateStart].push(value)
        }

        if (dateStart !== dateEnd) {
          if (groups[dateEnd] === undefined) {
            groups[dateEnd] = []
          }
          if (!groups[dateEnd].find((val) => val.id === value.id))
            groups[dateEnd].push(value)
        }
      })
      delete groups['NaN-NaN-NaN']
      console.log(groups)
    }
  }

  useEffect(() => {
    dispatch(load())
  }, [])

  useEffect(() => {
    loadUserEvent()
    setGroups((prev) => {
      return { ...prev }
    })
  }, [data])

  // console.log(data)
  return (
    <div className="App">
      <Recorder dispatchEvent={dispatchAddEvent} />
      {Object.keys(groups).length >= 1 ? (
        <Calendar
          dispatchDeleteEvent={dispatchDeleteEvent}
          dispatchUpdateEvent={dispatchUpdateEvent}
          groups={groups}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default App
