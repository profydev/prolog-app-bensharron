import { Button } from "@features/ui";
import styles from "./project-error.module.scss";
import { ButtonColor, ButtonIcon, ButtonSize } from "@features/ui";

type ProjectErrorProps = {
  refetch: () => void;
};

export function ProjectError(props: ProjectErrorProps) {
  const { refetch } = props;

  return (
    <div className={styles.alertBox}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/icons/alert-circle.svg" alt="alert" />
      <div className={styles.errorMsg}>
        There was a problem while loading the project data
      </div>
      <Button
        size={ButtonSize.sm}
        color={ButtonColor.emptyError}
        icon={ButtonIcon.trailing}
        iconUrl="/icons/arrow-right.svg"
        onClick={refetch}
      >
        Try again
      </Button>
    </div>
  );
}
