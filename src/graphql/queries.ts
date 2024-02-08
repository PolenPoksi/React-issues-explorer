import { gql } from "@apollo/client";

export const GET_REPOSITORY_ISSUES = gql`
  query GetRepositoryIssues(
    $name: String!
    $owner: String!
    $states: [IssueState!]
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    repository(name: $name, owner: $owner) {
      issues(
        first: $first
        last: $last
        after: $after
        before: $before
        states: $states
      ) {
        edges {
          node {
            id
            title
            number
            state
            url
            createdAt
          }
          cursor
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  }
`;
