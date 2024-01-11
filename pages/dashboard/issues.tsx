import { PageContainer } from "@features/layout";
import { IssueList, IssueListFilters } from "@features/issues";
import type { NextPage } from "next";

const IssuesPage: NextPage = () => {
  return (
    <PageContainer
      title="Issues"
      info="Overview of errors, warnings, and events logged from your projects."
    >
      <IssueListFilters />
      <IssueList />
    </PageContainer>
  );
};

export default IssuesPage;
