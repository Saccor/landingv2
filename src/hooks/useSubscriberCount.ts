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
}

export function useSubscriberCount(): UseSubscriberCountReturn {
  const [data, setData] = useState<SubscriberCount>({ count: 485, total: 1000 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/subscriber-count');
        if (!response.ok) {
          throw new Error('Failed to fetch subscriber count');
        }
        
        const result: SubscriberCount = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        // Keep fallback data on error
      } finally {
        setLoading(false);
      }
    };

    fetchCount();

    // Refresh every 5 minutes
    const interval = setInterval(fetchCount, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    count: data.count,
    total: data.total,
    loading,
    error,
  };
} 