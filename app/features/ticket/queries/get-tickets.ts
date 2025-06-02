import type { AppLoadContext } from "react-router";
import type { Ticket } from "../types";

export async function getTickets(context: AppLoadContext): Promise<Ticket[]> {
  return await context.db.query.ticket.findMany();
}
