enum month {
  January,
  February,
  March,
  April,
  May,
  June,
  Junly,
  August,
  September,
  October,
  November,
  December,
}

export const Month = (str: string) => {
  const date = new Date(str)
  // console.log(month[date.getMonth()])
  return month[date.getMonth()]
}

export const Year = (str: string) => {
  const date = new Date(str)
  return date.getFullYear()
}

export const Day = (str: string) => {
  const date = new Date(str)
  return date.getDate()
}
export const createDate = (str: string) => {
  const date: Date = new Date(str)
  return `${addZero(date.getUTCFullYear())}-${addZero(
    date.getUTCMonth() + 1,
  )}-${addZero(date.getUTCDate())}`
}

export const Time = (str: string) => {
  const date = new Date(str)

  return `${date.getUTCHours()}:${date.getUTCMinutes()}`
}

export const addZero = (num: number) => (num < 10 ? `0${num}` : `${num}`)
