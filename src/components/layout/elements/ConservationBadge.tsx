import type { ConservationStatus } from "../../../types/Bird";

interface Props {
  status: ConservationStatus;
  size?: "sm" | "md";
}

const STATUS_META: Record<
  ConservationStatus,
  { label: string; short: string; color: string; ring: string }
> = {
  LC: {
    label: "Least Concern",
    short: "LC",
    color: "#10b981",
    ring: "rgba(16, 185, 129, 0.25)",
  },
  NT: {
    label: "Near Threatened",
    short: "NT",
    color: "#84cc16",
    ring: "rgba(132, 204, 22, 0.25)",
  },
  VU: {
    label: "Vulnerable",
    short: "VU",
    color: "#f59e0b",
    ring: "rgba(245, 158, 11, 0.25)",
  },
  EN: {
    label: "Endangered",
    short: "EN",
    color: "#f97316",
    ring: "rgba(249, 115, 22, 0.25)",
  },
  CR: {
    label: "Critically Endangered",
    short: "CR",
    color: "#ef4444",
    ring: "rgba(239, 68, 68, 0.25)",
  },
  EW: {
    label: "Extinct in Wild",
    short: "EW",
    color: "#a855f7",
    ring: "rgba(168, 85, 247, 0.25)",
  },
  EX: {
    label: "Extinct",
    short: "EX",
    color: "#6b7280",
    ring: "rgba(107, 114, 128, 0.25)",
  },
  DD: {
    label: "Data Deficient",
    short: "DD",
    color: "#9ca3af",
    ring: "rgba(156, 163, 175, 0.25)",
  },
  UNKNOWN: {
    label: "Unknown",
    short: "?",
    color: "#6b7280",
    ring: "rgba(107, 114, 128, 0.2)",
  },
};

export default function ConservationBadge({ status, size = "sm" }: Props) {
  const meta = STATUS_META[status];
  const padding = size === "sm" ? "px-2 py-0.5" : "px-3 py-1";
  const fontSize = size === "sm" ? "text-xs" : "text-sm";

  return (
    <span
      title={meta.label}
      className={`inline-flex items-center gap-1 rounded-full font-semibold ${padding} ${fontSize}`}
      style={{
        color: meta.color,
        backgroundColor: meta.ring,
        border: `1px solid ${meta.color}`,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: meta.color }}
      />
      {size === "sm" ? meta.short : meta.label}
    </span>
  );
}
