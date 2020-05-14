import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { ListGroup } from "react-bootstrap";

import Repository from "./repository/repository";
import { REPOSITORIES_QUERY } from "./query";

const LoadingParagraph = styled.p`
  text-align: center;
`;

function Repositories() {
  const { loading, data } = useQuery(REPOSITORIES_QUERY);

  if (loading || !data) {
    return <LoadingParagraph>Loading</LoadingParagraph>;
  }
  return (
    <div>
      <ListGroup>
        {data.viewer.repositories.edges.map((edge) => (
          <Repository key={edge.node.id} {...edge.node} />
        ))}
      </ListGroup>
    </div>
  );
}

export default Repositories;
