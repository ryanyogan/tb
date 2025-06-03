import { LucideLoaderCircle } from "lucide-react";
import { useActionData, useFetcher } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import type { Ticket } from "~/database/schema";

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

export function TicketUpsertForm({ ticket }: TicketUpsertFormProps) {
  const fetcher = useFetcher();
  const pending = fetcher.state === "submitting" || fetcher.state === "loading";
  const actionData = useActionData();

  return (
    <fetcher.Form className="flex flex-col gap-y-2" method="post">
      <input type="hidden" name="intent" value="upsertTicket" />
      <input type="hidden" name="ticketId" value={ticket?.id} />

      <Label htmlFor="title">Title</Label>
      <Input id="title" name="title" type="text" defaultValue={ticket?.title} />

      <Label htmlFor="content">Content</Label>
      <Textarea id="content" name="content" defaultValue={ticket?.content} />

      <Button disabled={pending} type="submit">
        {pending && <LucideLoaderCircle className="size-4 animate-spin" />}
        {ticket ? "Update" : "Create"}
      </Button>

      {fetcher.data}
    </fetcher.Form>
  );
}
