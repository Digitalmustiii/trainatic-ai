import { httpRouter } from "convex/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { api } from "./_generated/api";
import { httpAction } from "./_generated/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const http = httpRouter();

let genAI: GoogleGenerativeAI | null = null;
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) genAI = new GoogleGenerativeAI(apiKey);
} catch (error) {
  console.error("Failed to initialize GoogleGenerativeAI:", error);
}

// Clerk webhook
http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) return new Response("Webhook not configured", { status: 200 });

    const svix_id = request.headers.get("svix-id");
    const svix_signature = request.headers.get("svix-signature");
    const svix_timestamp = request.headers.get("svix-timestamp");

    if (!svix_id || !svix_signature || !svix_timestamp) {
      return new Response("Missing headers", { status: 400 });
    }

    try {
      const payload = await request.json();
      const wh = new Webhook(webhookSecret);
      const evt = wh.verify(JSON.stringify(payload), {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;

      if (evt.type === "user.created") {
        const { id, first_name, last_name, image_url, email_addresses } = evt.data;
        const email = email_addresses?.[0]?.email_address;
        if (email) {
          await ctx.runMutation(api.users.syncUser, {
            email,
            name: `${first_name || ""} ${last_name || ""}`.trim(),
            image: image_url,
            clerkId: id,
          });
        }
      }
      return new Response("Success", { status: 200 });
    } catch (err) {
      console.error("Webhook error:", err);
      return new Response("Error", { status: 400 });
    }
  }),
});

// Fixed path to match frontend call
http.route({
  path: "/api/generate-fitness-plan",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      if (!genAI) throw new Error("Gemini AI not initialized");

      const payload = await request.json();
      const { userId, age = "25", height = "170cm", weight = "70kg", injuries = "None", 
              frequency = "3", goal = "General fitness", level = "Beginner", restrictions = "None" } = payload;

      if (!userId) throw new Error("userId is required");

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Generate workout plan using user data
      const workoutPrompt = `Create a personalized workout plan JSON for a ${age} year old, ${height} tall, ${weight} person with ${level} fitness level and ${injuries} injuries. Goal: ${goal}. Frequency: ${frequency} days per week. Format:
{"schedule": ["Monday", "Tuesday", "Wednesday"], "exercises": [{"day": "Monday", "routines": [{"name": "Push-ups", "sets": 3, "reps": 12}]}]}`;
      
      const workoutResult = await model.generateContent(workoutPrompt);
      const workoutPlan = JSON.parse(workoutResult.response.text().replace(/```json|```/g, '').trim());

      // Generate diet plan using user data
      const dietPrompt = `Create a personalized diet plan JSON for a ${age} year old, ${height} tall, ${weight} person with ${level} fitness level. Goal: ${goal}. Dietary restrictions: ${restrictions}. Format:
{"dailyCalories": 2200, "meals": [{"name": "Breakfast", "foods": ["Oatmeal", "Coffee"]}]}`;
      
      const dietResult = await model.generateContent(dietPrompt);
      const dietPlan = JSON.parse(dietResult.response.text().replace(/```json|```/g, '').trim());

      // Save to database
      await ctx.runMutation(api.plans.createPlan, {
        userId,
        dietPlan,
        workoutPlan,
        isActive: true,
        name: `${goal} Plan`,
      });

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
      });
    } catch (error) {
      console.error("Error:", error);
      return new Response(JSON.stringify({ success: false, error: String(error) }), {
        status: 500,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }
  }),
});

// CORS preflight
http.route({
  path: "/api/generate-fitness-plan",
  method: "OPTIONS",
  handler: httpAction(async () => {
    return new Response(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }),
});

export default http;