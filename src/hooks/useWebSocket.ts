import { useEffect, useRef, useCallback } from 'react';
import type { WSEvent } from '../types';

interface UseWebSocketOptions {
  analysisId: string | null;
  onEvent: (event: WSEvent) => void;
}

const MAX_RETRIES = 3;

export function useWebSocket({ analysisId, onEvent }: UseWebSocketOptions): void {
  const wsRef = useRef<WebSocket | null>(null);
  const retriesRef = useRef(0);
  const onEventRef = useRef(onEvent);
  onEventRef.current = onEvent;

  const connect = useCallback(() => {
    if (!analysisId) return;

    const wsUrl = `${import.meta.env.VITE_WS_URL}/ws/${analysisId}`;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      try {
        const data: WSEvent = JSON.parse(event.data as string);
        onEventRef.current(data);
      } catch {
        // ignore malformed messages
      }
    };

    ws.onclose = () => {
      if (retriesRef.current < MAX_RETRIES) {
        retriesRef.current += 1;
        setTimeout(connect, 1000 * retriesRef.current);
      }
    };

    ws.onerror = () => {
      ws.close();
    };
  }, [analysisId]);

  useEffect(() => {
    retriesRef.current = 0;
    connect();

    return () => {
      wsRef.current?.close();
    };
  }, [connect]);
}
