import { createOpenAI } from "@ai-sdk/openai";
import { convertToCoreMessages, streamText } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const aipi = createOpenAI({
    baseURL: "https://aipi.vercel.app/api/",
    apiKey: "aipi"
});

  const result = await streamText({
    model: aipi("openai:gpt-4o"),
    system: "You are a helpful assistant.",
    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
}
