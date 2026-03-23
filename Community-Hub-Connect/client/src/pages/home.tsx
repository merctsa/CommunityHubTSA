import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { HighlightSection } from "@/components/highlight-section";
import { AboutSection } from "@/components/about-section";
import { HowToUse } from "@/components/how-to-use";
import { ImpactStats } from "@/components/impact-stats";
import { FAQSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";
import { RESOURCE_CATEGORIES, type Resource } from "@shared/schema";

export default function Home() {
  const { data: resources = [], isLoading } = useQuery<Resource[]>({
    queryKey: ["/api/resources"],
  });

  const featuredResources = resources.filter((r) => r.isFeatured);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <ImpactStats 
          totalResources={resources.length} 
          totalCategories={RESOURCE_CATEGORIES.length} 
        />
        <HighlightSection resources={featuredResources} isLoading={isLoading} />
        <HowToUse />
        <AboutSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
