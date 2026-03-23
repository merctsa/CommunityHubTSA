import { Heart, Users, Target, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const values = [
  {
    icon: Heart,
    title: "Community First",
    description: "We believe in the power of community connections to transform lives and build stronger neighborhoods.",
  },
  {
    icon: Users,
    title: "Accessibility",
    description: "Making information about local resources easily accessible to everyone who needs them.",
  },
  {
    icon: Target,
    title: "Accuracy",
    description: "Committed to providing up-to-date, verified information about community resources.",
  },
  {
    icon: Lightbulb,
    title: "Empowerment",
    description: "Helping residents discover opportunities and support services to improve their quality of life.",
  },
];

export function AboutSection() {
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6" data-testid="text-about-title">
              About Our Community Hub
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                The Community Resource Hub was created to serve as a central point of connection 
                between residents and the many valuable organizations, programs, and services 
                available in our community.
              </p>
              <p>
                We understand that finding the right support can sometimes feel overwhelming. 
                That's why we've built this comprehensive directory — to make it easier for 
                everyone to discover and access the help they need, when they need it.
              </p>
              <p>
                Whether you're looking for food assistance, educational programs, health services, 
                or simply want to get involved with local events, our hub is here to guide you 
                to the resources that can make a difference in your life.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {values.map((value) => (
              <Card key={value.title} className="border-primary/10">
                <CardContent className="pt-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 mb-4">
                    <value.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
