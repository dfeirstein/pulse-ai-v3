"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { ConnectSlackButton } from "@/components/ui/connect-slack-button";

export function NavigationHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { label: "Features", href: "#features" },
    { label: "How it Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold">
                Pulse<span className="font-handwritten text-purple">AI</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Buttons - Right */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
            <ConnectSlackButton 
              size="sm"
              className="rounded-full"
              onConnect={() => console.log('Starting Slack OAuth from header...')}
              onError={(error) => console.error('OAuth error from header:', error)}
            >
              Connect Slack Free
            </ConnectSlackButton>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="px-2">
                  {mobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80 bg-background-warm border-l border-gray-200 z-[100] px-8 py-6">
                <SheetHeader className="sr-only">
                  <SheetTitle>Navigation Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-8 mt-4">
                  {/* Mobile Logo */}
                  <Link 
                    href="/" 
                    className="flex items-center space-x-2 px-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="text-2xl font-bold">
                      Pulse<span className="font-handwritten text-purple">AI</span>
                    </span>
                  </Link>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col space-y-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="text-lg font-medium text-gray-700 hover:text-purple hover:bg-gray-50 transition-all duration-200 py-3 px-4 rounded-xl"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>

                  {/* Mobile CTA Buttons */}
                  <div className="flex flex-col space-y-4 pt-6 border-t border-gray-200">
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full rounded-full py-6 text-base font-medium border-gray-300 hover:border-gray-400 bg-white">
                        Sign in
                      </Button>
                    </Link>
                    <ConnectSlackButton 
                      className="w-full rounded-full py-6 text-base font-semibold bg-black hover:bg-gray-800"
                      onConnect={() => {
                        console.log('Starting Slack OAuth from mobile menu...');
                        setMobileMenuOpen(false);
                      }}
                      onError={(error) => console.error('OAuth error from mobile menu:', error)}
                    >
                      Connect Slack Free
                    </ConnectSlackButton>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}