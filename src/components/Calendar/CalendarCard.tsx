import React, { useEffect, useRef, useState } from 'react'
import { Time } from '../../utils/conversion'
import { UserEvent } from '../../redux/user-events'

interface CalenderPropType {
  e: UserEvent
  dispatchDeleteEvent: (id: number) => void
  dispatchUpdateEvent: (id: number, data: UserEvent) => void
}

const CalendarCard: React.FC<CalenderPropType> = ({
  e,
  dispatchDeleteEvent,
  dispatchUpdateEvent,
}) => {
  const [editable, setEditable] = useState(false)
  const [title, setTitle] = useState(e.title)
  const inputRef = useRef<HTMLInputElement>(null)
  const handleTitleClick = () => {
    setEditable(true)
  }
  useEffect(() => {
    if (editable) inputRef.current?.focus()
  }, [editable])
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }
  const handleBlur = (id: number, data: UserEvent) => {
    setEditable(false)
    dispatchUpdateEvent(id, data)
  }

  return (
    <div className="calendar-event">
      <div className="calendar-event-info">
        <div className="calendar-event-time">
          {`${Time(e.dateStart)}-${Time(e.dateEnd)} `}
        </div>
        <div className="calendar-event-title">
          {editable ? (
            <input
              type="text"
              ref={inputRef}
              value={title}
              onChange={handleChange}
              onBlur={() =>
                handleBlur(e.id, {
                  ...e,
                  title,
                })
              }
            />
          ) : (
            <span onClick={handleTitleClick}>{e.title}</span>
          )}
        </div>
      </div>
      <button
        className="calendar-event-delete-button"
        onClick={() => dispatchDeleteEvent(e.id)}
      >
        &times;
      </button>
    </div>
  )
}

export default CalendarCard
