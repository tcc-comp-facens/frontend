export interface AnalysisRequest {
  dateFrom: number;
  dateTo: number;
  healthParams: {
    dengue: boolean;
    covid: boolean;
    vaccination: boolean;
  };
}

export interface AgentMetric {
  agentName: string;
  executionTimeMs: number;
  cpuPercent: number;
  memoryMb: number;
}

export interface BenchmarkMetrics {
  architecture: 'star' | 'hierarchical';
  totalExecutionTimeMs: number;
  agentMetrics: AgentMetric[];
}

export interface WSEvent {
  analysisId: string;
  architecture: 'star' | 'hierarchical';
  type: 'chunk' | 'done' | 'error' | 'metric';
  payload: string | BenchmarkMetrics;
}
