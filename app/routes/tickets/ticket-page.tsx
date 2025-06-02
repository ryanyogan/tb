import { Suspense } from "react";
import { Await, data, Link } from "react-router";
import { Placeholder } from "~/components/placeholder";
import { Spinner } from "~/components/spinner";
import { Button } from "~/components/ui/button";
import { ticketActionHandlers } from "~/features/ticket/actions/ticket-actions";
import { TicketItem } from "~/features/ticket/components/ticket-item";
import { getTicket } from "~/features/ticket/queries/get-ticket";
import { ticketsPath } from "~/pathts";
import type { Route } from "./+types/ticket-page";

export async function loader({ params, context }: Route.LoaderArgs) {
  const { ticketId } = params;
  const ticket = getTicket(context, ticketId);

  return data({ ticket });
}

export async function action({ context, request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent") as string;

  const handler =
    ticketActionHandlers[intent as keyof typeof ticketActionHandlers];

  if (!handler) {
    throw new Response("Invalid Action", { status: 400 });
  }

  return handler(context, formData);
}

export default function TicketPage({ loaderData }: Route.ComponentProps) {
  return (
    <Suspense fallback={<Spinner />}>
      <Await resolve={loaderData.ticket}>
        {(ticket) => {
          if (!ticket) {
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
            <div className="flex justify-center animate-fade-from-top">
              <TicketItem ticket={ticket} isDetail />
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
}
