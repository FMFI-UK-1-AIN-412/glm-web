import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import STUDENT_SUBMISSIONS from "./query";
// import Pull from "../pulls/pull/pull";

const CenteredTableData = styled.td`
  text-align: center;
`;

const PullRequestLink = styled.a`
  padding: 0 10px;

  color: ${(props) =>
    props.state === "open"
      ? "#5DBA5B"
      : props.state === "merged"
      ? "#6843BA"
      : "#BA3637"};

  &:first-child {
    padding: 0;
  }
  &:last-child {
    padding: 0;
  }
`;

function StudentSubmissions(props) {
  const { owner, repoPrefix, assignments } = props;
  const studentGithubLogin = props.student;
  const studentRepositoryName = repoPrefix + studentGithubLogin;
  const { loading, error, data } = useQuery(STUDENT_SUBMISSIONS, {
    variables: { name: studentRepositoryName, owner: owner },
  });

  if (loading) {
    return (
      <tr>
        <CenteredTableData
          colSpan={assignments.length + 1}
        >{`Loading ${studentGithubLogin}`}</CenteredTableData>
      </tr>
    );
  }

  if (error || !data) {
    return (
      <tr>
        <CenteredTableData colSpan={assignments.length + 1}>
          {data && data.repository && data.repository.url ? (
            <a
              href={data.repository.url}
            >{`Couldn't fetch pulls for ${studentRepositoryName}`}</a>
          ) : (
            `Couldn't fetch pulls for ${studentRepositoryName}`
          )}
        </CenteredTableData>
      </tr>
    );
  }

  const pullRequests = data.repository.pullRequests.nodes;

  return (
    <tr>
      <td>
        <a href={data.repository.url}>{studentGithubLogin}</a>
      </td>
      {assignments.map((assignment) => {
        const assignmentSubmissions = pullRequests.filter(
          (pr) => pr.baseRefName === assignment
        );
        return (
          <CenteredTableData key={assignment}>
            {assignmentSubmissions.map((pr) => (
              <OverlayTrigger
                overlay={<Tooltip>{`state - ${pr.state}`}</Tooltip>}
              >
                <PullRequestLink state={pr.state.toLowerCase()} href={pr.url}>
                  {pr.headRefName}
                </PullRequestLink>
              </OverlayTrigger>
            ))}
          </CenteredTableData>
        );
      })}
    </tr>
  );
}

export default StudentSubmissions;
