import { useState, useMemo } from "react";
import { Search, Filter, X, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResourceCard } from "@/components/resource-card";
import { Skeleton } from "@/components/ui/skeleton";
import { RESOURCE_CATEGORIES, SERVICE_TYPES, type Resource, type ResourceCategory, type ServiceType } from "@shared/schema";

interface ResourceDirectoryProps {
  resources: Resource[];
  isLoading?: boolean;
  initialSearch?: string;
}

function FilterSection({ 
  title, 
  children, 
  defaultOpen = true 
}: { 
  title: string; 
  children: React.ReactNode; 
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium hover:text-primary transition-colors">
        {title}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-2 pb-4">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}

function FilterContent({
  selectedCategories,
  setSelectedCategories,
  selectedServices,
  setSelectedServices,
}: {
  selectedCategories: ResourceCategory[];
  setSelectedCategories: (categories: ResourceCategory[]) => void;
  selectedServices: ServiceType[];
  setSelectedServices: (services: ServiceType[]) => void;
}) {
  const toggleCategory = (category: ResourceCategory) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const toggleService = (service: ServiceType) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter(s => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  return (
    <div className="space-y-2">
      <FilterSection title="Categories">
        <div className="space-y-2">
          {RESOURCE_CATEGORIES.map((category) => (
            <div key={category} className="flex items-center gap-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
                data-testid={`checkbox-category-${category.toLowerCase().replace(/\s+/g, "-")}`}
              />
              <Label
                htmlFor={`category-${category}`}
                className="text-sm cursor-pointer flex-1"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Service Types" defaultOpen={false}>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {SERVICE_TYPES.map((service) => (
            <div key={service} className="flex items-center gap-2">
              <Checkbox
                id={`service-${service}`}
                checked={selectedServices.includes(service)}
                onCheckedChange={() => toggleService(service)}
                data-testid={`checkbox-service-${service.toLowerCase().replace(/\s+/g, "-")}`}
              />
              <Label
                htmlFor={`service-${service}`}
                className="text-sm cursor-pointer flex-1"
              >
                {service}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>
    </div>
  );
}

function ResourceSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-6 w-3/4 mt-2" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
        </div>
        <Skeleton className="h-10 w-full mt-4" />
      </CardContent>
    </Card>
  );
}

export function ResourceDirectory({ resources, isLoading, initialSearch = "" }: ResourceDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategories, setSelectedCategories] = useState<ResourceCategory[]>([]);
  const [selectedServices, setSelectedServices] = useState<ServiceType[]>([]);
  const [sortBy, setSortBy] = useState<string>("name");

  const filteredResources = useMemo(() => {
    let filtered = [...resources];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (resource) =>
          resource.name.toLowerCase().includes(query) ||
          resource.description.toLowerCase().includes(query) ||
          resource.services.some((s) => s.toLowerCase().includes(query))
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((resource) =>
        selectedCategories.includes(resource.category)
      );
    }

    if (selectedServices.length > 0) {
      filtered = filtered.filter((resource) =>
        resource.services.some((s) => selectedServices.includes(s))
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "category":
          return a.category.localeCompare(b.category);
        case "featured":
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [resources, searchQuery, selectedCategories, selectedServices, sortBy]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedServices([]);
  };

  const hasActiveFilters = searchQuery || selectedCategories.length > 0 || selectedServices.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2" data-testid="text-directory-title">
            Resource Directory
          </h1>
          <p className="text-lg text-muted-foreground">
            Browse and filter community resources to find the help you need
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <Card className="sticky top-24">
              <CardHeader className="pb-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FilterContent
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories}
                  selectedServices={selectedServices}
                  setSelectedServices={setSelectedServices}
                />
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="w-full mt-4"
                    data-testid="button-clear-filters-desktop"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear All Filters
                  </Button>
                )}
              </CardContent>
            </Card>
          </aside>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-directory-search"
                />
              </div>

              <div className="flex gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[140px]" data-testid="select-sort">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="category">Category</SelectItem>
                    <SelectItem value="featured">Featured</SelectItem>
                  </SelectContent>
                </Select>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden" data-testid="button-mobile-filters">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                      {hasActiveFilters && (
                        <Badge variant="secondary" className="ml-2 no-default-hover-elevate no-default-active-elevate">
                          {selectedCategories.length + selectedServices.length}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle className="flex items-center gap-2">
                        <Filter className="h-5 w-5" />
                        Filters
                      </SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                        selectedServices={selectedServices}
                        setSelectedServices={setSelectedServices}
                      />
                      {hasActiveFilters && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearFilters}
                          className="w-full mt-4"
                          data-testid="button-clear-filters-mobile"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Clear All Filters
                        </Button>
                      )}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {searchQuery && (
                  <Badge variant="secondary" className="gap-1">
                    Search: {searchQuery}
                    <button onClick={() => setSearchQuery("")} className="ml-1 hover:text-foreground">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {selectedCategories.map((category) => (
                  <Badge key={category} variant="secondary" className="gap-1">
                    {category}
                    <button
                      onClick={() => setSelectedCategories(selectedCategories.filter((c) => c !== category))}
                      className="ml-1 hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {selectedServices.map((service) => (
                  <Badge key={service} variant="secondary" className="gap-1">
                    {service}
                    <button
                      onClick={() => setSelectedServices(selectedServices.filter((s) => s !== service))}
                      className="ml-1 hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            <div className="mb-4 text-sm text-muted-foreground" data-testid="text-results-count">
              {isLoading ? (
                "Loading resources..."
              ) : (
                `Showing ${filteredResources.length} of ${resources.length} resources`
              )}
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResourceSkeleton />
                <ResourceSkeleton />
                <ResourceSkeleton />
                <ResourceSkeleton />
              </div>
            ) : filteredResources.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">No resources found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search or filters to find what you're looking for
                    </p>
                  </div>
                  {hasActiveFilters && (
                    <Button variant="outline" onClick={clearFilters} data-testid="button-clear-filters-empty">
                      <X className="h-4 w-4 mr-2" />
                      Clear All Filters
                    </Button>
                  )}
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
