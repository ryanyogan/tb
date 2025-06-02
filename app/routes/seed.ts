import { ticket } from "~/database/schema";
import type { Route } from "./+types/seed";

const tickets = [
  {
    title: "First Ticket",
    content: "This is the content of the first ticket.",
    status: "DONE" as const,
  },
  {
    title: "Second Ticket",
    content: "This is the content of the second ticket.",
    status: "OPEN" as const,
  },
  {
    title: "Third Ticket",
    content: "This is the content of the third ticket.",
    status: "IN_PROGRESS" as const,
  },
];

export async function loader({ context }: Route.LoaderArgs) {
  await context.db.delete(ticket).run();

  for (const t of tickets) {
    await context.db
      .insert(ticket)
      .values({
        title: t.title,
        content: t.content,
        status: t.status,
      })
      .execute();
  }
}
