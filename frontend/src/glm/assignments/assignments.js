import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Row, Container, Col } from "react-bootstrap"
import { useQuery } from "@apollo/react-hooks";

import { serverUrl } from "../config";
import Assignment from "./assignment/assignment";
import { PULLS } from "./query";

const CenteredParagraph = styled.p`
  text-align: center;
`;

function Assignments() {
  const params = useParams();
  const repositoryName = params.selected_repository;
  const [assignemntBranches, setAssignemntBranches] = useState(null);
  const owner = params.owner;
  const { loading, error, data } = useQuery(PULLS, {
    variables: { name: repositoryName, owner: owner },
  });

  useEffect(() => {
    axios
      .get(`${serverUrl}/assignments`)
      .then((response) => {
        const { data } = response;
        setAssignemntBranches(data);
      })
      .catch(() => {
        setAssignemntBranches([]);
      });
  }, []);

  if (loading || assignemntBranches === null) {
    return <CenteredParagraph>Loading</CenteredParagraph>;
  }

  if (error || assignemntBranches.length === 0) {
    return (
      <div>
        <CenteredParagraph>Error occured</CenteredParagraph>
        <CenteredParagraph>Couldn't fetch pulls</CenteredParagraph>
      </div>
    );
  }

  const pullRequests = data.repository.pullRequests.nodes;

  if (pullRequests.length === 0) {
    return <CenteredParagraph>No pull requests found</CenteredParagraph>;
  }

  return (
    <div>
			<Container fluid={true}>
				<Row>
					<Col xl={{ span: 8, offset: 2}}>
						{assignemntBranches.map((assignment) => (
							<Assignment
								key={assignment}
								assignment={assignment}
								pullRequests={pullRequests}
							/>
						))}
					</Col>
				</Row>
      </Container>
    </div>
  );
}

export default Assignments;
