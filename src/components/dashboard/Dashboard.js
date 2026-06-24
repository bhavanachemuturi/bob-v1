import React from 'react';
import AICard from '../ai-enabled/AICard';
import AIPanel from '../ai-enabled/AIPanel';
import EfficiencyMetrics from './EfficiencyMetrics';
import { AIFeatureType } from '../../types';
import './Dashboard.css';

/**
 * Dashboard Component
 * Main dashboard layout showcasing AI-enabled components and efficiency metrics
 */
const Dashboard = () => {
  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div className="dashboard__header-content">
          <h1 className="dashboard__title">Carbon AI Design System</h1>
          <p className="dashboard__subtitle">
            AI-enabled components with built-in efficiency monitoring
          </p>
        </div>
      </header>

      <main className="dashboard__main">
        {/* Efficiency Metrics Section */}
        <section className="dashboard__section">
          <div className="dashboard__section-header">
            <h2 className="dashboard__section-title">Efficiency Signals</h2>
            <p className="dashboard__section-description">
              Real-time metrics showing AI usage, caching effectiveness, and cost savings
            </p>
          </div>
          <EfficiencyMetrics />
        </section>

        {/* AI Components Demo Section */}
        <section className="dashboard__section">
          <div className="dashboard__section-header">
            <h2 className="dashboard__section-title">AI-Enabled Components</h2>
            <p className="dashboard__section-description">
              Standardized components with integrated AI capabilities
            </p>
          </div>

          <div className="dashboard__grid">
            {/* Left Column - AI Cards */}
            <div className="dashboard__column">
              <AICard
                title="Code Summary"
                featureType={AIFeatureType.SUMMARY}
                params={{
                  content: "function calculateTotal(items) { return items.reduce((sum, item) => sum + item.price, 0); }"
                }}
                showEfficiency={true}
              />

              <AICard
                title="Documentation Generator"
                featureType={AIFeatureType.ANALYSIS}
                params={{
                  content: "Analyze component structure and generate documentation"
                }}
                showEfficiency={true}
              />

              <AICard
                title="Code Completion"
                featureType={AIFeatureType.COMPLETION}
                params={{
                  prompt: "Create a React component for user authentication"
                }}
                showEfficiency={true}
              />
            </div>

            {/* Right Column - AI Panel */}
            <div className="dashboard__column">
              <AIPanel
                title="AI Copilot"
                featureType={AIFeatureType.COPILOT}
                placeholder="Ask about code patterns, best practices, or get suggestions..."
                showUsageStats={true}
              />
            </div>
          </div>
        </section>

        {/* System Information Section */}
        <section className="dashboard__section">
          <div className="dashboard__section-header">
            <h2 className="dashboard__section-title">System Features</h2>
          </div>
          
          <div className="dashboard__features">
            <div className="dashboard__feature">
              <div className="dashboard__feature-icon">🔄</div>
              <div className="dashboard__feature-content">
                <h3 className="dashboard__feature-title">Request Deduplication</h3>
                <p className="dashboard__feature-description">
                  Identical in-flight requests are automatically deduplicated to prevent redundant API calls
                </p>
              </div>
            </div>

            <div className="dashboard__feature">
              <div className="dashboard__feature-icon">⚡</div>
              <div className="dashboard__feature-content">
                <h3 className="dashboard__feature-title">Intelligent Caching</h3>
                <p className="dashboard__feature-description">
                  Responses cached with 5-minute TTL, reducing costs and improving response times
                </p>
              </div>
            </div>

            <div className="dashboard__feature">
              <div className="dashboard__feature-icon">📊</div>
              <div className="dashboard__feature-content">
                <h3 className="dashboard__feature-title">Usage Tracking</h3>
                <p className="dashboard__feature-description">
                  Component-level metrics for tokens, costs, and performance monitoring
                </p>
              </div>
            </div>

            <div className="dashboard__feature">
              <div className="dashboard__feature-icon">🎯</div>
              <div className="dashboard__feature-content">
                <h3 className="dashboard__feature-title">MCP Integration</h3>
                <p className="dashboard__feature-description">
                  Centralized AI services via Model Context Protocol for consistent behavior
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

// Made with Bob
