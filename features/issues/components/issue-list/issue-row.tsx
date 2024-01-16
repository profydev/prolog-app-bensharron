import capitalize from "lodash/capitalize";
import { Badge, BadgeColor, BadgeSize } from "@features/ui";
import { ProjectLanguage } from "@api/projects.types";
import { IssueLevel } from "@api/issues.types";
import type { Issue } from "@api/issues.types";
import styles from "./issue-row.module.scss";
import classNames from "classnames";

type IssueRowProps = {
  projectLanguage: ProjectLanguage;
  issue: Issue;
};

const levelColors = {
  [IssueLevel.info]: BadgeColor.success,
  [IssueLevel.warning]: BadgeColor.warning,
  [IssueLevel.error]: BadgeColor.error,
};

export function IssueRow({ projectLanguage, issue }: IssueRowProps) {
  const { name, message, stack, level, numEvents, numUsers } = issue;
  const firstLineOfStackTrace = stack.split("\n")[1];

  return (
    <div className={styles.row} data-cy="tr">
      <div className={classNames(styles.cell, styles.issueCell)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.languageIcon}
          src={`/icons/${projectLanguage}.svg`}
          alt={projectLanguage}
        />
        <div className={styles.errorText}>
          <div className={styles.errorTypeAndMessage}>
            <span className={styles.errorType}>{name}:&nbsp;</span>
            {message}
          </div>
          <div>{firstLineOfStackTrace}</div>
        </div>
      </div>

      <div className={styles.mobileStats}>
        <div className={classNames(styles.cell, styles.mobileStat)}>
          <div>Status</div>
          <Badge color={levelColors[level]} size={BadgeSize.sm}>
            {capitalize(level)}
          </Badge>
        </div>
        <div className={classNames(styles.cell, styles.mobileStat)}>
          <div>Events</div>
          <div>{numEvents}</div>
        </div>
        <div className={classNames(styles.cell, styles.mobileStat)}>
          <div>Users</div>
          <div>{numUsers}</div>
        </div>
      </div>

      <div className={classNames(styles.cell, styles.desktopStat)}>
        <Badge color={levelColors[level]} size={BadgeSize.sm}>
          {capitalize(level)}
        </Badge>
      </div>
      <div className={classNames(styles.cell, styles.desktopStat)}>
        {numEvents}
      </div>
      <div className={classNames(styles.cell, styles.desktopStat)}>
        {numUsers}
      </div>
    </div>
  );
}
