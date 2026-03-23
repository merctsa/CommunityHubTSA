import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { ResourceDirectory } from "@/components/resource-directory";
import { Footer } from "@/components/footer";
import type { Resource } from "@shared/schema";

export default function Resources() {
  const { data: resources = [], isLoading } = useQuery<Resource[]>({
    queryKey: ["/api/resources"],
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <ResourceDirectory resources={resources} isLoading={isLoading} />
      </main>
      <Footer />
    </div>
  );
}
