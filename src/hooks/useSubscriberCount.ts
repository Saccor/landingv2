import { useState, useEffect } from 'react';

interface SubscriberCount {
  count: number;
  total: number;
}

interface UseSubscriberCountReturn {
  count: number;
  total: number;
  loading: boolean;
  error: string | null;
  isLive: boolean;
}

export function useSubscriberCount(): UseSubscriberCountReturn {
  const [data, setData] = useState<SubscriberCount>({ count: 0, total: 1000 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [hasRealData, setHasRealData] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Try real-time connection first
    const connectToLiveUpdates = () => {
      try {
        const eventSource = new EventSource('/api/live-count');
        
        eventSource.onopen = () => {
          setIsLive(true);
          setError(null);
          console.log('✅ Live subscriber count connected');
        };
        
        eventSource.onmessage = (event) => {
          try {
            const newData = JSON.parse(event.data);
            setData(newData);
            setLoading(false);
            setHasRealData(true);
          } catch (e) {
            console.error('Failed to parse live update:', e);
          }
        };
        
        eventSource.onerror = () => {
          setIsLive(false);
          setError('Live connection failed, falling back to polling');
          eventSource.close();
          
          // Fallback to polling
          startPolling();
        };
        
        return eventSource;
      } catch (e) {
        console.error('Failed to create live connection:', e);
        startPolling();
        return null;
      }
    };

    // Fallback polling method
    const startPolling = () => {
      const fetchCount = async () => {
        // Only poll if page is visible
        if (!isVisible) return;

        try {
          setLoading(true);
          setError(null);

          const response = await fetch('/api/subscriber-count');
          if (!response.ok) {
            throw new Error('Failed to fetch subscriber count');
          }

          const result: SubscriberCount = await response.json();
          setData(result);
          setHasRealData(true);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Unknown error occurred');
          if (!hasRealData) {
            setData({ count: 485, total: 1000 });
          }
        } finally {
          setLoading(false);
        }
      };

      fetchCount();
      const interval = setInterval(fetchCount, 30 * 1000);

      return () => clearInterval(interval);
    };

    // Handle page visibility changes
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Try live connection first
    const eventSource = connectToLiveUpdates();

    // Cleanup
    return () => {
      if (eventSource) {
        eventSource.close();
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [hasRealData, isVisible]);

  return {
    count: data.count,
    total: data.total,
    loading,
    error,
    isLive,
  };
} 