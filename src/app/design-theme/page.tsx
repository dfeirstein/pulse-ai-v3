"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertCircle, 
  CheckCircle, 
  Info, 
  XCircle,
  Star,
  ArrowRight,
  Play,
  Download,
  Upload,
  Search,
  Menu,
  X,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { NavigationHeader } from "@/components/ui/navigation-header";
import { ConnectSlackButton } from "@/components/ui/connect-slack-button";

export default function DesignTheme() {
  return (
    <div className="min-h-screen bg-background-warm">
      <NavigationHeader />
      
      {/* Hero Section */}
      <section className="section-container">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Pulse<span className="font-handwritten text-purple">AI</span> Design System
            </h1>
            <p className="text-xl text-gray-600">
              Complete style guide and component library for consistent, beautiful experiences
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: "Typography", href: "#typography" },
              { label: "Colors", href: "#colors" },
              { label: "Buttons", href: "#buttons" },
              { label: "Forms", href: "#forms" },
              { label: "Cards", href: "#cards" },
              { label: "Spacing", href: "#spacing" },
              { label: "Shadows", href: "#shadows" },
              { label: "Animations", href: "#animations" }
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="bg-white rounded-xl p-4 text-center hover:shadow-lg transition-all duration-200 border border-gray-200"
              >
                <span className="font-semibold">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Identity */}
      <section className="section-container bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Brand Identity</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Logo Usage</h3>
              <div className="space-y-6">
                <div className="p-8 bg-background-warm rounded-xl">
                  <div className="text-3xl font-bold">
                    Pulse<span className="font-handwritten text-purple">AI</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Primary Logo</p>
                </div>
                <div className="p-8 bg-black rounded-xl">
                  <div className="text-3xl font-bold text-white">
                    Pulse<span className="font-handwritten text-pink">AI</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">Dark Background</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-4">Brand Voice</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Warm & Approachable</h4>
                  <p className="text-gray-600">We use friendly, conversational language that makes data feel accessible.</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Data-Driven</h4>
                  <p className="text-gray-600">Clear metrics and insights backed by evidence and real results.</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Empowering</h4>
                  <p className="text-gray-600">Help teams unlock their potential through understanding.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section id="typography" className="section-container">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Typography</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Font Families</h3>
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <p className="font-serif-heading text-2xl mb-2">Lora (Serif Headers)</p>
                  <p className="text-gray-600">Used for h1 and h2 headings for warmth and personality</p>
                </div>
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <p className="text-2xl mb-2">Inter (Sans-serif)</p>
                  <p className="text-gray-600">Body text and UI elements for clarity and readability</p>
                </div>
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <p className="font-handwritten text-2xl mb-2">Caveat (Handwritten)</p>
                  <p className="text-gray-600">Accent text for personality and emphasis</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-6">Type Scale</h3>
              <div className="space-y-3">
                <div className="py-2">
                  <h1 className="text-6xl font-bold">Heading 1</h1>
                  <code className="text-sm text-gray-600">text-6xl font-bold</code>
                </div>
                <div className="py-2">
                  <h2 className="text-5xl font-bold">Heading 2</h2>
                  <code className="text-sm text-gray-600">text-5xl font-bold</code>
                </div>
                <div className="py-2">
                  <h3 className="text-3xl font-bold">Heading 3</h3>
                  <code className="text-sm text-gray-600">text-3xl font-bold</code>
                </div>
                <div className="py-2">
                  <h4 className="text-2xl font-semibold">Heading 4</h4>
                  <code className="text-sm text-gray-600">text-2xl font-semibold</code>
                </div>
                <div className="py-2">
                  <p className="text-xl">Large Body Text</p>
                  <code className="text-sm text-gray-600">text-xl</code>
                </div>
                <div className="py-2">
                  <p className="text-base">Regular Body Text</p>
                  <code className="text-sm text-gray-600">text-base</code>
                </div>
                <div className="py-2">
                  <p className="text-sm">Small Text</p>
                  <code className="text-sm text-gray-600">text-sm</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Colors */}
      <section id="colors" className="section-container bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Color Palette</h2>
          
          <div className="space-y-8">
            {/* Primary Colors */}
            <div>
              <h3 className="text-2xl font-semibold mb-4">Primary Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="h-32 bg-black rounded-lg mb-2"></div>
                  <p className="font-semibold">Black</p>
                  <code className="text-sm text-gray-600">#000000</code>
                </div>
                <div>
                  <div className="h-32 bg-white border-2 border-gray-200 rounded-lg mb-2"></div>
                  <p className="font-semibold">White</p>
                  <code className="text-sm text-gray-600">#FFFFFF</code>
                </div>
                <div>
                  <div className="h-32 rounded-lg mb-2" style={{ backgroundColor: '#FBF8F3' }}></div>
                  <p className="font-semibold">Background Warm</p>
                  <code className="text-sm text-gray-600">#FBF8F3</code>
                </div>
                <div>
                  <div className="h-32 rounded-lg mb-2" style={{ backgroundColor: '#F5F1EB' }}></div>
                  <p className="font-semibold">Off White</p>
                  <code className="text-sm text-gray-600">#F5F1EB</code>
                </div>
              </div>
            </div>

            {/* Brand Colors */}
            <div>
              <h3 className="text-2xl font-semibold mb-4">Brand Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="h-32 bg-purple rounded-lg mb-2"></div>
                  <p className="font-semibold">Purple</p>
                  <code className="text-sm text-gray-600">#6B46C1</code>
                </div>
                <div>
                  <div className="h-32 bg-turquoise rounded-lg mb-2"></div>
                  <p className="font-semibold">Turquoise</p>
                  <code className="text-sm text-gray-600">#10B981</code>
                </div>
                <div>
                  <div className="h-32 bg-orange rounded-lg mb-2"></div>
                  <p className="font-semibold">Orange</p>
                  <code className="text-sm text-gray-600">#F59E0B</code>
                </div>
                <div>
                  <div className="h-32 bg-pink rounded-lg mb-2"></div>
                  <p className="font-semibold">Pink</p>
                  <code className="text-sm text-gray-600">#E879F9</code>
                </div>
              </div>
            </div>

            {/* Gray Scale */}
            <div>
              <h3 className="text-2xl font-semibold mb-4">Warm Gray Scale</h3>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                {[
                  { name: 'Gray 50', value: '#FAF7F2' },
                  { name: 'Gray 100', value: '#F5F1EB' },
                  { name: 'Gray 200', value: '#E8E2D8' },
                  { name: 'Gray 300', value: '#D6CCC0' },
                  { name: 'Gray 400', value: '#B8AA9C' },
                  { name: 'Gray 500', value: '#9A8B7A' },
                  { name: 'Gray 600', value: '#7C6B58' },
                  { name: 'Gray 700', value: '#5E4D3A' },
                  { name: 'Gray 800', value: '#403328' },
                  { name: 'Gray 900', value: '#2A1F16' },
                ].map((color) => (
                  <div key={color.name}>
                    <div className="h-24 rounded-lg mb-2" style={{ backgroundColor: color.value }}></div>
                    <p className="font-medium text-sm">{color.name}</p>
                    <code className="text-xs text-gray-600">{color.value}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section id="buttons" className="section-container">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Buttons</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Primary Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="lg">Large Primary</Button>
                <Button variant="primary">Default Primary</Button>
                <Button variant="primary" size="sm">Small Primary</Button>
                <Button variant="primary" disabled>Disabled</Button>
              </div>
              <code className="text-sm text-gray-600 mt-2 block">variant="primary" size="lg|default|sm"</code>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">Secondary Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="secondary" size="lg">Large Secondary</Button>
                <Button variant="secondary">Default Secondary</Button>
                <Button variant="secondary" size="sm">Small Secondary</Button>
                <Button variant="secondary" disabled>Disabled</Button>
              </div>
              <code className="text-sm text-gray-600 mt-2 block">variant="secondary"</code>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">Special Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <ConnectSlackButton size="lg">Connect Slack</ConnectSlackButton>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">Button with Icons</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="lg">
                  <Play className="w-5 h-5" />
                  Watch Demo
                </Button>
                <Button variant="secondary">
                  <Download className="w-4 h-4" />
                  Download
                </Button>
                <Button variant="outline">
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Forms */}
      <section id="forms" className="section-container bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Forms & Inputs</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Input Fields</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" id="email" placeholder="name@company.com" />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input type="password" id="password" placeholder="Enter your password" />
                </div>
                <div>
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input id="search" className="pl-10" placeholder="Search..." />
                  </div>
                </div>
                <div>
                  <Label htmlFor="disabled">Disabled Input</Label>
                  <Input id="disabled" disabled placeholder="Disabled field" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">Select & Textarea</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="team">Team Size</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">1-10 people</SelectItem>
                      <SelectItem value="medium">11-50 people</SelectItem>
                      <SelectItem value="large">51-200 people</SelectItem>
                      <SelectItem value="enterprise">200+ people</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us about your team..."
                    rows={4}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section id="cards" className="section-container">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Cards & Containers</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Standard Card</CardTitle>
                <CardDescription>Basic card with header and content</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  This is a standard card component with proper spacing and shadows.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="primary" size="sm">Action</Button>
              </CardFooter>
            </Card>

            <Card className="border-purple">
              <CardHeader>
                <CardTitle>
                  Featured <span className="font-handwritten text-purple">Card</span>
                </CardTitle>
                <CardDescription>With brand accent</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-turquoise" />
                    <span>Feature one</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-turquoise" />
                    <span>Feature two</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black text-white">
              <CardHeader>
                <CardTitle className="text-white">Dark Card</CardTitle>
                <CardDescription className="text-gray-400">For emphasis and contrast</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Dark themed cards for special sections.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" size="sm">Learn More</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Culture Amp Style Cards</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card-culture">
                <h4 className="text-xl font-bold mb-3">
                  Team <span className="font-handwritten text-purple">Health</span>
                </h4>
                <p className="text-gray-600 mb-4">
                  Monitor your team's wellbeing with real-time insights from Slack.
                </p>
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-bold text-turquoise">85%</div>
                  <div className="text-sm text-gray-600">Overall Score</div>
                </div>
              </div>

              <div className="card-culture hover-lift">
                <h4 className="text-xl font-bold mb-3">
                  Engagement <span className="font-handwritten text-orange">Metrics</span>
                </h4>
                <p className="text-gray-600 mb-4">
                  Track participation and collaboration across your workspace.
                </p>
                <div className="flex gap-2">
                  <Badge className="bg-turquoise text-white">Active</Badge>
                  <Badge className="bg-orange text-white">Trending Up</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacing */}
      <section id="spacing" className="section-container bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Spacing System</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Padding Scale</h3>
              <div className="space-y-2">
                {[
                  { size: 'p-1', value: '0.25rem', px: '4px' },
                  { size: 'p-2', value: '0.5rem', px: '8px' },
                  { size: 'p-4', value: '1rem', px: '16px' },
                  { size: 'p-6', value: '1.5rem', px: '24px' },
                  { size: 'p-8', value: '2rem', px: '32px' },
                  { size: 'p-12', value: '3rem', px: '48px' },
                ].map((item) => (
                  <div key={item.size} className="flex items-center gap-4">
                    <div className={`bg-purple text-white ${item.size} rounded`}>
                      {item.size}
                    </div>
                    <span className="text-sm text-gray-600">{item.value} / {item.px}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">Margin Scale</h3>
              <div className="space-y-4">
                {[
                  { size: 'mb-2', value: '0.5rem' },
                  { size: 'mb-4', value: '1rem' },
                  { size: 'mb-6', value: '1.5rem' },
                  { size: 'mb-8', value: '2rem' },
                  { size: 'mb-12', value: '3rem' },
                  { size: 'mb-16', value: '4rem' },
                ].map((item) => (
                  <div key={item.size}>
                    <div className="bg-gray-100 p-2 rounded">Element</div>
                    <div className={`${item.size} bg-turquoise h-2`}></div>
                    <div className="bg-gray-100 p-2 rounded">
                      <code className="text-sm">{item.size} = {item.value}</code>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shadows */}
      <section id="shadows" className="section-container">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Shadows & Elevation</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="p-6 bg-white rounded-lg">
              <p className="font-semibold mb-2">No Shadow</p>
              <code className="text-sm text-gray-600">shadow-none</code>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <p className="font-semibold mb-2">Small</p>
              <code className="text-sm text-gray-600">shadow-sm</code>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <p className="font-semibold mb-2">Default</p>
              <code className="text-sm text-gray-600">shadow</code>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <p className="font-semibold mb-2">Large</p>
              <code className="text-sm text-gray-600">shadow-lg</code>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-xl">
              <p className="font-semibold mb-2">Extra Large</p>
              <code className="text-sm text-gray-600">shadow-xl</code>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-2xl">
              <p className="font-semibold mb-2">2XL</p>
              <code className="text-sm text-gray-600">shadow-2xl</code>
            </div>
            <div className="p-6 bg-white rounded-lg hover:shadow-xl transition-shadow duration-200 shadow-lg cursor-pointer">
              <p className="font-semibold mb-2">Hover Effect</p>
              <code className="text-sm text-gray-600">hover:shadow-xl</code>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg hover-lift cursor-pointer">
              <p className="font-semibold mb-2">Lift on Hover</p>
              <code className="text-sm text-gray-600">hover-lift</code>
            </div>
          </div>
        </div>
      </section>

      {/* Animations */}
      <section id="animations" className="section-container bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Animations & Transitions</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-background-warm rounded-lg">
              <div className="animate-fade-in-up">
                <h3 className="text-xl font-semibold mb-2">Fade In Up</h3>
                <p className="text-gray-600">Entrance animation</p>
                <code className="text-sm">animate-fade-in-up</code>
              </div>
            </div>

            <div className="p-6 bg-background-warm rounded-lg">
              <div className="animate-float">
                <div className="w-16 h-16 bg-purple rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">Float</h3>
                <p className="text-gray-600">Continuous floating</p>
                <code className="text-sm">animate-float</code>
              </div>
            </div>

            <div className="p-6 bg-background-warm rounded-lg">
              <Button variant="primary" className="w-full">
                Hover & Click Me
              </Button>
              <p className="text-sm text-gray-600 mt-4">Scale on interaction</p>
              <code className="text-sm">active:scale-95</code>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Transition Utilities</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-background-warm rounded-lg">
                <Button variant="outline" className="w-full transition-all duration-200">
                  Smooth Transition
                </Button>
                <code className="text-sm text-gray-600 mt-2 block">transition-all duration-200</code>
              </div>
              <div className="p-4 bg-background-warm rounded-lg">
                <div className="p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors duration-300 cursor-pointer">
                  Hover for color change
                </div>
                <code className="text-sm text-gray-600 mt-2 block">transition-colors duration-300</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alerts & Notifications */}
      <section className="section-container">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Alerts & Notifications</h2>
          
          <div className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                This is an informational alert for general messages.
              </AlertDescription>
            </Alert>

            <Alert className="border-turquoise bg-turquoise/10">
              <CheckCircle className="h-4 w-4 text-turquoise" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Your changes have been saved successfully!
              </AlertDescription>
            </Alert>

            <Alert className="border-orange bg-orange/10">
              <AlertCircle className="h-4 w-4 text-orange" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                Please review your settings before continuing.
              </AlertDescription>
            </Alert>

            <Alert className="border-red-500 bg-red-50">
              <XCircle className="h-4 w-4 text-red-500" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Something went wrong. Please try again.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </section>

      {/* Badges & Tags */}
      <section className="section-container bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Badges & Tags</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Status Badges</h3>
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge className="bg-turquoise text-white">Active</Badge>
                <Badge className="bg-orange text-white">Pending</Badge>
                <Badge className="bg-purple text-white">Featured</Badge>
                <Badge className="bg-gray-500 text-white">Archived</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">Rating Stars</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-orange text-orange" />
                  ))}
                  <span className="ml-2 font-semibold">5.0</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-orange text-orange" />
                  ))}
                  <Star className="w-5 h-5 text-gray-300" />
                  <span className="ml-2 font-semibold">4.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Example */}
      <section className="section-container">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Tabs & Navigation</h2>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                  <CardDescription>Your team's health at a glance</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Overview content goes here...</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="analytics" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics</CardTitle>
                  <CardDescription>Deep dive into your metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Analytics content goes here...</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reports" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Reports</CardTitle>
                  <CardDescription>Generated insights and recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Reports content goes here...</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="settings" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>Configure your preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Settings content goes here...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Code Examples */}
      <section className="section-container bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Implementation Examples</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Component Usage</h3>
              <pre className="bg-black p-4 rounded-lg overflow-x-auto">
                <code className="text-sm">{`// Hero Section with Handwritten Accent
<h1 className="text-5xl font-bold">
  Transform your
  <span className="font-handwritten text-purple">
    insights
  </span>
</h1>

// Culture Amp Style Card
<div className="card-culture hover-lift">
  <h3>Team Health</h3>
  <p>Monitor wellbeing</p>
</div>

// Primary Button
<Button variant="primary" size="lg">
  Get Started
</Button>`}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">Theme Variables</h3>
              <pre className="bg-black p-4 rounded-lg overflow-x-auto">
                <code className="text-sm">{`// Color Classes
bg-background-warm  // Warm cream bg
text-purple         // Brand purple
bg-turquoise       // Success green
bg-orange          // Warning/accent

// Typography
font-serif-heading  // Lora headers
font-handwritten   // Caveat accents

// Effects
hover-lift         // Lift on hover
animate-fade-in-up // Entrance anim
animate-float      // Floating effect`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Pulse<span className="font-handwritten text-pink">AI</span> Design System
          </h3>
          <p className="text-gray-400">
            Version 1.0 • Culture Amp Inspired • Claude Warm Colors
          </p>
        </div>
      </footer>
    </div>
  );
}