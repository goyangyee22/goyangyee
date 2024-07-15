import styles from "./Container.module.css";

// Children은 prop을 의미함
function Container({ children }) {
  return <div className={styles.container}>{children}</div>;
}

export default Container;
