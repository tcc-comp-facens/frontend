import type { AnalysisRequest } from '../types';

interface AnalysisControlsProps {
  onSubmit: (request: AnalysisRequest) => void;
}

export function AnalysisControls({ onSubmit }: AnalysisControlsProps) {
  // Full implementation comes in task 13.2
  void onSubmit;
  return <div data-testid="analysis-controls" />;
}
