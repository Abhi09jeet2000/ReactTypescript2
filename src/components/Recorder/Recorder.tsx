import React, { useEffect, useRef, useState } from 'react'
import './Recorder.css'
import { useDispatch } from 'react-redux'
import { selectDateStart, start, stop } from './record'
import { useSelector } from 'react-redux'
import cx from 'classnames'
import { addZero } from '../../utils/conversion'
import { addUserEvent, load } from '../../redux/user-events'

interface DispatchEventType {
  dispatchEvent: (dateStart: string) => void
}

const Recorder: React.FC<DispatchEventType> = ({ dispatchEvent }) => {
  const dispatch = useDispatch()
  const dateStart = useSelector(selectDateStart)
  const [count, setCount] = useState<number>(0)

  const started = dateStart !== ''
  let interval = useRef<number>(0)

  const handleClick = () => {
    if (started) {
      window.clearInterval(interval.current)

      dispatchEvent(dateStart)
      dispatch(stop())
    } else {
      dispatch(start())
      interval.current = window.setInterval(() => {
        setCount((count) => count + 1)
      }, 1000)
    }
  }

  useEffect(() => {
    return () => {
      window.clearInterval(interval.current)
    }
  }, [])

  let seconds = started
    ? Math.floor((Date.now() - new Date(dateStart).getTime()) / 1000)
    : 0

  const hours = seconds ? Math.floor(seconds / 3600) : 0

  seconds -= hours * 60 * 60

  const minutes = seconds ? Math.floor(seconds / 60) : 0

  if (seconds > 60) seconds = seconds % 60

  return (
    <div className={cx('recorder', { 'recorder-started': started })}>
      <button onClick={handleClick} className="recorder-record">
        <span></span>
      </button>
      <div className="record-counter">
        {addZero(hours)}:{addZero(minutes)}:{addZero(seconds)}
      </div>
    </div>
  )
}

export default Recorder
