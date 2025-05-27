interface SubscribeParams {
  email: string;
  name?: string;
  fields?: Record<string, string>;
}

export class MailerLiteService {
  private readonly apiKey: string;
  private readonly groupId: string;
  private readonly baseUrl = 'https://connect.mailerlite.com/api';

  constructor() {
    this.apiKey = process.env.MAILERLITE_API_KEY || '';
    this.groupId = process.env.MAILERLITE_GROUP_ID || '';
  }

  async subscribe({ email, name, fields = {} }: SubscribeParams) {
    if (!this.apiKey) {
      throw new Error('MailerLite API key not configured');
    }

    try {
      const subscriberData: any = {
        email,
        status: 'active',
      };

      // Add name and fields if provided
      if (name || Object.keys(fields).length > 0) {
        subscriberData.fields = { name, ...fields };
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