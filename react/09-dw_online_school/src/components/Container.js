import styles from "./Container.module.css";
import cn from "classnames";

// Children은 prop을 의미함
function Container({ className, children }) {
  return <div className={cn(styles.container, className)}>{children}</div>;
}

export default Container;
