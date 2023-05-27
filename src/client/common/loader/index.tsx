import styles from "./styles.module.scss";

function Loader() {
  return (
    <div className={styles.loader}>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
    </div>
  );
}

export { Loader };
