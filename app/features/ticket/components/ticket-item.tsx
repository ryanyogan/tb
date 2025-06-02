import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { ticketPath } from "~/pathts";
import { TICKET_ICONS } from "../constants";
import type { Ticket } from "../types";

type TicketItemProps = {
  ticket: Ticket;
};

export function TicketItem({ ticket }: TicketItemProps) {
  return (
    <Card key={ticket.id} className="w-full max-w-[420px]">
      <CardHeader>
        <CardTitle className="flex gap-x-2">
          <span>{TICKET_ICONS[ticket.status]}</span>
          <span className="truncate">{ticket.title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <span className="line-clamp-3 whitespace-break-spaces">
          {ticket.content}
        </span>
      </CardContent>
      <CardFooter>
        <Link to={ticketPath(ticket.id)} className="text-sm underline">
          View Ticket
        </Link>
      </CardFooter>
    </Card>
  );
}
