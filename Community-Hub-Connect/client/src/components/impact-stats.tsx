import { Building2, Users, FolderHeart, RefreshCw } from "lucide-react";

interface ImpactStatsProps {
  totalResources: number;
  totalCategories: number;
}

export function ImpactStats({ totalResources, totalCategories }: ImpactStatsProps) {
  const stats = [
    {
      icon: Building2,
      value: `${totalResources}+`,
      label: "Community Resources",
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
    },
    {
      icon: FolderHeart,
      value: totalCategories.toString(),
      label: "Categories",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      icon: Users,
      value: "2,500+",
      label: "Residents Helped",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      icon: RefreshCw,
      value: "Weekly",
      label: "Updates",
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-100 dark:bg-amber-900/30",
    },
  ];

  return (
    <section className="py-12 lg:py-16 border-y bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className={`mx-auto w-12 h-12 rounded-full ${stat.bgColor} flex items-center justify-center mb-3`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="text-3xl sm:text-4xl font-bold mb-1" data-testid={`text-stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}>
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
