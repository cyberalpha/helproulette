import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const LoadingSpinner = ({ size = "md", className }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-3"
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-solid border-primary/30 border-t-primary",
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Cargando..."
    >
      <span className="sr-only">Cargando...</span>
    </div>
  );
};