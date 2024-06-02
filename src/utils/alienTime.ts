import {
  ALIEN_TIME,
  ALIEN_TIME_IN_TIMESTAMP,
  DEFAULT_ALIEN_TIMESTAMP_TIME,
} from "../Constants/Alien";

export const totalAlienDaysPerYear = (monthArray: number[]) => {
  let totalDayPerYear = 0;

  for (let i = 0; i < monthArray.length; i++) {
    totalDayPerYear = totalDayPerYear + monthArray[i];
  }

  return totalDayPerYear;
};

const addRemainingDays = () => {
  let day =
    ALIEN_TIME.month[DEFAULT_ALIEN_TIMESTAMP_TIME.month - 1] -
    DEFAULT_ALIEN_TIMESTAMP_TIME.day;
  let hour = ALIEN_TIME.day - DEFAULT_ALIEN_TIMESTAMP_TIME.hour;
  let minute = ALIEN_TIME.hour - DEFAULT_ALIEN_TIMESTAMP_TIME.minute;
  let second = ALIEN_TIME.minute - DEFAULT_ALIEN_TIMESTAMP_TIME.second;

  let result =
    day * ALIEN_TIME_IN_TIMESTAMP.day +
    hour * ALIEN_TIME_IN_TIMESTAMP.hour +
    minute * ALIEN_TIME_IN_TIMESTAMP.minute +
    second;

  return result;
};

export const calculateYear = (totalDays: number, timestamp: number) => {
  let tempYear = addRemainingDays();
  let year = Math.floor(
    (timestamp - tempYear) / totalDays / ALIEN_TIME_IN_TIMESTAMP.day
  );

  return {
    year: year,
    currentYearTimestamp: year * totalDays * ALIEN_TIME_IN_TIMESTAMP.day,
  };
};

export const calculateMonth = (
  currentYearTimestamp: number,
  monthArray: number[],
  currentTimestamp: number
) => {
  let tempMonthArray = [...monthArray];
  let tempCurrentTimestamp = currentTimestamp;
  let tempMonth = 0;
  let tempTotalDays = 0;
  let lastMonthTimestampCounter = 0;
  let differenceTimestamp = tempCurrentTimestamp - currentYearTimestamp;

  while (differenceTimestamp > tempTotalDays) {
    tempMonth = tempMonth + 1;
    lastMonthTimestampCounter = tempTotalDays;
    tempTotalDays =
      tempTotalDays + tempMonthArray[tempMonth] * ALIEN_TIME_IN_TIMESTAMP.day;
  }

  return {
    month: tempMonth,
    currentMonthTimestamp:
      lastMonthTimestampCounter +
      currentYearTimestamp +
      ALIEN_TIME_IN_TIMESTAMP.day,
  };
};

export const calculateDay = (
  currentDayTimestamp: number,
  currentTimestamp: number
) => {
  let tempCurrentTimestamp = currentTimestamp;
  let tempCurrentDayTimestamp = currentDayTimestamp;
  let tempDay = 0;
  let dayTimestampCounter = 0;
  let lastDayTimestampCounter = 0;

  while (dayTimestampCounter + tempCurrentDayTimestamp < tempCurrentTimestamp) {
    tempDay = tempDay + 1;
    lastDayTimestampCounter = dayTimestampCounter;
    dayTimestampCounter = dayTimestampCounter + ALIEN_TIME_IN_TIMESTAMP.day;
  }

  return {
    day: tempDay,
    currentDayTimestamp: lastDayTimestampCounter + tempCurrentDayTimestamp,
  };
};

export const calculateHour = (
  currentHourTimestamp: number,
  currentTimestamp: number
) => {
  let differenceTimestamp = currentTimestamp - currentHourTimestamp;
  let hour = Math.floor(differenceTimestamp / ALIEN_TIME_IN_TIMESTAMP.hour);

  return {
    hour: hour,
    currentHourTimestamp:
      currentHourTimestamp + hour * ALIEN_TIME_IN_TIMESTAMP.hour,
  };
};

export const calculateMinute = (
  currentMinuteTimestamp: number,
  currentTimestamp: number
) => {
  let differenceTimestamp = currentTimestamp - currentMinuteTimestamp;
  let minute = Math.floor(differenceTimestamp / ALIEN_TIME_IN_TIMESTAMP.minute);

  return {
    minute: minute,
    second:
      currentTimestamp -
      (currentMinuteTimestamp + minute * ALIEN_TIME_IN_TIMESTAMP.minute),
  };
};

export const calculateAlienTimeAll = (
  totalDays: number,
  monthArray: number[],
  timestamp: number
) => {
  const year = calculateYear(totalDays, timestamp);
  const month = calculateMonth(
    year.currentYearTimestamp,
    monthArray,
    timestamp
  );
  const day = calculateDay(month.currentMonthTimestamp, timestamp);
  const hour = calculateHour(day.currentDayTimestamp, timestamp);
  const minute = calculateMinute(hour.currentHourTimestamp, timestamp);

  return {
    year: year.year,
    month: month.month,
    day: day.day,
    hour: hour.hour,
    minute: minute.minute,
    second: minute.second,
  };
};
