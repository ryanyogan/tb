import { LucideMessageSquareWarning } from "lucide-react";
import { cloneElement } from "react";

type PlaceholderProps = {
  label: string;
  icon?: React.ReactElement<React.SVGProps<SVGSVGElement>, "svg">;
  button?: React.ReactElement<React.SVGProps<SVGSVGElement>, "svg">;
};

export function Placeholder({
  label,
  icon = <LucideMessageSquareWarning />,
  button = <div />,
}: PlaceholderProps) {
  return (
    <div className="flex-1 self-center flex flex-col items-center justify-center gap-y-2">
      {cloneElement(icon, {
        className: "size-16",
      })}

      <h2 className="text-lg text-center">{label}</h2>

      {cloneElement(button, {
        className: "h-10",
      })}
    </div>
  );
}
