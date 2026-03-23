import { Link } from "wouter";
import { Heart, Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary">
                <Heart className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg">Community Hub</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Connecting residents with vital community resources, support services, and local programs.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/resources" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-resources">
                  Browse Resources
                </Link>
              </li>
              <li>
                <Link href="/submit" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-submit">
                  Submit a Resource
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-about">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>contact@communityhub.org</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>123 Main Street<br />Your City, ST 12345</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe for updates on new resources and community events.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()} data-testid="form-newsletter">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
                data-testid="input-newsletter-email"
                aria-label="Email for newsletter"
              />
              <Button type="submit" data-testid="button-newsletter-submit">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Community Resource Hub. All rights reserved.</p>
          <p className="mt-1">Made with care for our community.</p>
        </div>
      </div>
    </footer>
  );
}
