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

export const addRemainingDays = () => {
  let day =
    ALIEN_TIME.month[DEFAULT_ALIEN_TIMESTAMP_TIME.month - 1] -
    DEFAULT_ALIEN_TIMESTAMP_TIME.day;
  let hour = ALIEN_TIME.day - 1 - DEFAULT_ALIEN_TIMESTAMP_TIME.hour;
  let minute = ALIEN_TIME.hour - 1 - DEFAULT_ALIEN_TIMESTAMP_TIME.minute;
  let second = ALIEN_TIME.minute - DEFAULT_ALIEN_TIMESTAMP_TIME.second;

  let result =
    day * ALIEN_TIME_IN_TIMESTAMP.day +
    hour * ALIEN_TIME_IN_TIMESTAMP.hour +
    minute * ALIEN_TIME_IN_TIMESTAMP.minute +
    second;

  return result;
};

export const calculateYear = (totalDays: number, timestamp: number) => {
  let finalYear = Math.floor(
    timestamp / totalDays / ALIEN_TIME_IN_TIMESTAMP.day
  );

  return {
    year: finalYear,
    currentYearTimestamp:
      timestamp - finalYear * totalDays * ALIEN_TIME_IN_TIMESTAMP.day,
  };
};

export const calculateMonth = (
  monthArray: number[],
  currentTimestamp: number
) => {
  let tempMonthArray = [...monthArray];
  let tempMonth = 0;
  let timestampCounter = 0;
  let lastMonthTimestampCounter = 0;

  while (currentTimestamp >= timestampCounter) {
    lastMonthTimestampCounter = timestampCounter;
    timestampCounter =
      timestampCounter +
      tempMonthArray[tempMonth] * ALIEN_TIME_IN_TIMESTAMP.day;
    tempMonth = tempMonth + 1;
  }

  return {
    month: tempMonth - 1,
    currentMonthTimestamp: currentTimestamp - lastMonthTimestampCounter,
  };
};

export const calculateDay = (currentTimestamp: number) => {
  const result = Math.floor(currentTimestamp / ALIEN_TIME_IN_TIMESTAMP.day);

  return {
    day: result,
    currentDayTimestamp:
      currentTimestamp - result * ALIEN_TIME_IN_TIMESTAMP.day,
  };
};

export const calculateHour = (currentTimestamp: number) => {
  const result = Math.floor(currentTimestamp / ALIEN_TIME_IN_TIMESTAMP.hour);

  return {
    hour: result,
    currentHourTimestamp:
      currentTimestamp - result * ALIEN_TIME_IN_TIMESTAMP.hour,
  };
};

export const calculateMinute = (currentTimestamp: number) => {
  const result = Math.floor(currentTimestamp / ALIEN_TIME_IN_TIMESTAMP.minute);

  return {
    minute: result,
    second: currentTimestamp - result * ALIEN_TIME_IN_TIMESTAMP.minute,
  };
};

export const convertAlienTimestampToTime = (
  totalDays: number,
  monthArray: number[],
  timestamp: number
) => {
  let newTimestamp = timestamp;

  if (timestamp > addRemainingDays()) {
    newTimestamp = timestamp - addRemainingDays();
  }

  if (timestamp < 0) {
    newTimestamp = Math.abs(newTimestamp);
  }

  const tempYear = calculateYear(totalDays, newTimestamp);
  const tempMonth = calculateMonth(monthArray, tempYear.currentYearTimestamp);
  const tempDay = calculateDay(tempMonth.currentMonthTimestamp);
  const tempHour = calculateHour(tempDay.currentDayTimestamp);
  const tempMinute = calculateMinute(tempHour.currentHourTimestamp);

  let finalYear = tempYear.year;
  let finalMonth = tempMonth.month;
  let finalDay = tempDay.day;
  let finalHour = tempHour.hour;
  let finalMinute = tempMinute.minute;
  let finalSecond = tempMinute.second;

  if (timestamp < 0) {
    finalYear = -Math.abs(tempYear.year);
    finalMonth = -Math.abs(tempMonth.month);
    finalDay = -Math.abs(tempDay.day);
    finalHour = -Math.abs(tempHour.hour);
    finalMinute = -Math.abs(tempMinute.minute);
    finalSecond = -Math.abs(tempMinute.second);
  }

  return {
    year: finalYear,
    month: finalMonth,
    day: finalDay,
    hour: finalHour,
    minute: finalMinute,
    second: finalSecond,
    isNewDefaultAlienTime: timestamp > addRemainingDays(),
  };
};

export const addAlienDefaultTime = (time: {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  isNewDefaultAlienTime: boolean;
}) => {
  let finalYear = time.year + DEFAULT_ALIEN_TIMESTAMP_TIME.year + 1;
  let finalMonth = time.month + 1;
  let finalDay = time.day + 1;
  let finalHour = time.hour;
  let finalMinute = time.minute;
  let finalSecond = time.second;

  if (!time.isNewDefaultAlienTime) {
    finalYear = time.year + DEFAULT_ALIEN_TIMESTAMP_TIME.year;
    finalMonth = time.month + DEFAULT_ALIEN_TIMESTAMP_TIME.month;
    finalDay = time.day + DEFAULT_ALIEN_TIMESTAMP_TIME.day;
    finalHour = time.hour + DEFAULT_ALIEN_TIMESTAMP_TIME.hour;
    finalMinute = time.minute + DEFAULT_ALIEN_TIMESTAMP_TIME.minute;
    finalSecond = time.second + DEFAULT_ALIEN_TIMESTAMP_TIME.second;
  }

  if (finalSecond >= ALIEN_TIME.minute) {
    finalSecond = finalSecond - ALIEN_TIME.minute;
    finalMinute = finalMinute + 1;
  } else if (finalSecond < 0) {
    finalSecond = finalSecond + ALIEN_TIME.minute;
    finalMinute = finalMinute - 1;
  }

  if (finalMinute >= ALIEN_TIME.hour) {
    finalMinute = finalMinute - ALIEN_TIME.hour;
    finalHour = finalHour + 1;
  } else if (finalMinute < 0) {
    finalMinute = finalMinute + ALIEN_TIME.hour;
    finalHour = finalHour - 1;
  }

  if (finalHour >= ALIEN_TIME.day) {
    finalHour = finalHour - ALIEN_TIME.day;
    finalDay = finalDay + 1;
  } else if (finalHour < 0) {
    finalHour = finalHour + ALIEN_TIME.day;
    finalDay = finalDay - 1;
  }

  if (finalDay > ALIEN_TIME.month[finalMonth - 1]) {
    finalDay = finalDay - ALIEN_TIME.month[finalMonth - 1];
    finalMonth = finalMonth + 1;
  } else if (finalDay <= 0) {
    finalDay = finalDay + ALIEN_TIME.month[finalMonth - 1];
    finalMonth = finalMonth - 1;
  }

  if (finalMonth > ALIEN_TIME.month.length) {
    finalMonth = finalMonth - ALIEN_TIME.month.length;
    finalYear = finalYear + 1;
  } else if (finalMonth <= 0) {
    finalMonth = finalMonth + ALIEN_TIME.month.length;
    finalYear = finalYear - 1;
  }

  return {
    year: finalYear,
    month: finalMonth,
    day: finalDay,
    hour: finalHour,
    minute: finalMinute,
    second: finalSecond,
  };
};

export const convertAlienTimeToTimestamp = (
  time: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
  },
  totalDays: number,
  monthArray: number[]
) => {
  const second = time.second - DEFAULT_ALIEN_TIMESTAMP_TIME.second;
  const minute =
    (time.minute - DEFAULT_ALIEN_TIMESTAMP_TIME.minute) *
    ALIEN_TIME_IN_TIMESTAMP.minute;
  const hour =
    (time.hour - DEFAULT_ALIEN_TIMESTAMP_TIME.hour) *
    ALIEN_TIME_IN_TIMESTAMP.hour;
  const day =
    (time.day - DEFAULT_ALIEN_TIMESTAMP_TIME.day) * ALIEN_TIME_IN_TIMESTAMP.day;

  let tempMonthTotalDays = 0;
  for (
    let i = 0;
    i < time.month - DEFAULT_ALIEN_TIMESTAMP_TIME.month - 1;
    i++
  ) {
    tempMonthTotalDays =
      tempMonthTotalDays + monthArray[i] * ALIEN_TIME_IN_TIMESTAMP.day;
  }

  const year =
    (time.year - DEFAULT_ALIEN_TIMESTAMP_TIME.year) *
    totalDays *
    ALIEN_TIME_IN_TIMESTAMP.day;

  const result = year + tempMonthTotalDays + day + hour + minute + second;

  return result;
};
