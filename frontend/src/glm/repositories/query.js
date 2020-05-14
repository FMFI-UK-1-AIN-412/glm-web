import { gql } from "apollo-boost";

export const REPOSITORIES_QUERY = gql`
  {
    viewer {
      login
      repositories(first: 100, isFork: true) {
        edges {
          node {
            id
            name
            parent {
              name
              owner {
                login
              }
            }
          }
        }
      }
    }
  }
`;
