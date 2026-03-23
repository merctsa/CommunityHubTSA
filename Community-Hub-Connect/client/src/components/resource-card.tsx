import { Phone, Mail, Globe, MapPin, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Resource } from "@shared/schema";

const categoryIcons: Record<string, string> = {
  "Non-Profits": "heart",
  "Support Services": "handshake",
  "Community Events": "calendar",
  "Health Services": "activity",
  "Education": "graduation-cap",
  "Food & Housing": "home",
  "Youth Programs": "users",
  "Senior Services": "heart-pulse",
};

const categoryColors: Record<string, string> = {
  "Non-Profits": "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
  "Support Services": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  "Community Events": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  "Health Services": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  "Education": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  "Food & Housing": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  "Youth Programs": "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
  "Senior Services": "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
};

interface ResourceCardProps {
  resource: Resource;
  featured?: boolean;
}

export function ResourceCard({ resource, featured = false }: ResourceCardProps) {
  const categoryColor = categoryColors[resource.category] || "bg-muted text-muted-foreground";

  return (
    <Card 
      className={`group transition-all duration-200 hover:-translate-y-1 ${
        featured ? "border-primary/20" : ""
      }`}
      data-testid={`card-resource-${resource.id}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge 
                variant="secondary" 
                className={`${categoryColor} text-xs font-medium no-default-hover-elevate no-default-active-elevate`}
              >
                {resource.category}
              </Badge>
              {resource.isFeatured && (
                <Badge variant="default" className="text-xs">Featured</Badge>
              )}
            </div>
            <h3 className="font-semibold text-lg leading-tight line-clamp-2" data-testid={`text-resource-name-${resource.id}`}>
              {resource.name}
            </h3>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className={`text-sm text-muted-foreground leading-relaxed ${featured ? "line-clamp-4" : "line-clamp-3"}`} data-testid={`text-resource-description-${resource.id}`}>
          {resource.description}
        </p>

        {resource.impactStatement && featured && (
          <p className="text-sm font-medium text-primary italic">
            {resource.impactStatement}
          </p>
        )}

        {resource.services.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {resource.services.slice(0, featured ? 5 : 3).map((service) => (
              <Badge 
                key={service} 
                variant="outline" 
                className="text-xs font-normal no-default-hover-elevate no-default-active-elevate"
              >
                {service}
              </Badge>
            ))}
            {resource.services.length > (featured ? 5 : 3) && (
              <Badge variant="outline" className="text-xs font-normal no-default-hover-elevate no-default-active-elevate">
                +{resource.services.length - (featured ? 5 : 3)} more
              </Badge>
            )}
          </div>
        )}

        <div className="space-y-2 pt-2 border-t">
          {resource.phone && (
            <a 
              href={`tel:${resource.phone}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              data-testid={`link-resource-phone-${resource.id}`}
            >
              <Phone className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{resource.phone}</span>
            </a>
          )}
          {resource.email && (
            <a 
              href={`mailto:${resource.email}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              data-testid={`link-resource-email-${resource.id}`}
            >
              <Mail className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{resource.email}</span>
            </a>
          )}
          {resource.address && (
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <span className="line-clamp-2">{resource.address}</span>
            </div>
          )}
        </div>

        {resource.website && (
          <a
            href={resource.website}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={`link-resource-website-${resource.id}`}
          >
            <Button variant="outline" className="w-full" data-testid={`button-resource-website-${resource.id}`}>
              <Globe className="h-4 w-4 mr-2" />
              Visit Website
              <ExternalLink className="h-3 w-3 ml-auto" />
            </Button>
          </a>
        )}
      </CardContent>
    </Card>
  );
}
