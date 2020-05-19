import { gql } from "apollo-boost";

export const STUDENT_SUBMISSIONS = gql`
  query pulls($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      url
      pullRequests(
        first: 100
        states: [OPEN, CLOSED, MERGED]
        orderBy: { field: CREATED_AT, direction: ASC }
      ) {
        nodes {
          id
          url
          state
          baseRefName
          headRefName
        }
      }
    }
  }
`;

export default STUDENT_SUBMISSIONS;
