import React from "react";
import styled from "styled-components";
import { ListGroup, Badge, Button } from "react-bootstrap";

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

const PullRefs = styled.span`
  margin: 0 10px;
`;

const InfoDiv = styled.div`
  @media only screen and (max-width: 600px) {
    padding-top: 10px;
    width: 100%;

    display: flex;
    justify-content: space-around;
  }
`;

function Pull(props) {
  const { baseRefName, headRefName, state, url } = props;
  const wrongPR = baseRefName !== headRefName;
  let variant = "";
  if (wrongPR) {
    variant = "warning";
  } else if (state === "MERGED") {
    variant = "success";
  } else if (state === "CLOSED") {
    variant = "dark";
  }
  return (
    <RowItem variant={variant}>
      <PullRefs>{`${props.baseRefName} -> ${props.headRefName}`}</PullRefs>
      {wrongPR ? <span>Mergujes zle branche</span> : null}
      <InfoDiv>
        <StyledBadge variant="primary">{state}</StyledBadge>
        <Button size="sm" variant="outline-primary" href={url}>
          LINK
        </Button>
      </InfoDiv>
    </RowItem>
  );
}

export default Pull;
