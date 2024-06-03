import { useState } from "react";
import { ALIEN_TIME, DEFAULT_ALIEN_TIMESTAMP_TIME } from "../Constants/Alien";
import {
  DEFAULT_EARTH_TIMESTAP_TIME,
  EARTH_MONTH,
  EARTH_TIME,
} from "../Constants/Earth";
import {
  addAlienDefaultTime,
  convertAlienTimeToTimestamp,
  convertAlienTimestampToTime,
  totalAlienDaysPerYear,
} from "../utils/alienTime";
import {
  calculateEarthTimeAll,
  convertEarthTimeToTimestamp,
  totalEarthDaysPerYear,
} from "../utils/earthTime";
import styles from "./Clock.module.scss";

interface EarthClockProps {
  earthTimestamp: number;
  alienTimestamp: number;
}

const DateTimeCalculator = ({
  earthTimestamp,
  alienTimestamp,
}: EarthClockProps) => {
  const earthMonthArray = Object.values(EARTH_MONTH);
  const alienMonthArray = ALIEN_TIME.month;
  const totalAlienDays = totalAlienDaysPerYear(alienMonthArray);
  const totalEarthDays = totalEarthDaysPerYear(earthMonthArray);

  const [newEarthTimestamp, setNewEarthTimestamp] = useState(earthTimestamp);
  const [newAlienTimestamp, setNewAlienTimestamp] = useState(alienTimestamp);
  const [alert, setAlert] = useState("");
  const [showEarthTime, setShowEarthTime] = useState(false);
  const [showAlienTime, setShowAlienTime] = useState(false);
  const [alienTime, setAlienTime] = useState(
    addAlienDefaultTime(
      convertAlienTimestampToTime(
        totalAlienDays,
        alienMonthArray,
        alienTimestamp
      )
    )
  );
  const [earthTime, setEarthTime] = useState(
    calculateEarthTimeAll(totalEarthDays, earthMonthArray, newEarthTimestamp)
  );
  const [alienTimeInputs, setAlienTimeInputs] = useState<{
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
  }>({
    year: alienTime.year,
    month: alienTime.month,
    day: alienTime.day,
    hour: alienTime.hour,
    minute: alienTime.minute,
    second: alienTime.second,
  });
  const [earthTimeInputs, setEarthTimeInputs] = useState<{
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
  }>({
    year: earthTime.year,
    month: earthTime.month,
    day: earthTime.day,
    hour: earthTime.hour,
    minute: earthTime.minute,
    second: earthTime.second,
  });

  const handleEarthTimeChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setAlert("");
    setShowAlienTime(false);
    setShowEarthTime(false);

    if (name === "year" && value.length <= 4) {
      setEarthTimeInputs((values) => ({ ...values, [name]: value }));
    }

    if (
      name === "month" &&
      value.length <= 2 &&
      value < earthMonthArray.length
    ) {
      setEarthTimeInputs((values) => ({ ...values, [name]: value }));
    }

    if (name === "day" && value.length <= 2 && value <= 31) {
      setEarthTimeInputs((values) => ({ ...values, [name]: value }));
    }

    if (name === "hour" && value.length <= 2 && value < EARTH_TIME.day) {
      setEarthTimeInputs((values) => ({ ...values, [name]: value }));
    }

    if (name === "minute" && value.length <= 2 && value < EARTH_TIME.hour) {
      setEarthTimeInputs((values) => ({ ...values, [name]: value }));
    }

    if (name === "second" && value.length <= 2 && value < EARTH_TIME.minute) {
      setEarthTimeInputs((values) => ({ ...values, [name]: value }));
    }
  };

  const handleAlienTimeChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setShowAlienTime(false);
    setShowEarthTime(false);

    if (name === "year" && value.length <= 4) {
      setAlienTimeInputs((values) => ({ ...values, [name]: value }));
    }

    if (
      name === "month" &&
      value.length <= 2 &&
      value < alienMonthArray.length
    ) {
      setAlienTimeInputs((values) => ({ ...values, [name]: value }));
    }

    if (name === "day" && value.length <= 2 && value <= 48) {
      setAlienTimeInputs((values) => ({ ...values, [name]: value }));
    }

    if (name === "hour" && value.length <= 2 && value < ALIEN_TIME.day) {
      setAlienTimeInputs((values) => ({ ...values, [name]: value }));
    }

    if (name === "minute" && value.length <= 2 && value < ALIEN_TIME.hour) {
      setAlienTimeInputs((values) => ({ ...values, [name]: value }));
    }

    if (name === "second" && value.length <= 2 && value < ALIEN_TIME.minute) {
      setAlienTimeInputs((values) => ({ ...values, [name]: value }));
    }
  };

  const handleEarthSubmit = (event: any) => {
    event.preventDefault();

    if (earthTimeInputs.year % 4 === 0 && earthTimeInputs.day > 29) {
      setAlert("Invalid day");
    } else if (earthTimeInputs.year % 4 > 0 && earthTimeInputs.day > 28) {
      setAlert("Invalid day");
    }

    const earthTimestamp = convertEarthTimeToTimestamp(
      {
        year: earthTimeInputs.year,
        month: earthTimeInputs.month,
        day: earthTimeInputs.day,
        hour: earthTimeInputs.hour,
        minute: earthTimeInputs.minute,
        second: earthTimeInputs.second,
      },
      totalEarthDays,
      earthMonthArray
    );

    setEarthTime({
      year: earthTimeInputs.year,
      month: earthTimeInputs.month,
      day: earthTimeInputs.day,
      hour: earthTimeInputs.hour,
      minute: earthTimeInputs.minute,
      second: earthTimeInputs.second,
    });
    setNewEarthTimestamp(earthTimestamp);
    setNewAlienTimestamp(earthTimestamp * 2);
    setAlienTime(
      addAlienDefaultTime(
        convertAlienTimestampToTime(
          totalAlienDays,
          alienMonthArray,
          earthTimestamp * 2
        )
      )
    );
    setShowAlienTime(true);
  };

  const handleAlienSubmit = (event: any) => {
    event.preventDefault();

    const alienTimestamp = convertAlienTimeToTimestamp(
      {
        year: alienTimeInputs.year,
        month: alienTimeInputs.month,
        day: alienTimeInputs.day,
        hour: alienTimeInputs.hour,
        minute: alienTimeInputs.minute,
        second: alienTimeInputs.second,
      },
      totalAlienDays,
      alienMonthArray
    );

    setNewAlienTimestamp(alienTimestamp);
    setNewEarthTimestamp(alienTimestamp / 2);
    setEarthTime(
      calculateEarthTimeAll(totalEarthDays, earthMonthArray, alienTimestamp / 2)
    );
    setShowEarthTime(true);
  };

  return (
    <div className={styles.clockMainContainer}>
      <div className={styles.clockTitle}>Earth Time</div>
      <form onSubmit={handleEarthSubmit}>
        <div className={styles.dateContainer}>
          <div className={styles.contentContainer}>
            <input
              type="number"
              name="year"
              min={1970}
              value={earthTimeInputs.year}
              onChange={handleEarthTimeChange}
            />
            <span>Year</span>
          </div>
          <div className={styles.contentContainer}>
            <input
              type="number"
              name="month"
              min={1}
              value={earthTimeInputs.month}
              onChange={handleEarthTimeChange}
            />
            <span>Month</span>
          </div>
          <div className={styles.contentContainer}>
            <input
              type="number"
              name="day"
              min={1}
              value={earthTimeInputs.day}
              onChange={handleEarthTimeChange}
            />
            <span>Day</span>
          </div>
        </div>

        <div className={styles.timeContainer}>
          <div className={styles.contentContainer}>
            <input
              type="number"
              name="hour"
              min={0}
              value={earthTimeInputs.hour}
              onChange={handleEarthTimeChange}
            />
            <span>Hour</span>
          </div>
          <div className={styles.contentContainer}>
            <input
              type="number"
              name="minute"
              min={0}
              value={earthTimeInputs.minute}
              onChange={handleEarthTimeChange}
            />
            <span>Minute</span>
          </div>
          <div className={styles.contentContainer}>
            <input
              type="number"
              name="second"
              min={0}
              value={earthTimeInputs.second}
              onChange={handleEarthTimeChange}
            />
            <span>Second</span>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button type="submit">Convert</button>
        </div>
        <div className={alert && styles.redFont}>
          {alert !== "" && alert}
          {showAlienTime &&
            `Alien Time: ${alienTime.year}-${alienTime.month}-${alienTime.day}
          ${alienTime.hour}:${alienTime.minute}:${alienTime.second}`}
        </div>
      </form>

      <div>{newEarthTimestamp}</div>
      <div>{newAlienTimestamp}</div>

      <div className={styles.clockTitle}>Alien Time</div>
      <form onSubmit={handleAlienSubmit}>
        <div className={styles.dateContainer}>
          <div className={styles.contentContainer}>
            <input
              type="number"
              name="year"
              value={alienTimeInputs.year}
              onChange={handleAlienTimeChange}
            />
            <span>Year</span>
          </div>
          <div className={styles.contentContainer}>
            <input
              type="number"
              name="month"
              value={alienTimeInputs.month}
              onChange={handleAlienTimeChange}
            />
            <span>Month</span>
          </div>
          <div className={styles.contentContainer}>
            <input
              type="number"
              name="day"
              value={alienTimeInputs.day}
              onChange={handleAlienTimeChange}
            />
            <span>Day</span>
          </div>
        </div>

        <div className={styles.timeContainer}>
          <div className={styles.contentContainer}>
            <input
              type="number"
              name="hour"
              value={alienTimeInputs.hour}
              onChange={handleAlienTimeChange}
            />
            <span>Hour</span>
          </div>
          <div className={styles.contentContainer}>
            <input
              type="number"
              name="minute"
              value={alienTimeInputs.minute}
              onChange={handleAlienTimeChange}
            />
            <span>Minute</span>
          </div>
          <div className={styles.contentContainer}>
            <input
              type="number"
              name="second"
              value={alienTimeInputs.second}
              onChange={handleAlienTimeChange}
            />
            <span>Second</span>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button type="submit">Convert</button>
        </div>
        <div>
          {showEarthTime &&
            `Earth Time: ${earthTime.year}-${earthTime.month}-${earthTime.day}
          ${earthTime.hour}:${earthTime.minute}:${earthTime.second}`}
        </div>
      </form>
    </div>
  );
};

export default DateTimeCalculator;
