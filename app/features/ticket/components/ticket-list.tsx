import type { Ticket } from "~/database/schema";
import { TicketItem } from "./ticket-item";

export function TicketList({ tickets }: { tickets: Ticket[] }) {
  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
}
