import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { ListGroup } from "react-bootstrap";

import ADMIN_PULLS from "./query";
import Pull from "../pulls/pull/pull";

const CenteredParagraph = styled.p`
  text-align: center;
`;

const StyledListGroup = styled(ListGroup)`
  padding-bottom: 30px;
`;

const RepositoryName = styled.p`
  text-align: center;
  margin: 0;
`;

function AdminPulls(props) {
  const { owner, repoPrefix } = props;
  const repositoryName = props.student;
  const { loading, error, data } = useQuery(ADMIN_PULLS, {
    variables: { name: repoPrefix + repositoryName, owner: owner },
  });

  if (loading) {
    return <CenteredParagraph>{`Loading ${repositoryName}`}</CenteredParagraph>;
  }

  if (error) {
    return (
      <div>
        <CenteredParagraph>{`Couldn't fetch pulls ${repositoryName}`}</CenteredParagraph>
      </div>
    );
  }

  return (
    <StyledListGroup>
      <ListGroup.Item action={true} href={data.repository.url}>
        <RepositoryName>{`Pull request for ${repositoryName}`}</RepositoryName>
      </ListGroup.Item>
      {data.repository.pullRequests.nodes.map((node) => (
        <Pull key={node.id} {...node} />
      ))}
    </StyledListGroup>
  );
}

export default AdminPulls;
