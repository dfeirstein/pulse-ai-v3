"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Play, Check } from "lucide-react";
import { CircularAvatar } from "@/components/ui/CircularAvatar";
import { HealthScoreGauge } from "@/components/ui/HealthScoreGauge";
import { DashboardPreview } from "@/components/ui/DashboardPreview";
import { NavigationHeader } from "@/components/ui/navigation-header";
import { SlackIcon } from "@/components/icons/slack-icon";

export default function Home() {
  return (
    <div className="min-h-screen bg-background-warm">
      {/* Navigation Header */}
      <NavigationHeader />

      {/* Hero Section - Culture Amp Style */}
      <section className="section-container text-center">
        <div className="max-w-4xl mx-auto">
          {/* Rating Badges */}
          <div className="flex items-center justify-center gap-4 mb-8 animate-fade-in-up">
            <div className="flex items-center gap-1 px-4 py-2 bg-gray-50 rounded-full">
              <Star className="w-5 h-5 fill-orange text-orange" />
              <span className="font-semibold">4.9</span>
              <span className="text-gray-600 text-sm">on G2</span>
            </div>
            <div className="flex items-center gap-1 px-4 py-2 bg-gray-50 rounded-full">
              <Star className="w-5 h-5 fill-orange text-orange" />
              <span className="font-semibold">4.8</span>
              <span className="text-gray-600 text-sm">on Capterra</span>
            </div>
          </div>

          {/* Main Headline with Handwritten Accent */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Transform your Slack into
            <br />
            actionable <span className="font-handwritten text-purple">insights</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Connect Slack for free and unlock powerful sentiment analysis,
            <br className="hidden md:block" />
            team insights, and data-driven culture metrics.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <button className="btn-primary flex items-center justify-center gap-2">
              <SlackIcon className="w-5 h-5" />
              Connect Slack Free
            </button>
            <button className="btn-secondary flex items-center justify-center gap-2">
              <Play className="w-5 h-5" />
              Watch 2-min demo
            </button>
          </div>

          {/* Enhanced Hero Section with Dashboard and Team Members */}
          <div className="relative mb-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="relative max-w-6xl mx-auto">
              {/* Main Dashboard Preview */}
              <div className="relative z-10">
                <DashboardPreview />
              </div>
              
              {/* Team Members with Colored Backgrounds */}
              <div className="absolute -left-20 top-10 hidden lg:block animate-float" style={{ animationDelay: '0.2s' }}>
                <CircularAvatar
                  src="/customers/customer-alex.jpg"
                  alt="Alex Chen"
                  bgColor="bg-purple"
                  size="lg"
                />
                <p className="text-center mt-2 text-sm font-semibold">Alex</p>
                <p className="text-center text-xs text-gray-600">Engineering</p>
              </div>
              
              <div className="absolute -right-20 top-10 hidden lg:block animate-float" style={{ animationDelay: '0.3s' }}>
                <CircularAvatar
                  src="/customers/customer-maya.jpg"
                  alt="Maya Johnson"
                  bgColor="bg-turquoise"
                  size="lg"
                />
                <p className="text-center mt-2 text-sm font-semibold">Maya</p>
                <p className="text-center text-xs text-gray-600">Design</p>
              </div>
              
              <div className="absolute -left-16 bottom-20 hidden lg:block animate-float" style={{ animationDelay: '0.4s' }}>
                <CircularAvatar
                  src="/customers/customer-carlos.jpg"
                  alt="Carlos Rivera"
                  bgColor="bg-orange"
                  size="md"
                />
                <p className="text-center mt-2 text-sm font-semibold">Carlos</p>
                <p className="text-center text-xs text-gray-600">Tech Lead</p>
              </div>
              
              <div className="absolute -right-16 bottom-20 hidden lg:block animate-float" style={{ animationDelay: '0.5s' }}>
                <CircularAvatar
                  src="/customers/customer-priya.jpg"
                  alt="Priya Patel"
                  bgColor="bg-pink"
                  size="md"
                />
                <p className="text-center mt-2 text-sm font-semibold">Priya</p>
                <p className="text-center text-xs text-gray-600">Data</p>
              </div>
              
              {/* Floating Health Score Gauges */}
              <div className="absolute -left-32 top-40 hidden xl:block animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <div className="bg-white rounded-2xl shadow-xl p-4">
                  <HealthScoreGauge score={92} label="Team Morale" color="#10B981" size="sm" />
                </div>
              </div>
              
              <div className="absolute -right-32 top-40 hidden xl:block animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                <div className="bg-white rounded-2xl shadow-xl p-4">
                  <HealthScoreGauge score={78} label="Productivity" color="#F59E0B" size="sm" />
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 animate-float z-20">
                <div className="bg-orange rounded-full p-4 shadow-lg">
                  <span className="text-white font-bold text-2xl">✨</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 animate-float z-20" style={{ animationDelay: '0.8s' }}>
                <div className="bg-purple rounded-full p-3 shadow-lg">
                  <span className="text-white font-bold text-xl">📊</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Logos */}
          <div className="border-t border-gray-200 pt-12">
            <p className="text-sm text-gray-600 mb-6">Trusted by forward-thinking teams at</p>
            <div className="flex items-center justify-center gap-8 flex-wrap opacity-60">
              <div className="text-2xl font-bold text-gray-400">Stripe</div>
              <div className="text-2xl font-bold text-gray-400">Notion</div>
              <div className="text-2xl font-bold text-gray-400">Linear</div>
              <div className="text-2xl font-bold text-gray-400">Vercel</div>
              <div className="text-2xl font-bold text-gray-400">Figma</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Culture Amp Style Cards */}
      <section id="features" className="section-container bg-gray-100">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything you need for <span className="font-handwritten text-purple">effective</span> teams
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From sentiment tracking to actionable insights, we've got your culture covered.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature Card 1 */}
          <div className="card-culture hover-lift">
            <div className="mb-6">
              <Image
                src="/illustrations/data-insights-illustration.png"
                alt="Real-time Analytics"
                width={200}
                height={150}
                className="mx-auto"
              />
            </div>
            <h3 className="text-2xl font-bold mb-4">
              Real-time <span className="font-handwritten text-purple">analytics</span>
            </h3>
            <p className="text-gray-600 mb-4">
              Track sentiment trends, team morale, and engagement metrics as they happen. No surveys needed.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-turquoise mt-0.5" />
                <span>Instant sentiment scoring</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-turquoise mt-0.5" />
                <span>Team health dashboards</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-turquoise mt-0.5" />
                <span>Trend predictions</span>
              </li>
            </ul>
          </div>

          {/* Feature Card 2 */}
          <div className="card-culture hover-lift">
            <div className="mb-6">
              <Image
                src="/illustrations/high-five-illustration.png"
                alt="Team Insights"
                width={200}
                height={150}
                className="mx-auto"
              />
            </div>
            <h3 className="text-2xl font-bold mb-4">
              Actionable <span className="font-handwritten text-orange">insights</span>
            </h3>
            <p className="text-gray-600 mb-4">
              Get specific recommendations to improve team dynamics and culture based on your data.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-turquoise mt-0.5" />
                <span>Weekly team reports</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-turquoise mt-0.5" />
                <span>Burnout detection</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-turquoise mt-0.5" />
                <span>Celebration alerts</span>
              </li>
            </ul>
          </div>

          {/* Feature Card 3 */}
          <div className="card-culture hover-lift">
            <div className="mb-6">
              <Image
                src="/illustrations/team-collaboration-illustration.png"
                alt="Slack Integration"
                width={200}
                height={150}
                className="mx-auto"
              />
            </div>
            <h3 className="text-2xl font-bold mb-4">
              Seamless <span className="font-handwritten text-turquoise">integration</span>
            </h3>
            <p className="text-gray-600 mb-4">
              Connect in 30 seconds. No credit card required. Works with your existing Slack workspace.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-turquoise mt-0.5" />
                <span>One-click setup</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-turquoise mt-0.5" />
                <span>Privacy-first approach</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-turquoise mt-0.5" />
                <span>GDPR compliant</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Teams love working with <span className="font-handwritten text-purple">data</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Testimonial 1 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/customers/customer-alex.jpg"
                alt="Alex Chen"
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <p className="font-semibold">Alex Chen</p>
                <p className="text-sm text-gray-600">Engineering Manager</p>
              </div>
            </div>
            <p className="text-gray-700">
              "Finally, we can measure team health without endless surveys. Game changer!"
            </p>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/customers/customer-maya.jpg"
                alt="Maya Johnson"
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <p className="font-semibold">Maya Johnson</p>
                <p className="text-sm text-gray-600">Product Designer</p>
              </div>
            </div>
            <p className="text-gray-700">
              "The insights helped us catch burnout early and improve our sprint planning."
            </p>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/customers/customer-carlos.jpg"
                alt="Carlos Rivera"
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <p className="font-semibold">Carlos Rivera</p>
                <p className="text-sm text-gray-600">Tech Lead</p>
              </div>
            </div>
            <p className="text-gray-700">
              "30-second setup, instant value. Our team culture has never been stronger."
            </p>
          </div>

          {/* Testimonial 4 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/customers/customer-priya.jpg"
                alt="Priya Patel"
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <p className="font-semibold">Priya Patel</p>
                <p className="text-sm text-gray-600">Data Analyst</p>
              </div>
            </div>
            <p className="text-gray-700">
              "The sentiment tracking is incredibly accurate. It's like having a culture coach."
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="section-container bg-gray-100">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get started in <span className="font-handwritten text-orange">30 seconds</span>
          </h2>
          <p className="text-xl text-gray-600">
            No credit card. No complex setup. Just instant insights.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Connect Slack</h3>
              <p className="text-gray-600">
                One click to authorize. We only read public channels you choose.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-turquoise text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">AI Analyzes</h3>
              <p className="text-gray-600">
                Our AI processes conversations to extract sentiment and insights.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Get Insights</h3>
              <p className="text-gray-600">
                View real-time dashboards and receive weekly team health reports.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button className="btn-accent flex items-center justify-center gap-2 mx-auto">
              <SlackIcon className="w-5 h-5" />
              Connect Slack Free
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to build a <span className="font-handwritten text-purple">healthier</span> team culture?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of teams using data to create better workplaces.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary flex items-center justify-center gap-2">
              <SlackIcon className="w-5 h-5" />
              Connect Slack Free
            </button>
            <button className="btn-secondary">
              Schedule a demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer - Culture Amp Style */}
      <footer className="bg-black text-white">
        <div className="section-container">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Pulse<span className="font-handwritten text-pink">AI</span>
              </h3>
              <p className="text-gray-400">
                Transform your team culture with data-driven insights.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Integrations</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">API</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Terms</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Security</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">GDPR</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Pulse AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}