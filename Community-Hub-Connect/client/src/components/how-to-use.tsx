import { Search, Filter, Phone, Send } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "1",
    title: "Search or Browse",
    description: "Use our search bar to find specific resources, or browse through categories to explore what's available.",
  },
  {
    icon: Filter,
    step: "2",
    title: "Filter Results",
    description: "Narrow down your options using filters for category, service type, or location to find exactly what you need.",
  },
  {
    icon: Phone,
    step: "3",
    title: "Connect",
    description: "Use the contact information provided to reach out directly to the organization or service.",
  },
  {
    icon: Send,
    step: "4",
    title: "Share & Contribute",
    description: "Know of a resource we're missing? Submit it to help expand our community directory.",
  },
];

export function HowToUse() {
  return (
    <section className="py-16 lg:py-20 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-howtouse-title">
            How to Use This Hub
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Finding community resources has never been easier. Follow these simple steps to get started.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item) => (
            <div key={item.step} className="text-center">
              <div className="relative mx-auto w-16 h-16 mb-6">
                <div className="absolute inset-0 rounded-full bg-primary/10" />
                <div className="absolute inset-2 rounded-full bg-primary flex items-center justify-center">
                  <item.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-sm font-bold">
                  {item.step}
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
