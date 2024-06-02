import { useEffect, useState } from "react";
import {
  DEFAULT_EARTH_TIMESTAP_TIME,
  EARTH_MONTH,
  EARTH_TIME,
} from "../Constants/Earth";
import {
  calculateDay,
  calculateHour,
  calculateMinute,
  calculateMonth,
  calculateYear,
  checkLeapYear,
  totalEarthDaysPerYear,
} from "../utils/earthTime";
import styles from "./Clock.module.scss";

interface EarthClockProps {
  earthTimestamp: number;
}

const EarthClock = (props: EarthClockProps) => {
  const { earthTimestamp } = props;

  const monthArray = Object.values(EARTH_MONTH);
  const totalDays = totalEarthDaysPerYear(monthArray);

  const [year, setYear] = useState(
    calculateYear(totalDays, earthTimestamp, 0, "")
  );
  const [month, setMonth] = useState(
    calculateMonth(
      year.year + DEFAULT_EARTH_TIMESTAP_TIME.year,
      year.currentYearTimestamp,
      Object.values(EARTH_MONTH),
      earthTimestamp
    )
  );
  const [day, setDay] = useState(
    calculateDay(month.currentMonthTimestamp, earthTimestamp)
  );
  const [hour, setHour] = useState(
    calculateHour(day.currentDayTimestamp, earthTimestamp)
  );
  const [minute, setMinute] = useState(
    calculateMinute(hour.currentHourTimestamp, earthTimestamp)
  );
  const [second, setSecond] = useState(minute.second);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSecond((prev) => prev + 1);
    }, 1000);

    if (second >= EARTH_TIME.minute) {
      setSecond(0);
      setMinute((prev) => ({ ...prev, minute: prev.minute + 1 }));
    }

    return () => clearTimeout(timeout);
  }, [second]);

  useEffect(() => {
    if (minute.minute >= EARTH_TIME.hour) {
      setMinute((prev) => ({ ...prev, minute: 0 }));
      setHour((prev) => ({ ...prev, hour: prev.hour + 1 }));
    }
  }, [minute.minute]);

  useEffect(() => {
    if (hour.hour >= EARTH_TIME.day) {
      setHour((prev) => ({ ...prev, hour: 0 }));
      setDay((prev) => ({ ...prev, day: prev.day + 1 }));
    }
  }, [hour.hour]);

  useEffect(() => {
    const isLeapYear = checkLeapYear(
      year.year + DEFAULT_EARTH_TIMESTAP_TIME.year
    );
    const tempMonthArray = [...monthArray];

    if (isLeapYear) tempMonthArray.splice(1, 1, 29);

    if (day.day > tempMonthArray[month.month - 1]) {
      setDay((prev) => ({ ...prev, day: 1 }));
      setMonth((prev) => ({ ...prev, month: prev.month + 1 }));
    }
  }, [day.day, year.year, month.month, monthArray]);

  useEffect(() => {
    if (month.month > monthArray.length) {
      setMonth((prev) => ({ ...prev, month: 1 }));
      setYear((prev) => ({ ...prev, year: prev.year + 1 }));
    }
  }, [month.month, monthArray]);

  return (
    <div className={styles.clockMainContainer}>
      <div className={styles.clockTitle}>Earth Time</div>
      {/* <div>Timestamp {earthTimestamp}</div> */}
      <div className={styles.dateContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.text}>
            {year.year + DEFAULT_EARTH_TIMESTAP_TIME.year}
          </div>
          <span>Year</span>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.text}>{month.month}</div>
          <span>Month</span>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.text}>{day.day}</div>
          <span>Day</span>
        </div>
      </div>

      <div className={styles.timeContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.text}>{hour.hour}</div>
          <span>Hour</span>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.text}>{minute.minute}</div>
          <span>Minute</span>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.text}>{second}</div>
          <span>Second</span>
        </div>
      </div>
    </div>
  );
};

export default EarthClock;
