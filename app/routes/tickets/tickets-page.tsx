import { Suspense } from "react";
import { Await, data, isRouteErrorResponse } from "react-router";
import { Heading } from "~/components/heading";
import { Placeholder } from "~/components/placeholder";
import { Spinner } from "~/components/spinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { ticketActionHandlers } from "~/features/ticket/actions/ticket-actions";
import { TicketCreateForm } from "~/features/ticket/components/ticket-create-form";
import { TicketList } from "~/features/ticket/components/ticket-list";
import { getTickets } from "~/features/ticket/queries/get-tickets";
import type { Route } from "./+types/tickets-page";

export async function loader({ context }: Route.LoaderArgs) {
  const tickets = getTickets(context);
  return data({ tickets });
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

export default function TicketsPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" description="All your tickets at one place" />

      <Card className="w-full max-w-[420px] self-center">
        <CardHeader>
          <CardTitle>Create Ticket</CardTitle>
          <CardDescription>A new ticket will be created</CardDescription>
        </CardHeader>

        <CardContent>
          <TicketCreateForm />
        </CardContent>
      </Card>

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
