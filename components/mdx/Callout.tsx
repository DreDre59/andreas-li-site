import { Info, AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";

type CalloutType = "info" | "warning" | "success" | "error";

interface Props {
  type?: CalloutType;
  children: React.ReactNode;
}

const styles: Record<CalloutType, { icon: React.ElementType; classes: string }> = {
  info: {
    icon: Info,
    classes: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200",
  },
  warning: {
    icon: AlertTriangle,
    classes: "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200",
  },
  success: {
    icon: CheckCircle,
    classes: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200",
  },
  error: {
    icon: AlertCircle,
    classes: "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200",
  },
};

export default function Callout({ type = "info", children }: Props) {
  const { icon: Icon, classes } = styles[type];
  return (
    <div className={`flex gap-3 p-4 rounded-lg border my-6 text-sm ${classes}`}>
      <Icon size={16} className="flex-shrink-0 mt-0.5" />
      <div className="leading-relaxed">{children}</div>
    </div>
  );
}
