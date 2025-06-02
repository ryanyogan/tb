import { LucideArrowUpRightFromSquare, LucideTrash } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { Ticket } from "~/database/schema";
import { cn } from "~/lib/utils";
import { ticketPath } from "~/pathts";
import { TICKET_ICONS } from "../constants";

type TicketItemProps = {
  ticket: Ticket;
  isDetail?: boolean;
};

export function TicketItem({ ticket, isDetail }: TicketItemProps) {
  const detailButton = (
    <Button variant="outline" size="icon" asChild>
      <Link to={ticketPath(ticket.id)}>
        <LucideArrowUpRightFromSquare className="size-4" />
      </Link>
    </Button>
  );

  const deleteButton = (
    <form method="post">
      <input type="hidden" name="ticketId" value={ticket.id} />
      <Button
        name="intent"
        value="deleteTicket"
        variant="outline"
        type="submit"
        size="icon"
      >
        <LucideTrash className="size-4" />
      </Button>
    </form>
  );

  return (
    <div
      className={cn("w-full max-w-[420px] flex gap-x-1", {
        "max-w-[580px]": isDetail,
        "max-w-[420px]": !isDetail,
      })}
    >
      <Card key={ticket.id} className="w-full">
        <CardHeader>
          <CardTitle className="flex gap-x-2">
            <span>{TICKET_ICONS[ticket.status]}</span>
            <span className="truncate">{ticket.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span
            className={cn("whitespace-break-spaces", {
              "line-clamp-3": !isDetail,
            })}
          >
            {ticket.content}
          </span>
        </CardContent>
        <CardFooter>
          <Link to={ticketPath(ticket.id)} className="text-sm underline">
            View Ticket
          </Link>
        </CardFooter>
      </Card>

      <div className="flex flex-col gap-y-1">
        {isDetail ? deleteButton : detailButton}
      </div>
    </div>
  );
}
