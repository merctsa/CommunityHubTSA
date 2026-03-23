import { type User, type InsertUser, type Resource, type InsertResource, type ResourceSubmission, type InsertSubmission } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllResources(): Promise<Resource[]>;
  getResourceById(id: string): Promise<Resource | undefined>;
  getFeaturedResources(): Promise<Resource[]>;
  createResource(resource: InsertResource): Promise<Resource>;
  
  getAllSubmissions(): Promise<ResourceSubmission[]>;
  createSubmission(submission: InsertSubmission): Promise<ResourceSubmission>;
}

const sampleResources: Resource[] = [
  {
    id: "1",
    name: "Helping Hands Food Bank",
    description: "Providing nutritious food to families in need throughout our community. We offer weekly food distributions, emergency food boxes, and holiday meal programs. Our dedicated volunteers work tirelessly to ensure no one in our community goes hungry.",
    category: "Food & Housing",
    services: ["Food Assistance", "Emergency Services"],
    phone: "(555) 234-5678",
    email: "info@helpinghandsfoodbank.org",
    website: "https://helpinghandsfoodbank.org",
    address: "456 Oak Avenue, Community Town, ST 12345",
    isFeatured: true,
    impactStatement: "Served over 5,000 families last year",
  },
  {
    id: "2",
    name: "Community Youth Center",
    description: "Empowering young people through education, mentorship, and recreational activities. We provide after-school programs, summer camps, tutoring services, and leadership development opportunities for youth ages 6-18.",
    category: "Youth Programs",
    services: ["Youth Development", "Education", "Recreation"],
    phone: "(555) 345-6789",
    email: "programs@communityyouth.org",
    website: "https://communityyouth.org",
    address: "789 Pine Street, Community Town, ST 12345",
    isFeatured: true,
    impactStatement: "Mentoring 300+ youth annually",
  },
  {
    id: "3",
    name: "Senior Care Alliance",
    description: "Dedicated to improving the quality of life for seniors in our community. We offer meal delivery, transportation services, social activities, and care coordination to help seniors live independently and with dignity.",
    category: "Senior Services",
    services: ["Senior Care", "Food Assistance", "Medical Care"],
    phone: "(555) 456-7890",
    email: "support@seniorcare.org",
    website: "https://seniorcare.org",
    address: "321 Maple Lane, Community Town, ST 12345",
    isFeatured: true,
    impactStatement: "Supporting 400+ seniors daily",
  },
  {
    id: "4",
    name: "Family Support Services",
    description: "Comprehensive support services for families facing challenges. We provide counseling, parenting classes, emergency assistance, and referrals to help families thrive.",
    category: "Support Services",
    services: ["Counseling", "Emergency Services", "Housing Support"],
    phone: "(555) 567-8901",
    email: "help@familysupport.org",
    website: "https://familysupport.org",
    address: "555 Elm Drive, Community Town, ST 12345",
    isFeatured: false,
  },
  {
    id: "5",
    name: "Community Health Clinic",
    description: "Affordable healthcare for all community members. We offer primary care, preventive services, mental health counseling, and specialty referrals on a sliding fee scale.",
    category: "Health Services",
    services: ["Medical Care", "Mental Health", "Counseling"],
    phone: "(555) 678-9012",
    email: "appointments@communityhealth.org",
    website: "https://communityhealth.org",
    address: "888 Health Way, Community Town, ST 12345",
    isFeatured: false,
  },
  {
    id: "6",
    name: "Literacy Partners",
    description: "Building literacy skills for adults and children. We offer free tutoring, GED preparation, English language classes, and early childhood reading programs.",
    category: "Education",
    services: ["Education", "Youth Development"],
    phone: "(555) 789-0123",
    email: "learn@literacypartners.org",
    website: "https://literacypartners.org",
    address: "222 Book Lane, Community Town, ST 12345",
    isFeatured: false,
  },
  {
    id: "7",
    name: "Housing Assistance Network",
    description: "Helping families find and maintain safe, affordable housing. We provide rental assistance, eviction prevention, and help with utility costs for qualifying residents.",
    category: "Food & Housing",
    services: ["Housing Support", "Emergency Services"],
    phone: "(555) 890-1234",
    email: "housing@hannetwork.org",
    website: "https://housingassistancenetwork.org",
    address: "444 Home Street, Community Town, ST 12345",
    isFeatured: false,
  },
  {
    id: "8",
    name: "Legal Aid Society",
    description: "Free legal services for low-income community members. We provide assistance with family law, housing issues, immigration, and consumer protection cases.",
    category: "Support Services",
    services: ["Legal Aid", "Counseling"],
    phone: "(555) 901-2345",
    email: "intake@legalaid.org",
    website: "https://legalaid.org",
    address: "111 Justice Blvd, Community Town, ST 12345",
    isFeatured: false,
  },
  {
    id: "9",
    name: "Job Training Center",
    description: "Preparing community members for successful careers. We offer vocational training, resume workshops, interview coaching, and job placement assistance.",
    category: "Education",
    services: ["Job Training", "Education"],
    phone: "(555) 012-3456",
    email: "careers@jobtraining.org",
    website: "https://jobtrainingcenter.org",
    address: "666 Career Path, Community Town, ST 12345",
    isFeatured: false,
  },
  {
    id: "10",
    name: "Mental Health Coalition",
    description: "Providing accessible mental health services and crisis support. We offer individual counseling, support groups, crisis intervention, and community education programs.",
    category: "Health Services",
    services: ["Mental Health", "Counseling", "Emergency Services"],
    phone: "(555) 123-4560",
    email: "support@mhcoalition.org",
    website: "https://mentalhealthcoalition.org",
    address: "999 Wellness Way, Community Town, ST 12345",
    isFeatured: false,
  },
  {
    id: "11",
    name: "Community Arts Foundation",
    description: "Enriching lives through arts education and cultural programming. We offer art classes, music lessons, theater programs, and community performances for all ages.",
    category: "Community Events",
    services: ["Education", "Recreation", "Youth Development"],
    phone: "(555) 234-5670",
    email: "info@communityarts.org",
    website: "https://communityarts.org",
    address: "777 Creative Circle, Community Town, ST 12345",
    isFeatured: false,
  },
  {
    id: "12",
    name: "Veterans Support Services",
    description: "Dedicated to serving those who served. We provide housing assistance, job training, mental health support, and peer mentoring for veterans and their families.",
    category: "Support Services",
    services: ["Housing Support", "Job Training", "Mental Health", "Counseling"],
    phone: "(555) 345-6780",
    email: "veterans@vss.org",
    website: "https://veteranssupport.org",
    address: "333 Honor Drive, Community Town, ST 12345",
    isFeatured: false,
  },
  {
    id: "13",
    name: "Environmental Action Group",
    description: "Working together for a cleaner, greener community. We organize clean-up events, recycling programs, community gardens, and environmental education initiatives.",
    category: "Community Events",
    services: ["Education", "Recreation"],
    phone: "(555) 456-7891",
    email: "green@enviroaction.org",
    website: "https://enviroaction.org",
    address: "123 Green Lane, Community Town, ST 12345",
    isFeatured: false,
  },
  {
    id: "14",
    name: "Immigrant Services Center",
    description: "Supporting newcomers in building successful lives in our community. We offer ESL classes, citizenship preparation, cultural orientation, and connection to essential services.",
    category: "Support Services",
    services: ["Education", "Legal Aid", "Counseling"],
    phone: "(555) 567-8902",
    email: "welcome@immigrantservices.org",
    website: "https://immigrantservicescenter.org",
    address: "555 Welcome Way, Community Town, ST 12345",
    isFeatured: false,
  },
  {
    id: "15",
    name: "Disability Resources Center",
    description: "Promoting independence and inclusion for people with disabilities. We provide advocacy, assistive technology, accessible transportation, and support services.",
    category: "Support Services",
    services: ["Counseling", "Medical Care", "Education"],
    phone: "(555) 678-9013",
    email: "access@disabilityresources.org",
    website: "https://disabilityresources.org",
    address: "888 Access Avenue, Community Town, ST 12345",
    isFeatured: false,
  },
];

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private resources: Map<string, Resource>;
  private submissions: Map<string, ResourceSubmission>;

  constructor() {
    this.users = new Map();
    this.resources = new Map();
    this.submissions = new Map();
    
    sampleResources.forEach((resource) => {
      this.resources.set(resource.id, resource);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllResources(): Promise<Resource[]> {
    return Array.from(this.resources.values());
  }

  async getResourceById(id: string): Promise<Resource | undefined> {
    return this.resources.get(id);
  }

  async getFeaturedResources(): Promise<Resource[]> {
    return Array.from(this.resources.values()).filter((r) => r.isFeatured);
  }

  async createResource(insertResource: InsertResource): Promise<Resource> {
    const id = randomUUID();
    const resource: Resource = { 
      id,
      name: insertResource.name,
      description: insertResource.description,
      category: insertResource.category,
      services: insertResource.services,
      phone: insertResource.phone || "",
      email: insertResource.email || "",
      website: insertResource.website || "",
      address: insertResource.address || "",
      isFeatured: insertResource.isFeatured || false,
      impactStatement: insertResource.impactStatement,
    };
    this.resources.set(id, resource);
    return resource;
  }

  async getAllSubmissions(): Promise<ResourceSubmission[]> {
    return Array.from(this.submissions.values());
  }

  async createSubmission(insertSubmission: InsertSubmission): Promise<ResourceSubmission> {
    const id = randomUUID();
    const submission: ResourceSubmission = {
      id,
      organizationName: insertSubmission.organizationName,
      category: insertSubmission.category,
      description: insertSubmission.description,
      contactEmail: insertSubmission.contactEmail,
      contactPhone: insertSubmission.contactPhone || "",
      website: insertSubmission.website || "",
      address: insertSubmission.address || "",
      services: insertSubmission.services,
      additionalNotes: insertSubmission.additionalNotes || "",
      submittedAt: new Date().toISOString(),
      status: "pending",
    };
    this.submissions.set(id, submission);
    return submission;
  }
}

export const storage = new MemStorage();
