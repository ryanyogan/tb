import { href } from "react-router";

export const homePath = () => href("/");
export const ticketsPath = () => href("/tickets");
export const ticketPath = (ticketId: string) =>
  href("/tickets/:ticketId", { ticketId });
export const ticketEditPath = (ticketId: string) =>
  href("/tickets/:ticketId/edit", { ticketId });
