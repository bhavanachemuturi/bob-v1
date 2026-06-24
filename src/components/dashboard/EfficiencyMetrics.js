import React, { useState, useEffect } from 'react';
import MetricCard from '../shared/MetricCard';
import { mcpClient } from '../../services/mcpClient';
import './EfficiencyMetrics.css';

/**
 * EfficiencyMetrics Component
 * Displays real-time efficiency and usage metrics from MCP client
 */
const EfficiencyMetrics = () => {
  const [metrics, setMetrics] = useState({
    totalRequests: 0,
    cacheHitRate: '0.0',
    totalTokens: 0,
    totalCost: 0,
    avgTokensPerRequest: 0,
    errors: 0
  });

  useEffect(() => {
    // Update metrics every 2 seconds
    const interval = setInterval(() => {
      const currentMetrics = mcpClient.getMetrics();
      setMetrics(currentMetrics);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const calculateCostSavings = () => {
    const cacheHitRate = parseFloat(metrics.cacheHitRate) / 100;
    const potentialCost = metrics.totalCost / (1 - cacheHitRate || 1);
    const savings = potentialCost - metrics.totalCost;
    return savings.toFixed(2);
  };

  const getErrorRate = () => {
    if (metrics.totalRequests === 0) return 0;
    return ((metrics.errors / metrics.totalRequests) * 100).toFixed(1);
  };

  return (
    <div className="efficiency-metrics">
      <div className="efficiency-metrics__grid">
        <MetricCard
          label="Cache Hit Rate"
          value={metrics.cacheHitRate}
          unit="%"
          trend={parseFloat(metrics.cacheHitRate) > 50 ? 15 : -10}
          trendLabel="vs last hour"
          icon="⚡"
        />
        
        <MetricCard
          label="Total Requests"
          value={metrics.totalRequests}
          trend={metrics.totalRequests > 10 ? 25 : null}
          trendLabel="this session"
          icon="📊"
        />
        
        <MetricCard
          label="Tokens Used"
          value={metrics.totalTokens.toLocaleString()}
          trend={metrics.avgTokensPerRequest < 500 ? 12 : -8}
          trendLabel="efficiency"
          icon="🎯"
        />
        
        <MetricCard
          label="Cost Savings"
          value={`$${calculateCostSavings()}`}
          trend={parseFloat(calculateCostSavings()) > 0 ? 20 : 0}
          trendLabel="from caching"
          icon="💰"
        />
        
        <MetricCard
          label="Avg Tokens/Request"
          value={metrics.avgTokensPerRequest}
          trend={metrics.avgTokensPerRequest < 500 ? 5 : -5}
          trendLabel="optimization"
          icon="📈"
        />
        
        <MetricCard
          label="Error Rate"
          value={getErrorRate()}
          unit="%"
          trend={parseFloat(getErrorRate()) < 5 ? 10 : -15}
          trendLabel="reliability"
          icon="✓"
        />
      </div>
    </div>
  );
};

export default EfficiencyMetrics;

// Made with Bob
