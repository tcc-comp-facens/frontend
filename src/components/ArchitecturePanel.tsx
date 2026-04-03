import type { BenchmarkMetrics } from '../types';

interface ArchitecturePanelProps {
  title: string;
  text: string;
  metrics: BenchmarkMetrics | null;
}

export function ArchitecturePanel({ title, text, metrics }: ArchitecturePanelProps) {
  // Full implementation comes in task 13.4
  void text;
  void metrics;
  return <div data-testid={`architecture-panel-${title}`} />;
}
