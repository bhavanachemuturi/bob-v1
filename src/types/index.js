// Type definitions for the AI Design System

export const ComponentStatus = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
  CACHED: 'cached'
};

export const MetricType = {
  TOKEN_USAGE: 'token_usage',
  CACHE_HIT_RATE: 'cache_hit_rate',
  RESPONSE_TIME: 'response_time',
  ERROR_RATE: 'error_rate',
  COST_SAVINGS: 'cost_savings'
};

export const AIFeatureType = {
  SUMMARY: 'summary',
  COPILOT: 'copilot',
  ASSISTANT: 'assistant',
  COMPLETION: 'completion',
  ANALYSIS: 'analysis'
};

// Mock data structure examples
export const createMetric = (type, value, trend, label) => ({
  type,
  value,
  trend,
  label,
  timestamp: new Date().toISOString()
});

export const createAIRequest = (featureType, componentId, cached = false) => ({
  id: Math.random().toString(36).substr(2, 9),
  featureType,
  componentId,
  cached,
  timestamp: new Date().toISOString(),
  tokens: cached ? 0 : Math.floor(Math.random() * 1000) + 100,
  responseTime: cached ? Math.random() * 50 : Math.random() * 500 + 200
});

// Made with Bob
