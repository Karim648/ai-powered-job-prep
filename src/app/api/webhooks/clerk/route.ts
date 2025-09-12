import { deleteUser, upsertUser } from "@/features/users/db";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const event = await verifyWebhook(req);

    if (event.type === "user.created" || event.type === "user.updated") {
      const clerkData = event.data;
      const email = event.data.email_addresses.find(
        (e) => e.id === clerkData.primary_email_address_id,
      )?.email_address;

      if (email == null) {
        return new Response("No primary email found", { status: 400 });
      }

      await upsertUser({
        id: clerkData.id,
        name: `${clerkData.first_name} ${clerkData.last_name}`,
        email,
        imageUrl: clerkData.image_url,
        createdAt: new Date(clerkData.created_at),
        updatedAt: new Date(clerkData.updated_at),
      });
    }

    if (event.type === "user.deleted") {
      if (event.data.id == null) {
        return new Response("No user ID found", { status: 400 });
      }
      await deleteUser(event.data.id);
    }
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
  return new Response("Webhook received", { status: 200 });
}
