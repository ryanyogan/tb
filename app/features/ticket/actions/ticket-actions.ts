import { eq } from "drizzle-orm";
import { redirect, type AppLoadContext } from "react-router";
import { ticket } from "~/database/schema";
import { ticketsPath } from "~/pathts";

export const ticketActionHandlers = {
  async deleteTicket(context: AppLoadContext, formData: FormData) {
    const ticketId = formData.get("ticketId") as string;
    await context.db.delete(ticket).where(eq(ticket.id, ticketId)).run();

    redirect(ticketsPath());
  },
};
