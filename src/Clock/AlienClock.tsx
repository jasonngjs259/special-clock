import { useState, useEffect } from "react";
import {
  ALIEN_MONTH,
  ALIEN_TIME,
  DEFAULT_ALIEN_TIMESTAMP_TIME,
} from "../Constants/Alien";
import {
  calculateMonth,
  calculateYear,
  totalAlienDaysPerYear,
  calculateDay,
  calculateHour,
  calculateMinute,
} from "../utils/alienTime";
import styles from "./Clock.module.scss";

interface AlienClockProps {
  alienTimestamp: number;
}

const AlienClock = ({ alienTimestamp }: AlienClockProps) => {
  const totalDays = totalAlienDaysPerYear(Object.values(ALIEN_MONTH));
  const monthArray = ALIEN_TIME.month;

  const [year, setYear] = useState(
    calculateYear(totalDays, alienTimestamp, 0, "")
  );
  const [month, setMonth] = useState(
    calculateMonth(
      year.currentYearTimestamp,
      Object.values(ALIEN_MONTH),
      alienTimestamp
    )
  );
  const [day, setDay] = useState(
    calculateDay(month.currentMonthTimestamp, alienTimestamp)
  );
  const [hour, setHour] = useState(
    calculateHour(day.currentDayTimestamp, alienTimestamp)
  );
  const [minute, setMinute] = useState(
    calculateMinute(hour.currentHourTimestamp, alienTimestamp)
  );
  const [second, setSecond] = useState(minute.second);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSecond((prev) => prev + 1);
    }, 500);

    if (second >= ALIEN_TIME.minute) {
      setSecond(0);
      setMinute((prev) => ({ ...prev, minute: prev.minute + 1 }));
    }

    return () => clearTimeout(timeout);
  }, [second]);

  useEffect(() => {
    if (minute.minute >= ALIEN_TIME.hour) {
      setMinute((prev) => ({ ...prev, minute: 0 }));
      setHour((prev) => ({ ...prev, hour: prev.hour + 1 }));
    }
  }, [minute.minute]);

  useEffect(() => {
    if (hour.hour >= ALIEN_TIME.day) {
      setHour((prev) => ({ ...prev, hour: 0 }));
      setDay((prev) => ({ ...prev, day: prev.day + 1 }));
    }
  }, [hour.hour]);

  useEffect(() => {
    const tempMonthArray = [...monthArray];

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
      <div className={styles.clockTitle}>Alien Time</div>
      {/* <div>Timestamp {alienTimestamp}</div> */}
      <div className={styles.dateContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.text}>
            {year.year + DEFAULT_ALIEN_TIMESTAMP_TIME.year}
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

export default AlienClock;
