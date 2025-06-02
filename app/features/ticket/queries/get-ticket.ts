import { cache } from "react";
import type { AppLoadContext } from "react-router";
import type { Ticket } from "~/database/schema";

export const getTicket = cache(
  async (
    context: AppLoadContext,
    ticketId: string
  ): Promise<Ticket | undefined> => {
    return await context.db.query.ticket.findFirst({
      where: (ticket, { eq }) => eq(ticket.id, ticketId),
    });
  }
);
