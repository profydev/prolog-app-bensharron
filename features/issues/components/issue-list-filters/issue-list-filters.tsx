/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import styles from "./issue-list-filters.module.scss";
import { Input, Select } from "@features/ui";
import { useRouter } from "next/router";

export function IssueListFilters() {
  const router = useRouter();

  const [resolution, setResolution] = useState<string | null>(null);
  const [level, setLevel] = useState<string | null>(null);
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    if (!router.isReady) return;

    setResolution((router.query.resolution as string) ?? null);
    setLevel((router.query.level as string) ?? null);
    setProjectName((router.query.projectName as string) ?? "");
  }, [router]);

  function updateResolution(newResolution: string | null) {
    // Reset to page 1 when filters change
    delete router.query.page;

    if (newResolution) {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, resolution: newResolution },
      });
    } else {
      delete router.query.resolution;
      router.push(router);
    }
  }

  function updateLevel(newLevel: string | null) {
    // Reset to page 1 when filters change
    delete router.query.page;

    if (newLevel) {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, level: newLevel },
      });
    } else {
      delete router.query.level;
      router.push(router);
    }
  }

  function updateProjectName(newProjectName: string | null) {
    // Reset to page 1 when filters change
    delete router.query.page;

    if (newProjectName) {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, projectName: newProjectName },
      });
    } else {
      delete router.query.projectName;
      router.push(router);
    }
  }

  const resolutionOptions = [
    {
      id: 1,
      value: "Unresolved",
    },
    {
      id: 2,
      value: "Resolved",
    },
  ];

  const levelOptions = [
    {
      id: 1,
      value: "Error",
    },
    {
      id: 2,
      value: "Warning",
    },
    {
      id: 3,
      value: "Info",
    },
  ];

  return (
    <div className={styles.filtersBar}>
      <div className={styles.filters}>
        <Select
          className={styles.select}
          currValue={resolution}
          options={resolutionOptions}
          placeholder="Resolution"
          onChange={updateResolution}
        />
        <Select
          className={styles.select}
          currValue={level}
          options={levelOptions}
          placeholder="Level"
          onChange={updateLevel}
        />
        <Input
          className={styles.input}
          currValue={projectName}
          icon="/icons/search.svg"
          placeholder="Project Name"
          onChange={updateProjectName}
        />
      </div>
    </div>
  );
}
