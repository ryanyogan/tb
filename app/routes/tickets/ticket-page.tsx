import { data, Link } from "react-router";
import { Placeholder } from "~/components/placeholder";
import { Button } from "~/components/ui/button";
import { initialTickets } from "~/data";
import { ticketsPath } from "~/pathts";
import type { Route } from "./+types/ticket-page";

export function loader({ params }: Route.LoaderArgs) {
  const { ticketId } = params;

  const ticket = initialTickets.find((t) => t.id === ticketId);

  return data({ ticket });
}

export default function TicketPage({ loaderData }: Route.ComponentProps) {
  if (!loaderData.ticket) {
    return (
      <Placeholder
        label="Ticket not found"
        button={
          <Button asChild variant="outline">
            <Link to={ticketsPath()}>Go to Tickets</Link>
          </Button>
        }
      />
    );
  }

  return (
    <div>
      <h2>{loaderData?.ticket.title}</h2>
    </div>
  );
}
