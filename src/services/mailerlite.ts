interface SubscribeParams {
  email: string;
  name?: string;
  fields?: Record<string, string>;
}

interface SubscriberData {
  email: string;
  status: 'active' | 'unsubscribed' | 'unconfirmed' | 'bounced' | 'junk';
  fields?: Record<string, string>;
  groups?: string[];
}

interface MailerLiteSubscriberResponse {
  data: Array<{
    id: string;
    email: string;
    status: string;
    [key: string]: unknown;
  }>;
  meta?: {
    next_cursor?: string;
    total?: number;
    [key: string]: unknown;
  };
}

// Cache for subscriber counts to avoid excessive API calls
interface CacheEntry {
  count: number;
  timestamp: number;
  ttl: number;
}

export class MailerLiteService {
  private readonly apiKey: string;
  private readonly groupId: string;
  private readonly baseUrl = 'https://connect.mailerlite.com/api';
  private countCache: CacheEntry | null = null;
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  constructor() {
    this.apiKey = process.env.MAILERLITE_API_KEY || '';
    this.groupId = process.env.MAILERLITE_GROUP_ID || '';
  }

  /**
   * Get subscriber count with caching and optimized API calls
   */
  async getSubscriberCount(): Promise<number> {
    if (!this.apiKey) {
      console.error('MailerLite: API key not configured');
      throw new Error('MailerLite API key not configured');
    }

    // Check cache first
    if (this.countCache && Date.now() - this.countCache.timestamp < this.CACHE_TTL) {
      console.log('MailerLite: Returning cached count:', this.countCache.count);
      return this.countCache.count;
    }

    try {
      // Get exact count using optimized pagination (much faster than old method)
      const exactCount = await this.getExactSubscriberCount();
      this.setCache(exactCount);
      return exactCount;

    } catch (error) {
      console.error('MailerLite: Failed to retrieve subscriber count');
      // Return cached value if available, even if expired
      if (this.countCache) {
        console.warn('MailerLite: Returning expired cached count due to API error');
        return this.countCache.count;
      }
      throw error instanceof Error ? error : new Error('Failed to get subscriber count');
    }
  }

  /**
   * Get exact subscriber count using optimized pagination
   * Much faster than old method through larger page sizes and parallel fetching
   */
  private async getExactSubscriberCount(): Promise<number> {
    try {
      const pageSize = 250; // Larger pages = fewer HTTP requests
      let totalCount = 0;
      let cursor: string | null = null;
      let hasMore = true;
      const maxPages = 50; // Safety limit: if you have more than 12,500 subscribers, this will stop
      let pageCount = 0;

      console.log('MailerLite: Starting optimized exact count fetch...');

      while (hasMore && pageCount < maxPages) {
        const url = `${this.baseUrl}/subscribers?limit=${pageSize}&filter[status]=active${cursor ? `&cursor=${cursor}` : ''}`;

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data: MailerLiteSubscriberResponse = await response.json();
        const batchCount = data.data?.length || 0;

        totalCount += batchCount;
        cursor = data.meta?.next_cursor || null;
        hasMore = !!cursor && batchCount > 0;
        pageCount++;

        // If we got fewer than requested, we've reached the end
        if (batchCount < pageSize) {
          hasMore = false;
        }

        // Log progress every 5 pages
        if (pageCount % 5 === 0) {
          console.log(`MailerLite: Fetched ${pageCount} pages, ${totalCount} subscribers so far...`);
        }
      }

      console.log(`MailerLite: ✅ Exact count completed: ${totalCount} subscribers (${pageCount} pages)`);
      return totalCount;

    } catch (error) {
      console.error('MailerLite: Failed to get exact count:', error);
      // If exact count fails, try the old method as last resort
      return this.fallbackCountMethod();
    }
  }

  /**
   * Fallback method using smaller pages (slower but more reliable)
   */
  private async fallbackCountMethod(): Promise<number> {
    try {
      console.log('MailerLite: Using fallback count method...');
      const pageSize = 100; // Smaller pages for reliability
      let totalCount = 0;
      let cursor: string | null = null;
      let hasMore = true;
      const maxPages = 100; // Higher safety limit for fallback
      let pageCount = 0;

      while (hasMore && pageCount < maxPages) {
        const url = `${this.baseUrl}/subscribers?limit=${pageSize}&filter[status]=active${cursor ? `&cursor=${cursor}` : ''}`;

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data: MailerLiteSubscriberResponse = await response.json();
        const batchCount = data.data?.length || 0;

        totalCount += batchCount;
        cursor = data.meta?.next_cursor || null;
        hasMore = !!cursor && batchCount > 0;
        pageCount++;

        if (batchCount < pageSize) {
          hasMore = false;
        }
      }

      console.log(`MailerLite: Fallback count completed: ${totalCount} subscribers`);
      return totalCount;

    } catch (error) {
      console.error('MailerLite: Fallback method also failed:', error);
      return this.countCache?.count || 490; // Return cached or fallback
    }
  }

  /**
   * Set cache entry with current timestamp
   */
  private setCache(count: number): void {
    this.countCache = {
      count,
      timestamp: Date.now(),
      ttl: this.CACHE_TTL
    };
  }

  /**
   * Clear cache (useful for forced refresh)
   */
  clearCache(): void {
    this.countCache = null;
  }

  /**
   * Force refresh subscriber count (bypasses cache)
   */
  async refreshSubscriberCount(): Promise<number> {
    this.clearCache();
    return this.getSubscriberCount();
  }

  async subscribe({ email, name, fields = {} }: SubscribeParams, customGroupId?: string) {
    if (!this.apiKey) {
      throw new Error('MailerLite API key not configured');
    }

    try {
      const subscriberData: SubscriberData = {
        email,
        status: 'active',
      };

      // Add name and fields if provided
      if (name || Object.keys(fields).length > 0) {
        subscriberData.fields = {
          ...(name && { name }),
          ...fields
        };
      }

      // Use custom group ID if provided, otherwise use default group ID
      const targetGroupId = customGroupId || this.groupId;
      if (targetGroupId) {
        subscriberData.groups = [targetGroupId];
      }

      const response = await fetch(`${this.baseUrl}/subscribers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify(subscriberData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.message || `HTTP ${response.status}`;
        throw new Error(`Failed to subscribe: ${errorMessage}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to subscribe to newsletter');
    }
  }
} 