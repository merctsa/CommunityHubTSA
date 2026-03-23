import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I find resources in my area?",
    answer: "Use our search bar to search for specific resources, or browse by category. You can filter results by service type and location to find the most relevant options near you.",
  },
  {
    question: "How often is the directory updated?",
    answer: "We update our directory weekly to ensure all information is current and accurate. Organizations can also submit updates directly through our contact form.",
  },
  {
    question: "How can I add a new resource to the hub?",
    answer: "Click the 'Submit Resource' button in the navigation or visit our submission page. Fill out the form with the organization's details, and our team will review it for inclusion.",
  },
  {
    question: "Is this service free to use?",
    answer: "Yes! The Community Resource Hub is completely free for all residents. Our goal is to connect community members with the resources they need without any barriers.",
  },
  {
    question: "How do I report incorrect information?",
    answer: "If you notice any outdated or incorrect information, please contact us through our contact form or email. We appreciate your help in keeping our directory accurate.",
  },
  {
    question: "Can organizations update their own listings?",
    answer: "Yes, organizations can submit updates to their listings by contacting us directly. We'll verify the changes and update the information promptly.",
  },
];

export function FAQSection() {
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <HelpCircle className="h-4 w-4" />
            <span>Have Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-faq-title">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our Community Resource Hub
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger 
                className="text-left text-base font-medium"
                data-testid={`button-faq-${index}`}
              >
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
