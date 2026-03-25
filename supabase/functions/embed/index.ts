import { Supabase } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const MAX_TEXT_LENGTH = 8000;

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json().catch(() => null);
    const rawText = typeof body?.text === "string" ? body.text.trim() : "";

    if (!rawText) {
      return new Response(JSON.stringify({ error: "text is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const text = rawText.slice(0, MAX_TEXT_LENGTH);
    const session = new Supabase.ai.Session("gte-small");
    const embedding = await session.run(text, {
      mean_pool: true,
      normalize: true,
    });

    if (!Array.isArray(embedding) || embedding.length !== 384) {
      return new Response(JSON.stringify({ error: "embedding model returned invalid vector" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ embedding }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "failed to embed text", details: String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
