import { useRouter } from "next/router";
import { ProjectLanguage } from "@api/projects.types";
import { useGetProjects } from "@features/projects";
import { useGetIssues } from "../../api/use-get-issues";
import { IssueRow } from "./issue-row";
import styles from "./issue-list.module.scss";
import { IssueLevel, IssueStatus } from "@api/issues.types";
import { useEffect, useState } from "react";

export function IssueList() {
  const router = useRouter();
  const page = Number(router.query.page || 1);
  const navigateToPage = (newPage: number) =>
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage },
    });

  const [resolution, setResolution] = useState<string | null>(null);
  const [level, setLevel] = useState<string | null>(null);
  const [projectName, setProjectName] = useState("");

  const resolutionValues: { [key: string]: IssueStatus } = {
    Resolved: IssueStatus.resolved,
    Unresolved: IssueStatus.open,
  };

  const levelValues: { [key: string]: IssueLevel } = {
    Error: IssueLevel.error,
    Warning: IssueLevel.warning,
    Info: IssueLevel.info,
  };

  useEffect(() => {
    setResolution((router.query.resolution as string) ?? null);
    setLevel((router.query.level as string) ?? null);
    setProjectName((router.query.projectName as string) ?? "");
  }, [router.query]);

  const filters = {
    status: resolution ? resolutionValues[resolution] : undefined,
    level: level ? levelValues[level] : undefined,
    project: projectName || undefined,
  };

  const issuesPage = useGetIssues(page, filters);
  const projects = useGetProjects();

  if (projects.isLoading || issuesPage.isLoading) {
    return <div>Loading</div>;
  }

  if (projects.isError) {
    console.error(projects.error);
    return <div>Error loading projects: {projects.error.message}</div>;
  }

  if (issuesPage.isError) {
    console.error(issuesPage.error);
    return <div>Error loading issues: {issuesPage.error.message}</div>;
  }

  const projectIdToLanguage = (projects.data || []).reduce(
    (prev, project) => ({
      ...prev,
      [project.id]: project.language,
    }),
    {} as Record<string, ProjectLanguage>,
  );
  const { items, meta } = issuesPage.data || {};

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headerRow}>
            <th className={styles.headerCell}>Issue</th>
            <th className={styles.headerCell}>Level</th>
            <th className={styles.headerCell}>Events</th>
            <th className={styles.headerCell}>Users</th>
          </tr>
        </thead>
        <tbody>
          {(items || []).map((issue) => (
            <IssueRow
              key={issue.id}
              issue={issue}
              projectLanguage={projectIdToLanguage[issue.projectId]}
            />
          ))}
        </tbody>
      </table>
      <div className={styles.paginationContainer}>
        <div>
          <button
            className={styles.paginationButton}
            onClick={() => navigateToPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            className={styles.paginationButton}
            onClick={() => navigateToPage(page + 1)}
            disabled={page === meta?.totalPages}
          >
            Next
          </button>
        </div>
        <div className={styles.pageInfo}>
          Page <span className={styles.pageNumber}>{meta?.currentPage}</span> of{" "}
          <span className={styles.pageNumber}>{meta?.totalPages}</span>
        </div>
      </div>
    </div>
  );
}
