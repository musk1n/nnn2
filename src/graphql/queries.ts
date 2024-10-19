import { gql } from '@apollo/client';

export const GET_USER_POSITIONS = gql`
  query GetUserPositions($user: Bytes!) {
    positions(where: { owner: $user }) {
      id
      pool {
        token0 {
          symbol
        }
        token1 {
          symbol
        }
      }
      liquidity
    }
  }
`;

export const GET_USER_TOKENS = gql`
  query GetUserTokens($user: Bytes!) {
    positions(where: { owner: $user }) {
      pool {
        token0 {
          id
          symbol
          derivedETH
        }
        token1 {
          id
          symbol
          derivedETH
        }
      }
      depositedToken0
      depositedToken1
    }
  }
`;

export const GET_USER_TRANSACTIONS = gql`
  query GetUserTransactions($user: Bytes!) {
    mints(where: { owner: $user }, orderBy: timestamp, orderDirection: desc) {
      id
      pool {
        token0 {
          symbol
        }
        token1 {
          symbol
        }
      }
      amount0
      amount1
      amountUSD
      timestamp
    }
  }
`;