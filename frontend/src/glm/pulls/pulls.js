import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";

import Pull from "./pull/pull";
import { PULLS } from "./query";

const CenteredParagraph = styled.p`
  text-align: center;
`;

function Pulls() {
  const params = useParams();
  const repositoryName = params.selected_repository;
  const owner = params.owner;
  const { loading, error, data } = useQuery(PULLS, {
    variables: { name: repositoryName, owner: owner },
  });

  if (loading) {
    return <CenteredParagraph>Loading</CenteredParagraph>;
  }

  if (error) {
    return (
      <div>
        <CenteredParagraph>Error occured</CenteredParagraph>
        <CenteredParagraph>Couldn't fetch pulls</CenteredParagraph>
      </div>
    );
  }

  const pullRequests = data.repository.pullRequests.nodes;

  if (pullRequests.length == 0) {
    return <CenteredParagraph>No pull requests found</CenteredParagraph>;
  }

  return (
    <ListGroup>
      {pullRequests.map((node) => (
        <Pull key={node.id} {...node} />
      ))}
    </ListGroup>
  );
}

export default Pulls;
