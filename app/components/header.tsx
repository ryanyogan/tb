import { LucideKanban } from "lucide-react";
import { Link } from "react-router";
import { homePath, ticketsPath } from "~/pathts";
import { ThemeSwitcher } from "./theme/theme-switcher";
import { buttonVariants } from "./ui/button";

export function Header() {
  return (
    <nav className="supports-backdrop-blur:bg-background/60 fixed left-0 top-0 right-0 z-20 border-b bg-background/95 backdrop-blur w-full flex py-2.5 px-5 justify-between">
      <div className="flex items-center gap-x-2">
        <Link to={homePath()} className={buttonVariants({ variant: "ghost" })}>
          <LucideKanban />
          <h1 className="text-lg font-semibold">TicketBounty</h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-2">
        <ThemeSwitcher />
        <Link
          to={ticketsPath()}
          className={buttonVariants({ variant: "default" })}
        >
          Tickets
        </Link>
      </div>
    </nav>
  );
}
