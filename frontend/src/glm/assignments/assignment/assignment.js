import React from "react";
import styled from "styled-components";
import { ListGroup, Badge, Button } from "react-bootstrap";

const AssignmentList = styled(ListGroup)`
  &:nth-child(n) {
    margin-bottom: 10px;
  }

  &:last-child {
    margin: 0;
  }
`;

const RowItem = styled(ListGroup.Item)`
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 600px) {
    align-items: center;
    flex-flow: column;
  }
`;

const StyledBadge = styled(Badge)`
  padding: 9px;
  align-self: center;
  margin-right: 5px;

  @media only screen and (max-width: 600px) {
    margin-right: 0;
  }
`;

const AssignmentName = styled.span`
  margin-right: 10px;
`;

const InfoDiv = styled.div`
  @media only screen and (max-width: 600px) {
    padding-top: 10px;
    width: 100%;

    display: flex;
    justify-content: space-around;
  }
`;

function Assignment(props) {
  const submissionBranchName = props.assignment;
  const pullRequests = props.pullRequests;

  const getBranchVariant = (pr) => {
    if (!isMerginCorrect(pr)) {
      return "warning";
    } else if (pr.state === "MERGED") {
      return "success";
    } else if (pr.state === "CLOSED") {
      return "dark";
    }
  };

  const isMerginCorrect = (pr) => {
    return pr.baseRefName === submissionBranchName;
  };

  const infoMessage = (pr) => {
    if (pr.baseRefName !== submissionBranchName) {
      return "Mergujes zle branche";
    }
    return null;
  };

  return (
    <AssignmentList>
      <RowItem variant="dark">{submissionBranchName}</RowItem>
      {pullRequests
        .filter((pr) => pr.headRefName === submissionBranchName)
        .map((pr) => {
          const variant = getBranchVariant(pr);
          return (
            <RowItem variant={variant} key={pr.id}>
              <div>
                <AssignmentName>{pr.headRefName}</AssignmentName>
                {!isMerginCorrect(pr) ? (
                  <span>{`Merging from branch ${pr.baseRefName}`}</span>
                ) : null}
              </div>
              <span>{infoMessage(pr)}</span>
              <InfoDiv>
                <StyledBadge variant={variant}>{pr.state}</StyledBadge>
                <Button size="sm" variant="outline-primary" href={pr.url}>
                  LINK
                </Button>
              </InfoDiv>
            </RowItem>
          );
        })}
    </AssignmentList>
  );
}

export default Assignment;
