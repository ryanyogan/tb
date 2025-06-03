import type { AppLoadContext } from "react-router";
import { ticket } from "~/database/schema";

export async function upsertTicket(
  context: AppLoadContext,
  formData: FormData
) {
  const ticketId = formData.get("ticketId") as string;
  const data = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  };

  await context.db
    .insert(ticket)
    .values({
      ...data,
      id: ticketId ? ticketId : undefined, // If ticketId exists, it will be used for upsert
    })
    .onConflictDoUpdate({
      target: ticket.id,
      set: data,
    });

  return { message: "Ticket updated successfully" };
}
