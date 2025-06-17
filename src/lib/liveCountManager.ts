// In-memory store for real-time updates
let subscriberCount = 490; // Updated fallback value to match database
const clients: Set<ReadableStreamDefaultController<Uint8Array>> = new Set();

export function addClient(writer: ReadableStreamDefaultController<Uint8Array>) {
  clients.add(writer);
}

export function removeClient(writer: ReadableStreamDefaultController<Uint8Array>) {
  clients.delete(writer);
}

export function getSubscriberCount(): number {
  return subscriberCount;
}

export function setSubscriberCount(count: number) {
  subscriberCount = count;
}

// Function to broadcast updates (called from webhook)
export function broadcastUpdate(data: { count: number; total: number }) {
  subscriberCount = data.count;
  const message = `data: ${JSON.stringify(data)}\n\n`;
  
  clients.forEach(async (writer) => {
    try {
      writer.enqueue(new TextEncoder().encode(message));
    } catch {
      clients.delete(writer);
    }
  });
}

// Function to force refresh count from database
export async function refreshCountFromDatabase() {
  try {
    const { MailerLiteService } = await import('@/services/mailerlite');
    const mailerLite = new MailerLiteService();
    const realCount = await mailerLite.getSubscriberCount();
    subscriberCount = realCount;
    
    // Broadcast the real count to all connected clients
    broadcastUpdate({ count: realCount, total: 1000 });
    
    return realCount;
  } catch (error) {
    console.error('Failed to refresh count from database:', error);
    return subscriberCount;
  }
} 