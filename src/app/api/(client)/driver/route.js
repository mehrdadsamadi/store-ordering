import Order from "@/models/order.model";

// app/api/driver/sse/route.js
export async function GET(req) {
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      start(controller) {
        function sendEvent(data) {
          const eventString = `data: ${JSON.stringify(data)}\n\n`;
          controller.enqueue(encoder.encode(eventString));
        }
  
        const intervalId = setInterval(async () => {
          const orders = await Order.find().populate("address")
          sendEvent(orders);
        }, 1000);
  
        req.signal.addEventListener('abort', () => {
          clearInterval(intervalId);
          controller.close();
        });
      },
    });
  
    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  }
  