interface SubscribeParams {
  email: string;
  name?: string;
  fields?: Record<string, string>;
}

export class MailerLiteService {
  private readonly apiKey: string;
  private readonly groupId: string;
  private readonly baseUrl = 'https://api.mailerlite.com/api/v2';

  constructor() {
    this.apiKey = process.env.MAILERLITE_API_KEY || '';
    this.groupId = process.env.MAILERLITE_GROUP_ID || '';
  }

  async subscribe({ email, name, fields = {} }: SubscribeParams) {
    try {
      const response = await fetch(`${this.baseUrl}/subscribers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-MailerLite-ApiKey': this.apiKey,
        },
        body: JSON.stringify({
          email,
          name,
          fields,
          resubscribe: true,
          autoresponders: true,
          type: 'active',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }

      const data = await response.json();
      
      // Add to group if groupId is provided
      if (this.groupId) {
        await this.addToGroup(data.id);
      }

      return data;
    } catch (error) {
      console.error('MailerLite subscription error:', error);
      throw error;
    }
  }

  private async addToGroup(subscriberId: string) {
    try {
      const response = await fetch(
        `${this.baseUrl}/groups/${this.groupId}/subscribers`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-MailerLite-ApiKey': this.apiKey,
          },
          body: JSON.stringify({
            subscribers: [{ id: subscriberId }],
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add subscriber to group');
      }

      return await response.json();
    } catch (error) {
      console.error('MailerLite add to group error:', error);
      throw error;
    }
  }
} 