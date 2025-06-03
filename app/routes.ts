import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/home.tsx"),
    ...prefix("tickets", [
      index("routes/tickets/tickets-page.tsx"),
      route(":ticketId", "routes/tickets/ticket-page.tsx"),
    ]),
  ]),
  route("seed", "routes/seed.ts"),
] satisfies RouteConfig;
