import { useRouter } from "next/router";
import { ProjectLanguage } from "@api/projects.types";
import { useGetProjects } from "@features/projects";
import { useGetIssues } from "../../api/use-get-issues";
import { IssueRow } from "./issue-row";
import styles from "./issue-list.module.scss";
import { Issue, IssueLevel, IssueStatus } from "@api/issues.types";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { Button, ButtonColor, ButtonSize } from "@features/ui";
import { PageMeta } from "@typings/page.types";

export function IssueList() {
  const [loadPage, setLoadPage] = useState(1);
  const [allItems, setAllItems] = useState<Issue[]>([]);
  const [currMeta, setCurrMeta] = useState<PageMeta | null>(null);

  const router = useRouter();
  const page = Number(router.query.page || 1);
  const navigateToPage = (newPage: number) => {
    setLoadPage(1);

    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage },
    });
  };

  const loadMore = () => {
    if (page > 1) {
      // Reset to start of results if desktop version is on a bigger page
      setLoadPage(1);

      router.push({
        pathname: router.pathname,
        query: { ...router.query, page: 1 },
      });
    } else {
      setLoadPage((prevLoadPage) => prevLoadPage + 1);
    }
  };

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

  const issuesPage = useGetIssues(loadPage > page ? loadPage : page, filters);
  const projects = useGetProjects();

  useEffect(() => {
    if (issuesPage.status === "success") {
      const { items, meta } = issuesPage.data || {};

      setAllItems((prevAllItems) => [
        ...(loadPage > page ? prevAllItems : []),
        ...items,
      ]);
      setCurrMeta(meta);
    }
  }, [issuesPage.status, issuesPage.data, loadPage, page]);

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

  return (
    <div className={styles.container}>
      <div className={styles.table}>
        <div className={styles.headerGroup}>
          <div className={styles.headerRow}>
            <div className={styles.headerCell}>Issue</div>
            <div className={styles.headerCell}>Level</div>
            <div className={styles.headerCell}>Events</div>
            <div className={styles.headerCell}>Users</div>
          </div>
        </div>
        <div className={styles.rowGroup} data-cy="tbody">
          {(allItems || []).map((issue) => (
            <IssueRow
              key={issue.id}
              issue={issue}
              projectLanguage={projectIdToLanguage[issue.projectId]}
            />
          ))}
        </div>
      </div>
      <div className={styles.paginationContainer}>
        <div className={styles.paginationButtons}>
          <Button
            className={classNames(styles.paginationButton, styles.navigate)}
            size={ButtonSize.md}
            color={ButtonColor.gray}
            onClick={() =>
              navigateToPage((loadPage > page ? loadPage : page) - 1)
            }
            disabled={!currMeta?.hasPreviousPage}
          >
            Previous
          </Button>
          <Button
            className={classNames(styles.paginationButton, styles.navigate)}
            size={ButtonSize.md}
            color={ButtonColor.gray}
            onClick={() =>
              navigateToPage((loadPage > page ? loadPage : page) + 1)
            }
            disabled={!currMeta?.hasNextPage}
          >
            Next
          </Button>
          <Button
            className={classNames(styles.paginationButton, styles.loadMore)}
            size={ButtonSize.md}
            color={ButtonColor.gray}
            onClick={loadMore}
            disabled={!currMeta?.hasNextPage}
          >
            Load more
          </Button>
        </div>
        <div className={styles.pageInfo}>
          Page{" "}
          <span className={styles.pageNumber}>
            {currMeta?.totalPages ? currMeta?.currentPage : 0}
          </span>{" "}
          of <span className={styles.pageNumber}>{currMeta?.totalPages}</span>
        </div>
      </div>
    </div>
  );
}
