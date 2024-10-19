import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_TRANSACTIONS } from '../graphql/queries';
import { useWeb3React } from '@web3-react/core';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Analytics: React.FC = () => {
  const { account } = useWeb3React();
  const { loading, error, data } = useQuery(GET_USER_TRANSACTIONS, {
    variables: { user: account?.toLowerCase() },
    skip: !account,
  });

  if (!account) {
    return <div className="text-center mt-10">Please connect your wallet to view analytics.</div>;
  }

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10">Error: {error.message}</div>;

  const transactions = data?.mints || [];

  // Process transactions for pie chart
  const tokenVolumes = transactions.reduce((acc: any, tx: any) => {
    const token0 = tx.pool.token0.symbol;
    const token1 = tx.pool.token1.symbol;
    acc[token0] = (acc[token0] || 0) + parseFloat(tx.amount0);
    acc[token1] = (acc[token1] || 0) + parseFloat(tx.amount1);
    return acc;
  }, {});

  const pieChartData = Object.entries(tokenVolumes).map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Analytics</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Transaction Volume by Token</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {pieChartData.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        {transactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tokens</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount 0</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount 1</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value (USD)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.slice(0, 10).map((tx: any) => (
                  <tr key={tx.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{tx.pool.token0.symbol}/{tx.pool.token1.symbol}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{parseFloat(tx.amount0).toFixed(4)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{parseFloat(tx.amount1).toFixed(4)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${parseFloat(tx.amountUSD).toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(tx.timestamp * 1000).toLocaleString()}</td>
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

export default Analytics;