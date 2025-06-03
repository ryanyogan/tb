import { redirect } from "react-router";
import { CardCompact } from "~/components/card-compact";
import { Placeholder } from "~/components/placeholder";
import { upsertTicket } from "~/features/ticket/actions/upsert-ticket";
import { TicketUpsertForm } from "~/features/ticket/components/ticket-upsert-form";
import { getTicket } from "~/features/ticket/queries/get-ticket";
import { ticketsPath } from "~/pathts";
import type { Route } from "./+types/ticket-edit-page";

export async function loader({ params, context }: Route.LoaderArgs) {
  const { ticketId } = params;
  if (!ticketId) {
    return { ticket: null };
  }

  const ticket = await getTicket(context, ticketId);

  return { ticket };
}

export async function action({ context, request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent") as string;

  const response = await upsertTicket(context, formData);
  if (!response.message) {
    return { error: "Failed to update ticket" };
  }

  return redirect(ticketsPath());
}

export default function TicketEditPage({ loaderData }: Route.ComponentProps) {
  if (!loaderData.ticket) {
    return <Placeholder label="Ticket not found" />;
  }

  return (
    <div>
      <CardCompact
        title="Edit Ticket"
        description="Update the details of your ticket"
        className="w-full max-w-[420px] animate-fade-from-top"
        content={<TicketUpsertForm ticket={loaderData.ticket} />}
      />
    </div>
  );
}
