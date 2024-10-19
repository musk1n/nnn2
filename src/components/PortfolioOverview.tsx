import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_TOKENS } from '../graphql/queries';
import { useWeb3React } from '@web3-react/core';

const PortfolioOverview: React.FC = () => {
  const { account } = useWeb3React();
  const { loading, error, data } = useQuery(GET_USER_TOKENS, {
    variables: { user: account?.toLowerCase() },
    skip: !account,
  });

  if (!account) {
    return <div className="text-center mt-10">Please connect your wallet to view your portfolio.</div>;
  }

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10">Error: {error.message}</div>;

  const positions = data?.positions || [];

  // Process positions to get token balances
  const tokenBalances = positions.reduce((acc: any, position: any) => {
    const { token0, token1 } = position.pool;
    const balance0 = parseFloat(position.depositedToken0);
    const balance1 = parseFloat(position.depositedToken1);

    acc[token0.symbol] = (acc[token0.symbol] || 0) + balance0;
    acc[token1.symbol] = (acc[token1.symbol] || 0) + balance1;

    return acc;
  }, {});

  const tokens = Object.entries(tokenBalances).map(([symbol, balance]) => ({ symbol, balance }));

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Portfolio Overview</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Your Tokens</h2>
        {tokens.length === 0 ? (
          <p>No tokens found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Token</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tokens.map((token: any) => (
                  <tr key={token.symbol}>
                    <td className="px-6 py-4 whitespace-nowrap">{token.symbol}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{token.balance.toFixed(6)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioOverview;