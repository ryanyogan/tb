import { Suspense } from "react";
import { Await, data, isRouteErrorResponse } from "react-router";
import { Heading } from "~/components/heading";
import { Placeholder } from "~/components/placeholder";
import { Spinner } from "~/components/spinner";
import { TicketList } from "~/features/ticket/components/ticket-list";
import { getTickets } from "~/features/ticket/queries/get-tickets";
import type { Route } from "./+types/tickets-page";

export async function loader({ context }: Route.LoaderArgs) {
  const tickets = getTickets(context);
  return data({ tickets });
}

export default function TicketsPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" description="All your tickets at one place" />

      <Suspense fallback={<Spinner />}>
        <Await resolve={loaderData.tickets}>
          {(tickets) => <TicketList tickets={tickets} />}
        </Await>
      </Suspense>
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error)) {
    return (
      <>
        <Placeholder label="Something went wrong" />
      </>
    );
  } else if (error instanceof Error) {
    return (
      <>
        <Placeholder label="Something went wrong" />
      </>
    );
  } else {
    <>
      <Placeholder label="Unknown Error" />
    </>;
  }
}
