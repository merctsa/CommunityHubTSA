import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Heart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
  { href: "/submit", label: "Submit Resource" },
];

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2" data-testid="link-home-logo">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary">
              <Heart className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="hidden font-semibold text-lg sm:inline-block" data-testid="text-logo">
              Community Hub
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1" data-testid="nav-desktop">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={location === link.href ? "secondary" : "ghost"}
                  className="text-sm"
                  data-testid={`link-nav-${link.label.toLowerCase().replace(" ", "-")}`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/resources" className="hidden sm:block">
              <Button variant="ghost" size="icon" data-testid="button-search">
                <Search className="h-5 w-5" />
              </Button>
            </Link>
            <ThemeToggle />
            <Link href="/submit" className="hidden sm:block">
              <Button data-testid="button-submit-cta">
                Submit Resource
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background" data-testid="nav-mobile">
          <nav className="flex flex-col p-4 gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={location === link.href ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`link-mobile-${link.label.toLowerCase().replace(" ", "-")}`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
