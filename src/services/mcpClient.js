/**
 * MCP Client Service
 * Handles communication with MCP servers for AI operations, caching, and metrics
 */

class MCPClient {
  constructor() {
    this.cache = new Map();
    this.requestQueue = [];
    this.metrics = {
      totalRequests: 0,
      cacheHits: 0,
      cacheMisses: 0,
      totalTokens: 0,
      totalCost: 0,
      errors: 0
    };
  }

  /**
   * Generate cache key from request parameters
   */
  generateCacheKey(featureType, params) {
    return `${featureType}:${JSON.stringify(params)}`;
  }

  /**
   * Check if request can be served from cache
   */
  checkCache(cacheKey) {
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < 300000) { // 5 min TTL
      this.metrics.cacheHits++;
      return cached.data;
    }
    this.metrics.cacheMisses++;
    return null;
  }

  /**
   * Store response in cache
   */
  setCache(cacheKey, data) {
    this.cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
  }

  /**
   * Deduplicate identical in-flight requests
   */
  deduplicateRequest(cacheKey) {
    const existing = this.requestQueue.find(req => req.key === cacheKey);
    if (existing) {
      return existing.promise;
    }
    return null;
  }

  /**
   * Main method to call AI features via MCP
   */
  async callAIFeature(featureType, params) {
    this.metrics.totalRequests++;
    const cacheKey = this.generateCacheKey(featureType, params);

    // Check cache first
    const cachedResult = this.checkCache(cacheKey);
    if (cachedResult) {
      return {
        ...cachedResult,
        cached: true,
        tokens: 0
      };
    }

    // Check for duplicate in-flight requests
    const duplicatePromise = this.deduplicateRequest(cacheKey);
    if (duplicatePromise) {
      return duplicatePromise;
    }

    // Create new request
    const promise = this.executeAIRequest(featureType, params, cacheKey);
    this.requestQueue.push({ key: cacheKey, promise });

    try {
      const result = await promise;
      this.setCache(cacheKey, result);
      return { ...result, cached: false };
    } catch (error) {
      this.metrics.errors++;
      throw error;
    } finally {
      this.requestQueue = this.requestQueue.filter(req => req.key !== cacheKey);
    }
  }

  /**
   * Execute actual AI request (simulated for demo)
   */
  async executeAIRequest(featureType, params, cacheKey) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500));

    const tokens = Math.floor(Math.random() * 1000) + 100;
    this.metrics.totalTokens += tokens;
    this.metrics.totalCost += tokens * 0.00002; // $0.02 per 1K tokens

    // Simulate different response types
    const responses = {
      summary: `AI-generated summary for ${params.content?.substring(0, 30)}...`,
      copilot: `Suggested code completion based on context`,
      assistant: `AI assistant response to: ${params.query}`,
      completion: `Completed text: ${params.prompt}...`,
      analysis: `Analysis results: ${Math.floor(Math.random() * 100)}% confidence`
    };

    return {
      content: responses[featureType] || 'AI response',
      tokens,
      responseTime: Math.random() * 500 + 200,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Get current metrics
   */
  getMetrics() {
    const cacheHitRate = this.metrics.totalRequests > 0
      ? (this.metrics.cacheHits / this.metrics.totalRequests) * 100
      : 0;

    return {
      ...this.metrics,
      cacheHitRate: cacheHitRate.toFixed(1),
      avgTokensPerRequest: this.metrics.totalRequests > 0
        ? Math.floor(this.metrics.totalTokens / this.metrics.totalRequests)
        : 0
    };
  }

  /**
   * Clear cache (for testing or manual refresh)
   */
  clearCache() {
    this.cache.clear();
  }
}

// Singleton instance
export const mcpClient = new MCPClient();

// Made with Bob
