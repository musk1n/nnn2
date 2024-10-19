import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { Web3ReactProvider } from '@web3-react/core';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import PortfolioOverview from './components/PortfolioOverview';
import Analytics from './components/Analytics';
import client from './apollo/client';
import { metaMask, hooks } from './connectors';

function App() {
  return (
    <Web3ReactProvider connectors={[[metaMask, hooks]]}>
      <ApolloProvider client={client}>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <Header />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/portfolio" element={<PortfolioOverview />} />
                <Route path="/analytics" element={<Analytics />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ApolloProvider>
    </Web3ReactProvider>
  );
}

export default App;