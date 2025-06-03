import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

export function TicketCreateForm() {
  return (
    <form className="flex flex-col gap-y-2" method="post">
      <input type="hidden" name="intent" value="createTicket" />

      <Label htmlFor="title">Title</Label>
      <Input id="title" name="title" type="text" />

      <Label htmlFor="content">Content</Label>
      <Textarea id="content" name="content" />

      <Button type="submit">Create</Button>
    </form>
  );
}
