import React, { useEffect, useRef, useState } from 'react'
import './Calendar.css'

import { UserEvent, deleteUser, load } from '../../redux/user-events'
import { Day, Time, createDate } from '../../utils/conversion'
import { Month } from '../../utils/conversion'
import { useDispatch } from 'react-redux'
import CalendarCard from './CalendarCard'

interface CalenderPropType {
  groups: Record<string, UserEvent[]>
  dispatchDeleteEvent: (id: number) => void
  dispatchUpdateEvent: (id: number, data: UserEvent) => void
}

const Calendar: React.FC<CalenderPropType> = ({
  groups,
  dispatchDeleteEvent,
  dispatchUpdateEvent,
}) => {
  // console.log(groups)
  // const groups: Record<string, UserEvent[]> = {}
  // const [isSet, setIsSet] = useState<boolean>(false)

  const [sortedGroupKeys, setSortedGroupKeys] = useState<string[] | undefined>(
    undefined,
  )

  useEffect(() => {
    // const groups: Record<string, UserEvent[]> = {}
    // loadUserEvent()
    setSortedGroupKeys(
      Object.keys(groups).sort(
        (date1, date2) => +new Date(date2) - +new Date(date1),
      ),
    )
  }, [groups])

  // useEffect(() => {
  //   // console.log(groups)
  //   // console.log(sortedGroupKeys)
  // }, [sortedGroupKeys])

  return (
    <div className="calendar">
      {sortedGroupKeys ? (
        sortedGroupKeys.map((dayKey) => {
          const events = groups[dayKey]
          const day = Day(dayKey)
          const month = Month(dayKey)

          return (
            <div className="calendar-day" key={month + day}>
              <div className="calendar-day-label">
                <span>{`${day} ${month}`}</span>
              </div>
              <div className="calendar-events">
                {events.map((e: UserEvent) => (
                  <CalendarCard
                    e={e}
                    dispatchDeleteEvent={dispatchDeleteEvent}
                    dispatchUpdateEvent={dispatchUpdateEvent}
                    key={e.id}
                  />
                ))}
              </div>
            </div>
          )
        })
      ) : (
        <div>Loading---</div>
      )}
      {/* <div className="claendar-day">
        <div className="calendar-day-label">
          <span>1 February</span>
        </div>
        <div className="calendar-events">
          <div className="calendar-event">
            <div className="calendar-event-info">
              <div className="calendar-event-time">10:00 -12:00</div>
              <div className="calendar-event-title">Learning Typescript</div>
            </div>
            <button className="calendar-event-delete-button">&times;</button>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default Calendar
