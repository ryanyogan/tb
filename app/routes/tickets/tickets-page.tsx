import { LucideCheckCircle, LucideFileText, LucidePencil } from "lucide-react";
import { Link } from "react-router";
import { Heading } from "~/components/heading";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { initialTickets } from "~/data";
import { ticketPath } from "~/pathts";

const TICKET_ICONS = {
  OPEN: <LucideFileText />,
  IN_PROGRESS: <LucidePencil />,
  DONE: <LucideCheckCircle />,
};

export default function TicketsPage() {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" description="All your tickets at one place" />

      <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
        {initialTickets.map((ticket) => (
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
        ))}
      </div>
    </div>
  );
}
