import { Link } from "wouter";
import { Search, ArrowRight, Users, Building2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeroProps {
  onSearch?: (query: string) => void;
}

export function Hero({ onSearch }: HeroProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("search") as string;
    if (onSearch && query) {
      onSearch(query);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/10 to-secondary/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--accent)/0.1),transparent_50%)]" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Users className="h-4 w-4" />
            <span>Connecting Our Community</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6" data-testid="text-hero-title">
            Find Resources That{" "}
            <span className="text-primary">Support You</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto" data-testid="text-hero-subtitle">
            Your central hub for discovering local non-profits, support services, community events, and programs available to residents in our community.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-10" data-testid="form-hero-search">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                name="search"
                type="search"
                placeholder="Search for resources, services, or organizations..."
                className="pl-10 h-12 text-base"
                data-testid="input-hero-search"
              />
            </div>
            <Link href="/resources" data-testid="link-explore-resources">
              <Button size="lg" className="h-12 px-6" data-testid="button-hero-explore">
                Explore Resources
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </form>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                <Building2 className="h-4 w-4 text-primary" />
              </div>
              <span data-testid="text-stat-organizations">50+ Organizations</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <span data-testid="text-stat-categories">8 Categories</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                <Calendar className="h-4 w-4 text-primary" />
              </div>
              <span data-testid="text-stat-updated">Updated Weekly</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
