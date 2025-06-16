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
    [key: string]: unknown;
  };
}

export class MailerLiteService {
  private readonly apiKey: string;
  private readonly groupId: string;
  private readonly baseUrl = 'https://connect.mailerlite.com/api';

  constructor() {
    this.apiKey = process.env.MAILERLITE_API_KEY || '';
    this.groupId = process.env.MAILERLITE_GROUP_ID || '';
  }

  async getSubscriberCount(): Promise<number> {
    if (!this.apiKey) {
      console.error('MailerLite: ❌ API key not configured');
      throw new Error('MailerLite API key not configured');
    }

    try {
      if (this.groupId) {
        // Try approach 1: Use the groups endpoint to get group stats
        try {
          const url = `${this.baseUrl}/groups/${this.groupId}`;

          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${this.apiKey}`,
              'Accept': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            
            // Try different possible locations for the count
            const possibleCounts = [
              data.data?.active_count,  // This is the correct field!
              data.data?.total,
              data.data?.subscriber_count,
              data.data?.subscribers_count,
              data.data?.count,
              data.total,
              data.subscriber_count,
              data.subscribers_count,
              data.count
            ];
            
            const count = possibleCounts.find(val => typeof val === 'number' && val >= 0) || 0;
            if (count > 0) {
              return count;
            }
          }
        } catch {
          // Silent fallback to manual counting
        }

        // Try approach 2: Get all subscribers and count them
        try {
          let totalCount = 0;
          let cursor = null;
          let hasMore = true;
          
          while (hasMore && totalCount < 2000) { // Safety limit
            const url: string = `${this.baseUrl}/groups/${this.groupId}/subscribers?limit=100${cursor ? `&cursor=${cursor}` : ''}`;
            
            const response: Response = await fetch(url, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Accept': 'application/json',
              },
            });

            if (!response.ok) {
              throw new Error(`HTTP ${response.status}`);
            }

            const data: MailerLiteSubscriberResponse = await response.json();
            const batchCount = data.data?.length || 0;
            totalCount += batchCount;
            
            cursor = data.meta?.next_cursor;
            hasMore = !!cursor && batchCount > 0;
          }
          
          return totalCount;
          
        } catch {
          console.error('MailerLite: ❌ Failed to retrieve subscriber count');
        }
      }

      console.error('MailerLite: ❌ No group ID configured');
      return 0;
      
    } catch (error) {
      console.error('MailerLite: ❌ Service error');
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to get subscriber count');
    }
  }

  async subscribe({ email, name, fields = {} }: SubscribeParams) {
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

      // Add to group if groupId is provided
      if (this.groupId) {
        subscriberData.groups = [this.groupId];
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