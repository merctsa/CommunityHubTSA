import { Link } from "wouter";
import { ArrowRight, Heart, Users, Target, Lightbulb, Mail, Phone, MapPin } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FAQSection } from "@/components/faq-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const values = [
  {
    icon: Heart,
    title: "Community First",
    description: "We believe in the power of community connections to transform lives and build stronger neighborhoods. Every resource we feature has been carefully reviewed to ensure it serves our residents well.",
  },
  {
    icon: Users,
    title: "Accessibility",
    description: "Making information about local resources easily accessible to everyone who needs them, regardless of their background or circumstances.",
  },
  {
    icon: Target,
    title: "Accuracy",
    description: "Committed to providing up-to-date, verified information about community resources. We regularly review and update our listings.",
  },
  {
    icon: Lightbulb,
    title: "Empowerment",
    description: "Helping residents discover opportunities and support services to improve their quality of life and achieve their goals.",
  },
];

const team = [
  {
    role: "Community Coordinator",
    description: "Works directly with local organizations to keep our directory current and comprehensive.",
  },
  {
    role: "Outreach Specialist",
    description: "Connects with residents to understand their needs and gather feedback on our services.",
  },
  {
    role: "Content Manager",
    description: "Ensures all resource information is accurate, clear, and helpful for our users.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-accent/10 to-secondary/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6" data-testid="text-about-page-title">
                About Our Community Hub
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                The Community Resource Hub was created to serve as a central point of connection 
                between residents and the many valuable organizations, programs, and services 
                available in our community.
              </p>
              <Link href="/resources" data-testid="link-about-explore">
                <Button size="lg" data-testid="button-explore-resources">
                  Explore Resources
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                We understand that finding the right support can sometimes feel overwhelming. 
                That's why we've built this comprehensive directory — to make it easier for 
                everyone to discover and access the help they need, when they need it.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <Card key={value.title} className="border-primary/10">
                  <CardContent className="pt-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 mb-4">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20 bg-card">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">How We Help</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Whether you're looking for food assistance, educational programs, health services, 
                    or simply want to get involved with local events, our hub is here to guide you 
                    to the resources that can make a difference in your life.
                  </p>
                  <p>
                    We work closely with local organizations to ensure our information is accurate 
                    and up-to-date. Our team regularly reviews and updates listings to provide 
                    you with the most current information available.
                  </p>
                  <p>
                    We also welcome contributions from the community. If you know of a resource 
                    that should be included in our directory, please submit it through our form, 
                    and our team will review it for inclusion.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {team.map((member) => (
                  <Card key={member.role}>
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-2">{member.role}</h3>
                      <p className="text-sm text-muted-foreground">{member.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Get in Touch</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Have questions or feedback? We'd love to hear from you.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-medium mb-1">Email</h3>
                  <p className="text-sm text-muted-foreground">contact@communityhub.org</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-medium mb-1">Phone</h3>
                  <p className="text-sm text-muted-foreground">(555) 123-4567</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-medium mb-1">Location</h3>
                  <p className="text-sm text-muted-foreground">123 Main Street<br />Your City, ST 12345</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
