import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { RESOURCE_CATEGORIES, SERVICE_TYPES, insertSubmissionSchema, type InsertSubmission } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export function SubmissionForm() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<InsertSubmission>({
    resolver: zodResolver(insertSubmissionSchema),
    defaultValues: {
      organizationName: "",
      category: undefined,
      description: "",
      contactEmail: "",
      contactPhone: "",
      website: "",
      address: "",
      services: [],
      additionalNotes: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: InsertSubmission) => {
      const response = await apiRequest("POST", "/api/submissions", data);
      return response.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Submission Received!",
        description: "Thank you for contributing to our community resource hub.",
      });
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertSubmission) => {
    submitMutation.mutate(data);
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-8 pb-8">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2" data-testid="text-submission-success">
              Thank You!
            </h2>
            <p className="text-muted-foreground mb-6">
              Your resource submission has been received. Our team will review it and add it to the directory if approved.
            </p>
            <Button onClick={() => setSubmitted(false)} data-testid="button-submit-another">
              Submit Another Resource
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10 py-12">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2" data-testid="text-submit-title">
            Submit a Resource
          </h1>
          <p className="text-lg text-muted-foreground">
            Help us expand our directory by suggesting community resources
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Resource Information</CardTitle>
            <CardDescription>
              Please provide details about the organization or resource you'd like to add
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="organizationName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter organization name"
                          {...field}
                          data-testid="input-org-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-category">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {RESOURCE_CATEGORIES.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe what this organization does and how it helps the community"
                          className="min-h-[120px] resize-none"
                          {...field}
                          data-testid="input-description"
                        />
                      </FormControl>
                      <FormDescription>
                        Minimum 10 characters
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="services"
                  render={() => (
                    <FormItem>
                      <FormLabel>Services Provided *</FormLabel>
                      <FormDescription>
                        Select all that apply
                      </FormDescription>
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        {SERVICE_TYPES.map((service) => (
                          <FormField
                            key={service}
                            control={form.control}
                            name="services"
                            render={({ field }) => (
                              <FormItem className="flex items-center gap-2 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(service)}
                                    onCheckedChange={(checked) => {
                                      const updated = checked
                                        ? [...(field.value || []), service]
                                        : field.value?.filter((s) => s !== service) || [];
                                      field.onChange(updated);
                                    }}
                                    data-testid={`checkbox-service-${service.toLowerCase().replace(/\s+/g, "-")}`}
                                  />
                                </FormControl>
                                <Label className="text-sm font-normal cursor-pointer">
                                  {service}
                                </Label>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="border-t pt-6">
                  <h3 className="font-medium mb-4">Contact Information</h3>
                  <div className="grid gap-4">
                    <FormField
                      control={form.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="contact@organization.org"
                              {...field}
                              data-testid="input-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="(555) 123-4567"
                              {...field}
                              data-testid="input-phone"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <Input
                              type="url"
                              placeholder="https://www.organization.org"
                              {...field}
                              data-testid="input-website"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="123 Main St, City, State 12345"
                              {...field}
                              data-testid="input-address"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="additionalNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any other information you'd like to share about this resource"
                          className="min-h-[80px] resize-none"
                          {...field}
                          data-testid="input-notes"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={submitMutation.isPending}
                  data-testid="button-submit-form"
                >
                  {submitMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Resource
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
