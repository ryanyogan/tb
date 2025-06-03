import { eq } from "drizzle-orm";
import { redirect, type AppLoadContext } from "react-router";
import { ticket } from "~/database/schema";
import { ticketsPath } from "~/pathts";

export const ticketActionHandlers = {
  async deleteTicket(context: AppLoadContext, formData: FormData) {
    const ticketId = formData.get("ticketId") as string;
    await context.db.delete(ticket).where(eq(ticket.id, ticketId)).run();

    return redirect(ticketsPath());
  },

  async createTicket(context: AppLoadContext, formData: FormData) {
    const data = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
    };

    await context.db.insert(ticket).values(data).run();

    return { message: "Ticket created successfully" };
  },

  async upsertTicket(context: AppLoadContext, formData: FormData) {
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

    // redirect(ticketsPath());
    return { message: "Ticket updated successfully" };
  },
};
