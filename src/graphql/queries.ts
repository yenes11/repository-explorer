import { gql } from '@apollo/client';

export const getRepositories =  
   gql`
    query GetRepositories($username: String, $cursor: String) {
      repositoryOwner(login: $username) {
        repositories(first: 10, after: $cursor) {
          totalCount
          nodes{
            name
            createdAt
            forkCount
            stargazers { totalCount }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
  `;

export const repo = gql`
  query ($username: String, $repository: String) {
    user (login: $username) {
      repository (name: $repository) {
        name description url
      }
    }
  }
`

export const getUserAndRepositories = gql`
  query GetUserAndRepositories($username: String) {
    user(username: $username) {
      id
      name
      repositories {
        totalCount
        nodes {
          name
          createdAt
          forkCount
          stargazers {
            totalCount
          }
        }
      }
    }
  }
`

export const getRepositoriesByName = gql`
  query GetRepositoriesByName($repositoryName: String!, $cursor: String) {
    search(query: $repositoryName, type: REPOSITORY, first: 10, after: $cursor) {
      edges {
        node {
          ... on Repository {
            name
            owner {
              login
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`
export const GET_REPOSITORIES = gql`
  query ($keyword: String!, $perPage: Int!, $cursor: String!) {
    search(query: $keyword , type: REPOSITORY, first: $perPage, after: $cursor) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            id
            name
            owner {
              login
            }
          }
        }
      }
    }
  }
`

export const GET_REPOSITORY_BY_ID = gql`
  query ($id: ID!) {
    node(id: $id) {
      ... on Repository {
        name
        description
        stargazers { totalCount }
        watchers { totalCount }
        forks { totalCount }
        languages { totalCount }
      }
    }
  }
`