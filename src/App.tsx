import styles from "./App.module.scss";
import Clock from "./Clock";

const App = () => {
  return (
    <div className={`${styles.backgroundContainer}`}>
      <Clock />
    </div>
  );
};

export default App;
