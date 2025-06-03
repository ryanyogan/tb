import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  ...prefix("tickets", [
    index("routes/tickets/tickets-page.tsx"),
    route(":ticketId", "routes/tickets/ticket-page.tsx"),
    route(":ticketId/edit", "routes/tickets/ticket-edit-page.tsx"),
  ]),
  route("seed", "routes/seed.ts"),
] satisfies RouteConfig;
