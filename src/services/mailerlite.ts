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
      console.error('MailerLite API key not configured');
      throw new Error('MailerLite API key not configured');
    }

    console.log('MailerLite Service: Starting subscriber count fetch...');
    console.log('- API Key starts with:', this.apiKey.substring(0, 10) + '...');
    console.log('- Group ID:', this.groupId);

    try {
      if (this.groupId) {
        // Try approach 1: Use the groups endpoint to get group stats
        try {
          const url = `${this.baseUrl}/groups/${this.groupId}`;
          console.log('- Trying group stats URL:', url);

          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${this.apiKey}`,
              'Accept': 'application/json',
            },
          });

          console.log('- Group response status:', response.status);

          if (response.ok) {
            const data = await response.json();
            console.log('- Group response data:', JSON.stringify(data, null, 2));
            
            // Try different possible locations for the count
            const possibleCounts = [
              data.data?.total,
              data.data?.subscriber_count,
              data.data?.subscribers_count,
              data.data?.count,
              data.total,
              data.subscriber_count,
              data.subscribers_count,
              data.count
            ];
            
            console.log('- Possible count values:', possibleCounts);
            
            const count = possibleCounts.find(val => typeof val === 'number' && val > 0) || 0;
            if (count > 0) {
              console.log('- Found count from group stats:', count);
              return count;
            }
          }
        } catch (error) {
          console.log('- Group stats approach failed:', error instanceof Error ? error.message : 'Unknown error');
        }

        // Try approach 2: Get all subscribers and count them
        try {
          console.log('- Trying to count subscribers manually...');
          let totalCount = 0;
          let cursor = null;
          let hasMore = true;
          
          while (hasMore && totalCount < 2000) { // Safety limit
            const url = `${this.baseUrl}/groups/${this.groupId}/subscribers?limit=100${cursor ? `&cursor=${cursor}` : ''}`;
            console.log(`- Fetching batch with cursor: ${cursor || 'none'}`);
            
            const response = await fetch(url, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Accept': 'application/json',
              },
            });

            if (!response.ok) {
              throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
            const batchCount = data.data?.length || 0;
            totalCount += batchCount;
            
            console.log(`- Batch size: ${batchCount}, Total so far: ${totalCount}`);
            
            cursor = data.meta?.next_cursor;
            hasMore = !!cursor && batchCount > 0;
          }
          
          console.log('- Final manual count:', totalCount);
          return totalCount;
          
                 } catch (error) {
           console.log('- Manual counting approach failed:', error instanceof Error ? error.message : 'Unknown error');
        }
      }

      // Fallback: return default
      console.log('- All approaches failed, returning fallback count');
      return 0;
      
    } catch (error) {
      console.error('- Detailed MailerLite error:', error);
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