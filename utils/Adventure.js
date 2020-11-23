import EorzeaTime from 'eorzea-time'
import EorzeaWeather from 'eorzea-weather'
import range from 'lodash/range'
import dayjs from 'dayjs'

const ONE_HOUR = 1 * 175 * 1000
const EIGHT_HOURS = 8 * 175 * 1000
const ONE_DAY = EIGHT_HOURS * 3

export default class Adventure {
  static getStartTime = (date) => {
    const eorzeaOneHour = 175 * 1000
    const msec = date.getTime()
    const bell = (msec / eorzeaOneHour) % 24
    const startMsec = msec - Math.round(eorzeaOneHour * bell)
    const offsetMsec = 0 - ONE_HOUR
    return new Date(startMsec + offsetMsec)
  }

  static createTimeCells(date) {
    const dt = date || new Date()
    const startTime = Adventure.getStartTime(dt).getTime() - ONE_HOUR
    const theRange = range(startTime, startTime + ONE_DAY * 2, ONE_HOUR)
    return theRange.map((msec) => {
      const dt = new Date(msec)
      return {
        key: dayjs(dt).format(),
        startRealDate: dt,
        isPast: dayjs(dt).isBefore(dayjs()),
        startLT: dayjs(dt).format('HH:mm'),
        startET: new EorzeaTime(dt).toString().slice(0, 5),
      }
    })
  }

  static matchCellWeather(cell, tale) {
    if (cell.weather === tale.weather) {
      return true
    }
    if (cell.weather === tale.weather2) {
      return true
    }
    return false
  }

  static matchCellHour(cell, tale) {
    const cellHour = Number(cell.startET.slice(0, 2))
    let cellTime = ''
    if (cellHour <= 4) {
      cellTime = '夜間'
    } else if (cellHour <= 7) {
      cellTime = '早朝'
    } else if (cellHour <= 11) {
      cellTime = '午前'
    } else if (cellHour <= 16) {
      cellTime = '午後'
    } else if (cellHour <= 17) {
      cellTime = '午後'
    } else if (cellHour <= 23) {
      cellTime = '夜間'
    }
    return tale.time === cellTime
  }

  static getWeather(zoneCode, realDate) {
    const zone = EorzeaWeather[`ZONE_${zoneCode}`]
    return EorzeaWeather.getWeather(zone, realDate, { locale: 'ja' })
  }

  static forecast(zoneCode) {
    //
    const startTime = Adventure.getStartTime(new Date()).getTime() - ONE_HOUR
    // const startedAt = new Date(startTime)
    // const startLocaleTime = new Date(startedAt).toLocaleTimeString();
    // const startEorzeaTime = new EorzeaTime(startedAt).toString();
    const zone = EorzeaWeather[`ZONE_${zoneCode}`]
    const eorzeaWeather = new EorzeaWeather(zone, { locale: 'ja' })
    const theRange = range(startTime, startTime + ONE_DAY * 2, ONE_HOUR)
    const weathers = theRange.map((time) => {
      const startedAt = new Date(time)
      return {
        name: eorzeaWeather.getWeather(startedAt),
        startLT: dayjs(startedAt).format('HH:mm'),
        startET: new EorzeaTime(startedAt).toString().slice(0, 5),
      }
    })
    return weathers
  }
}
