import React from 'react';
import { Link } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { metaMask } from '../connectors';
import { Wallet } from 'lucide-react';

const Header: React.FC = () => {
  const { account, isActive } = useWeb3React();

  const handleConnect = () => {
    metaMask.activate();
  };

  const handleDisconnect = () => {
    metaMask.deactivate();
  };

  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-xl font-bold text-gray-800">Web3 Portfolio Manager</Link>
          <Link to="/portfolio" className="text-gray-600 hover:text-gray-800">Portfolio</Link>
          <Link to="/analytics" className="text-gray-600 hover:text-gray-800">Analytics</Link>
        </div>
        <div>
          {isActive ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">{account?.slice(0, 6)}...{account?.slice(-4)}</span>
              <button onClick={handleDisconnect} className="bg-red-500 text-white px-4 py-2 rounded-md text-sm">Disconnect</button>
            </div>
          ) : (
            <button onClick={handleConnect} className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm flex items-center">
              <Wallet className="mr-2" size={16} />
              Connect Wallet
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;