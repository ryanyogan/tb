import type { AppLoadContext } from "react-router";
import type { Ticket } from "~/database/schema";

export async function getTickets(context: AppLoadContext): Promise<Ticket[]> {
  return await context.db.query.ticket.findMany({
    orderBy: (ticket, { desc }) => [desc(ticket.createdAt)],
  });
}
