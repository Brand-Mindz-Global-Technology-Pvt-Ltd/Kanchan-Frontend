import type { ReactNode } from "react";

interface AdminStatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
  trendUp?: boolean;
  color?: string;
}

function AdminStatCard({
  title,
  value,
  icon,
  trend,
  trendUp = true,
  color = "#06452E",
}: AdminStatCardProps) {
  return (
    <div className="rounded-[22px] border border-[#E6EADF] bg-white p-6 shadow-[0_4px_20px_rgba(20,56,38,0.06)] hover:shadow-[0_6px_24px_rgba(20,56,38,0.08)] transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-[#7A8C80] mb-2">{title}</p>
          <p className="text-3xl font-bold text-[#06452E]">{value}</p>
          {trend && (
            <p
              className={`mt-3 text-sm font-medium ${
                trendUp ? "text-[#1A7D4E]" : "text-[#C53737]"
              }`}
            >
              {trend}
            </p>
          )}
        </div>
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full"
          style={{ backgroundColor: `${color}15` }}
        >
          <div className="text-xl" style={{ color }}>{icon}</div>
        </div>
      </div>
    </div>
  );
}

export default AdminStatCard;
