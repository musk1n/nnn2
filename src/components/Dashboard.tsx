import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_POSITIONS } from '../graphql/queries';
import { useWeb3React } from '@web3-react/core';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard: React.FC = () => {
  const { account } = useWeb3React();
  const { loading, error, data } = useQuery(GET_USER_POSITIONS, {
    variables: { user: account?.toLowerCase() },
    skip: !account,
  });

  if (!account) {
    return <div className="text-center mt-10">Please connect your wallet to view your dashboard.</div>;
  }

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10">Error: {error.message}</div>;

  const positions = data?.positions || [];

  // Mock data for the chart
  const chartData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4500 },
    { name: 'May', value: 6000 },
    { name: 'Jun', value: 5500 },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Portfolio Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Your Positions</h2>
        {positions.length === 0 ? (
          <p>No positions found.</p>
        ) : (
          <ul className="space-y-4">
            {positions.map((position: any) => (
              <li key={position.id} className="border-b pb-2">
                <p>Pool: {position.pool.token0.symbol}/{position.pool.token1.symbol}</p>
                <p>Liquidity: {position.liquidity}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;