import {
  DEFAULT_EARTH_TIMESTAP_TIME,
  EARTH_TIME,
  EARTH_TIME_IN_TIMESTAMP,
} from "../Constants/Earth";

export const totalEarthDaysPerYear = (monthArray: number[]) => {
  let totalDayPerYear = 0;

  for (let i = 0; i < monthArray.length; i++) {
    totalDayPerYear = totalDayPerYear + monthArray[i];
  }

  return totalDayPerYear;
};

export const checkLeapYear = (year: number) => {
  if (year % 4 > 0) return false;

  return true;
};

export const calculateYear = (
  totalDays: number,
  timestamp: number,
  year: number,
  type: string
) => {
  let tempTotalDays = totalDays;
  let tempTimestamp = timestamp;
  let timestampCounter = 0;
  let lastTimestampCounter = 0;
  let tempYear = 0;
  let leapYearCounter = 0;

  if (type === "year") {
    console.log(year);
    while (tempYear < year - DEFAULT_EARTH_TIMESTAP_TIME.year + 1) {
      if (checkLeapYear(DEFAULT_EARTH_TIMESTAP_TIME.year + tempYear)) {
        tempTotalDays = totalDays + 1;
        leapYearCounter += 1;
      } else {
        tempTotalDays = totalDays;
      }

      lastTimestampCounter = timestampCounter;
      timestampCounter =
        timestampCounter + tempTotalDays * EARTH_TIME_IN_TIMESTAMP.day;
      tempYear = tempYear + 1;
    }

    console.log(tempYear);

    return {
      year: tempYear,
      currentYearTimestamp: lastTimestampCounter,
      leapYearCounter: leapYearCounter,
    };
  }

  while (timestampCounter <= tempTimestamp) {
    if (checkLeapYear(DEFAULT_EARTH_TIMESTAP_TIME.year + tempYear)) {
      tempTotalDays = totalDays + 1;
      leapYearCounter += 1;
    } else {
      tempTotalDays = totalDays;
    }

    lastTimestampCounter = timestampCounter;
    timestampCounter =
      timestampCounter + tempTotalDays * EARTH_TIME_IN_TIMESTAMP.day;
    tempYear = tempYear + 1;
  }

  return {
    year: tempYear - 1,
    currentYearTimestamp: lastTimestampCounter,
    leapYearCounter: leapYearCounter,
  };
};

export const calculateMonth = (
  year: number,
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

  console.log(currentYearTimestamp, differenceTimestamp);
  if (checkLeapYear(year)) tempMonthArray.splice(1, 1, 29);

  while (differenceTimestamp >= tempTotalDays) {
    lastMonthTimestampCounter = tempTotalDays;
    tempTotalDays =
      tempTotalDays + tempMonthArray[tempMonth] * EARTH_TIME_IN_TIMESTAMP.day;
    tempMonth = tempMonth + 1;
  }

  console.log(
    differenceTimestamp,
    tempTotalDays,
    lastMonthTimestampCounter,
    tempMonth
  );

  return {
    month: tempMonth - 1,
    currentMonthTimestamp: differenceTimestamp - lastMonthTimestampCounter,
  };
};

export const calculateDay = (currentTimestamp: number) => {
  console.log(currentTimestamp);
  const day = Math.floor(currentTimestamp / EARTH_TIME_IN_TIMESTAMP.day);

  console.log(currentTimestamp - day * EARTH_TIME_IN_TIMESTAMP.day);
  return {
    day: day,
    currentDayTimestamp: currentTimestamp - day * EARTH_TIME_IN_TIMESTAMP.day,
  };
};

export const calculateHour = (currentTimestamp: number) => {
  const hour = Math.floor(currentTimestamp / EARTH_TIME_IN_TIMESTAMP.hour);

  return {
    hour: hour,
    currentHourTimestamp:
      currentTimestamp - hour * EARTH_TIME_IN_TIMESTAMP.hour,
  };
};

export const calculateMinute = (currentTimestamp: number) => {
  const minute = Math.floor(currentTimestamp / EARTH_TIME_IN_TIMESTAMP.minute);

  return {
    minute: minute,
    second: currentTimestamp - minute * EARTH_TIME_IN_TIMESTAMP.minute,
  };
};

export const calculateEarthTimeAll = (
  totalDays: number,
  monthArray: number[],
  timestamp: number
) => {
  // let newTimestamp = timestamp + EARTH_TIME.utc * EARTH_TIME_IN_TIMESTAMP.hour;
  let newTimestamp = timestamp;

  if (timestamp < 0) {
    newTimestamp = Math.abs(newTimestamp);
  }
  const tempYear = calculateYear(totalDays, newTimestamp, 0, "");
  const tempMonth = calculateMonth(
    tempYear.year,
    tempYear.currentYearTimestamp,
    monthArray,
    newTimestamp
  );
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

  console.log({
    year: finalYear,
    month: finalMonth,
    day: finalDay,
    hour: finalHour,
    minute: finalMinute,
    second: finalSecond,
  });

  return {
    year: finalYear,
    month: finalMonth,
    day: finalDay,
    hour: finalHour,
    minute: finalMinute,
    second: finalSecond,
  };
};

export const addEarthDefaultTime = (
  time: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
  },
  monthArray: number[]
) => {
  let finalYear = time.year;
  let finalMonth = time.month + 1;
  let finalDay = time.day + 1;
  let finalHour = time.hour;
  let finalMinute = time.minute;
  let finalSecond = time.second;

  if (finalSecond >= EARTH_TIME.minute) {
    finalSecond = finalSecond - EARTH_TIME.minute;
    finalMinute = finalMinute + 1;
  } else if (finalSecond < 0) {
    finalSecond = finalSecond + EARTH_TIME.minute;
    finalMinute = finalMinute - 1;
  }

  if (finalMinute >= EARTH_TIME.hour) {
    finalMinute = finalMinute - EARTH_TIME.hour;
    finalHour = finalHour + 1;
  } else if (finalMinute < 0) {
    finalMinute = finalMinute + EARTH_TIME.hour;
    finalHour = finalHour - 1;
  }

  if (finalHour >= EARTH_TIME.day) {
    finalHour = finalHour - EARTH_TIME.day;
    finalDay = finalDay + 1;
  } else if (finalHour < 0) {
    finalHour = finalHour + EARTH_TIME.day;
    finalDay = finalDay - 1;
  }

  if (finalDay > monthArray[finalMonth - 1]) {
    finalDay = finalDay - monthArray[finalMonth - 1];
    finalMonth = finalMonth + 1;
  } else if (finalDay <= 0) {
    finalDay = finalDay + monthArray[finalMonth - 1];
    finalMonth = finalMonth - 1;
  }

  if (finalMonth > monthArray.length) {
    finalMonth = finalMonth - monthArray.length;
    finalYear = finalYear + 1;
  } else if (finalMonth <= 0) {
    finalMonth = finalMonth + monthArray.length;
    finalYear = finalYear - 1;
  }

  return {
    year: finalYear + DEFAULT_EARTH_TIMESTAP_TIME.year,
    month: finalMonth,
    day: finalDay,
    hour: finalHour,
    minute: finalMinute,
    second: finalSecond,
  };
};

export const convertEarthTimeToTimestamp = (
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
  const second = time.second;
  const minute = time.minute * EARTH_TIME_IN_TIMESTAMP.minute;
  const hour = time.hour * EARTH_TIME_IN_TIMESTAMP.hour;
  const day = (time.day - 1) * EARTH_TIME_IN_TIMESTAMP.day;

  const tempMonthArray = [...monthArray];

  if (checkLeapYear(time.year)) tempMonthArray.splice(1, 1, 29);

  let tempMonthTotalDays = 0;
  for (let i = 0; i < time.month - 1; i++) {
    tempMonthTotalDays =
      tempMonthTotalDays + tempMonthArray[i] * EARTH_TIME_IN_TIMESTAMP.day;
  }

  const year = calculateYear(totalDays, 0, time.year, "year");

  console.log(year.currentYearTimestamp, year.year, tempMonthTotalDays, day);

  const result =
    year.currentYearTimestamp +
    tempMonthTotalDays +
    day +
    hour +
    minute +
    second;

  console.log(result);

  return result;
};
