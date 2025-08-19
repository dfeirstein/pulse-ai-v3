import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BarChart3, Heart, Shield, Sparkles, Timer, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Navigation */}
      <nav className="fixed top-0 w-full backdrop-blur-md bg-background/80 border-b z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold font-[family-name:var(--font-display)]">
              Pulse AI
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost">Features</Button>
            <Button variant="ghost">Pricing</Button>
            <Button variant="ghost">About</Button>
            <Button>Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6">
            <Badge className="mb-4" variant="secondary">
              <Sparkles className="h-3 w-3 mr-1" />
              Powered by AI
            </Badge>
            <h1 className="text-6xl font-bold font-[family-name:var(--font-display)] leading-tight">
              Understand Your Team's
              <span className="text-primary block">True Sentiment</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              AI-powered sentiment analysis for Slack and Microsoft Teams. 
              Get instant insights into team health without surveys.
            </p>
            <div className="flex justify-center space-x-4 pt-6">
              <Button size="lg" className="text-lg px-8">
                Start Free Health Check
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Watch Demo
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              <Timer className="inline h-4 w-4 mr-1" />
              60-second setup • No credit card required
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-[family-name:var(--font-display)] mb-4">
              Why Teams Choose Pulse AI
            </h2>
            <p className="text-xl text-muted-foreground">
              Real-time insights that help you build healthier teams
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-2xl">Instant Analysis</CardTitle>
                <CardDescription>
                  Get team sentiment scores in 60 seconds. No surveys, no waiting.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Real-time sentiment tracking</li>
                  <li>• Channel-specific insights</li>
                  <li>• Historical trend analysis</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-secondary transition-colors">
              <CardHeader>
                <Shield className="h-12 w-12 text-secondary mb-4" />
                <CardTitle className="text-2xl">Privacy First</CardTitle>
                <CardDescription>
                  Your data stays secure with enterprise-grade encryption.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• GDPR compliant</li>
                  <li>• Anonymous analysis</li>
                  <li>• SOC 2 Type II certified</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent transition-colors">
              <CardHeader>
                <Users className="h-12 w-12 text-accent mb-4" />
                <CardTitle className="text-2xl">Team Insights</CardTitle>
                <CardDescription>
                  Identify burnout risks and celebrate wins automatically.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Burnout prediction</li>
                  <li>• Team mood tracking</li>
                  <li>• AI recommendations</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-[family-name:var(--font-display)] mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Three simple steps to healthier teams
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect Your Workspace</h3>
              <p className="text-muted-foreground">
                Securely connect Slack or Teams with one-click OAuth
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-secondary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Analyzes Sentiment</h3>
              <p className="text-muted-foreground">
                Our AI processes messages to understand team dynamics
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Actionable Insights</h3>
              <p className="text-muted-foreground">
                Receive real-time alerts and recommendations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-2">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold font-[family-name:var(--font-display)] mb-4">
                Ready to Build a Healthier Team?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join hundreds of teams using Pulse AI to improve culture
              </p>
              <Button size="lg" className="text-lg px-12">
                Start Your Free Health Check
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Free forever for teams under 10 • No credit card required
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold font-[family-name:var(--font-display)]">
                Pulse AI
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Pulse AI. Built with ❤️ by a solopreneur.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}