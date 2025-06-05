import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

export function Callout({
  title,
  children,
  icon,
  className,
  ...props
}: React.ComponentProps<typeof Alert> & { icon?: React.ReactNode }) {
  return (
    <Alert
      className={cn(
        "mt-6 w-auto border-none bg-surface text-surface-foreground md:-mx-4",
        className,
      )}
      {...props}
    >
      {icon}
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription className="text-card-foreground/80">
        {children}
      </AlertDescription>
    </Alert>
  );
}
