import styles from "./project-error.module.scss";

type ProjectErrorProps = {
  refetch: () => void;
};

export function ProjectError(props: ProjectErrorProps) {
  const { refetch } = props;

  return (
    <div className={styles.alertBox}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.alertCircle}
        src="/icons/alert-circle.svg"
        alt="alert"
      />
      <div className={styles.errorMsg}>
        There was a problem while loading the project data
      </div>
      <div className={styles.retryBtn} onClick={refetch}>
        Try again
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/arrow-right.svg" alt="retry" />
      </div>
    </div>
  );
}
