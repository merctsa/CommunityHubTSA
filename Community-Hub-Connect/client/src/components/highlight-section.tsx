import { Link } from "wouter";
import { ArrowRight, Star, Users, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Resource } from "@shared/schema";

interface HighlightSectionProps {
  resources: Resource[];
  isLoading?: boolean;
}

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

const highlightIcons = [Star, Heart, Users];

function SkeletonCard() {
  return (
    <Card className="animate-pulse">
      <CardHeader>
        <div className="h-5 w-24 bg-muted rounded" />
        <div className="h-6 w-3/4 bg-muted rounded mt-2" />
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="h-4 w-full bg-muted rounded" />
        <div className="h-4 w-5/6 bg-muted rounded" />
        <div className="h-4 w-4/6 bg-muted rounded" />
        <div className="flex gap-2 mt-4">
          <div className="h-6 w-16 bg-muted rounded" />
          <div className="h-6 w-20 bg-muted rounded" />
        </div>
      </CardContent>
    </Card>
  );
}

export function HighlightSection({ resources, isLoading }: HighlightSectionProps) {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            <span>Featured Resources</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-highlight-title">
            Community Spotlights
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover organizations making a significant impact in our community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {isLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            resources.slice(0, 3).map((resource, index) => {
              const Icon = highlightIcons[index % highlightIcons.length];
              const categoryColor = categoryColors[resource.category] || "bg-muted text-muted-foreground";
              
              return (
                <Card 
                  key={resource.id}
                  className="group relative overflow-visible border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
                  data-testid={`card-highlight-${resource.id}`}
                >
                  <div className="absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                    <Icon className="h-5 w-5" />
                  </div>
                  
                  <CardHeader className="pb-3">
                    <Badge 
                      variant="secondary" 
                      className={`${categoryColor} w-fit text-xs font-medium no-default-hover-elevate no-default-active-elevate`}
                    >
                      {resource.category}
                    </Badge>
                    <h3 className="font-bold text-xl mt-2" data-testid={`text-highlight-name-${resource.id}`}>
                      {resource.name}
                    </h3>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed line-clamp-4" data-testid={`text-highlight-description-${resource.id}`}>
                      {resource.description}
                    </p>

                    {resource.impactStatement && (
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
                        <Star className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-sm font-medium text-primary" data-testid={`text-highlight-impact-${resource.id}`}>
                          {resource.impactStatement}
                        </p>
                      </div>
                    )}

                    {resource.services.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {resource.services.slice(0, 4).map((service) => (
                          <Badge 
                            key={service} 
                            variant="outline" 
                            className="text-xs font-normal no-default-hover-elevate no-default-active-elevate"
                          >
                            {service}
                          </Badge>
                        ))}
                        {resource.services.length > 4 && (
                          <Badge variant="outline" className="text-xs font-normal no-default-hover-elevate no-default-active-elevate">
                            +{resource.services.length - 4}
                          </Badge>
                        )}
                      </div>
                    )}

                    <div className="pt-2 flex flex-wrap gap-2">
                      {resource.website && (
                        <a
                          href={resource.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1"
                          data-testid={`link-highlight-website-${resource.id}`}
                        >
                          <Button className="w-full" data-testid={`button-highlight-visit-${resource.id}`}>
                            Visit Resource
                          </Button>
                        </a>
                      )}
                      <Link href="/resources" className="flex-1" data-testid={`link-highlight-directory-${resource.id}`}>
                        <Button variant="outline" className="w-full" data-testid={`button-highlight-directory-${resource.id}`}>
                          View in Directory
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        <div className="text-center mt-10">
          <Link href="/resources" data-testid="link-view-all-resources">
            <Button variant="outline" size="lg" data-testid="button-view-all-resources">
              View All Resources
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
