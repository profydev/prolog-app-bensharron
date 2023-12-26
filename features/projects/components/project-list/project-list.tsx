import { ProjectCard } from "../project-card";
import { ProjectError } from "../project-error";
import { useGetProjects } from "../../api/use-get-projects";
import styles from "./project-list.module.scss";

export function ProjectList() {
  const { data, isLoading, isError, error, refetch } = useGetProjects();

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.loadingIndicator}
          src="/icons/loading-circle.svg"
          alt="Loading"
        />
      </div>
    );
  }

  if (isError) {
    console.error(error);

    return <ProjectError refetch={refetch} />;
  }

  return (
    <ul className={styles.list}>
      {data?.map((project) => (
        <li key={project.id}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
