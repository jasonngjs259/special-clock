import AlienClock from "./AlienClock";
import EarthClock from "./EarthClock";
import styles from "./index.module.scss";
import DateTimeCalculator from "./DateTimeCalculator";

const Clock = () => {
  const earthTimestamp = Math.floor(Date.now() / 1000);
  const alienTimestamp = earthTimestamp * 2;

  return (
    <div className={styles.mainContainer}>
      <div className={styles.contentContainer}>
        <h1>NOW / CURRENT DATE & TIME</h1>
        <div className={styles.clockContainer}>
          <EarthClock earthTimestamp={earthTimestamp} />
        </div>
        <div className={styles.clockContainer}>
          <AlienClock alienTimestamp={earthTimestamp * 2} />
        </div>
      </div>
      <div className={styles.contentContainer}>
        <DateTimeCalculator
          earthTimestamp={earthTimestamp}
          alienTimestamp={alienTimestamp}
        />
      </div>
    </div>
  );
};

export default Clock;
