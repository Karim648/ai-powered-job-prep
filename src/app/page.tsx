import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser";
import { SignInButton } from "@clerk/nextjs";
import {
  BookOpenCheckIcon,
  Brain,
  BrainCircuitIcon,
  FileSlidersIcon,
  SpeechIcon,
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { UserAvatar } from "@/features/users/components/UserAvatar";
import { PricingTable } from "@/services/clerk/components/PricingTable";

export default function LandingPage() {
  return (
    <div className="from-background to-muted/20 bg-gradient-to-b">
      <Navbar />
      <Hero />
      <Features />
      <DetailedFeatures />
      <Stats />
      <Testimonials />
      <Pricing />
      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <nav className="border-border bg-card/80 sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <BrainCircuitIcon className="text-primary size-8" />
            <h1 className="text-foreground text-2xl font-bold">Resumate AI</h1>
          </div>
          <Suspense
            fallback={
              <SignInButton forceRedirectUrl="/app">
                <Button variant="outline">Sign In</Button>
              </SignInButton>
            }
          >
            <NavButton />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}

async function NavButton() {
  const { userId } = await getCurrentUser();

  if (userId == null) {
    return (
      <SignInButton forceRedirectUrl="/app">
        <Button variant="outline">Sign In</Button>
      </SignInButton>
    );
  }

  return (
    <Button asChild>
      <Link href="/app">Dashboard</Link>
    </Button>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      <div className="container">
        <div className="text-center">
          <h2 className="text-foreground mb-6 text-4xl leading-tight font-bold sm:text-6xl">
            Land your dream job with{" "}
            <span className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-nowrap text-transparent">
              AI-powered
            </span>{" "}
            job preparation
          </h2>
          <p className="text-muted-foreground mx-auto mb-8 max-w-3xl text-xl leading-relaxed">
            Skip the guesswork and accelerate your job search. Our AI platform
            eliminates interview anxiety, optimizes your resume, and gives you
            the technical edge to land offers faster.
          </p>
          <Button size="lg" className="h-12 px-6 text-base" asChild>
            <Link href="/app">Get Started for Free</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      title: "AI Interview Practice",
      Icon: SpeechIcon,
      description:
        "Simulate real interviews with AI that adapts to your responses. Build confidence and eliminate nervousness before the big day.",
    },
    {
      title: "Tailored Resume Suggestions",
      Icon: FileSlidersIcon,
      description:
        "Transform your resume into an ATS-friendly, recruiter-approved document that gets you more callbacks.",
    },
    {
      title: "Technical Question Practice",
      Icon: BookOpenCheckIcon,
      description:
        "Solve coding problems with guided hints and explanations. Perfect your approach to technical interviews.",
    },
  ];
  return (
    <section className="py-20">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="transform transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader className="pb-4">
                <div className="bg-primary/10 mb-4 flex h-16 w-16 items-center justify-center rounded-lg">
                  <feature.Icon className="text-primary h-8 w-8" />
                </div>
                <CardTitle className="text-card-foreground text-2xl font-bold">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function DetailedFeatures() {
  return (
    <section className="bg-muted/20 py-20">
      <div className="container">
        <div className="mb-16 text-center">
          <h3 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl">
            Everything you need to{" "}
            <span className="text-primary">ace your interviews</span>
          </h3>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            Get hands-on experience with real interview scenarios, personalized
            feedback, and industry-proven strategies
          </p>
        </div>

        <div className="space-y-20">
          {/* AI Interview Practice */}
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                  <SpeechIcon className="text-primary h-6 w-6" />
                </div>
                <h4 className="text-foreground text-2xl font-bold">
                  AI Interview Practice
                </h4>
              </div>
              <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                Practice with our advanced AI interviewer that adapts to your
                responses and provides real-time feedback. Experience realistic
                interview scenarios for behavioral, technical, and case study
                questions.
              </p>
              <ul className="text-muted-foreground space-y-3">
                <li className="flex items-center gap-3">
                  <div className="bg-primary h-2 w-2 rounded-full"></div>
                  Real-time voice interaction with AI interviewer
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-primary h-2 w-2 rounded-full"></div>
                  Personalized feedback on communication style
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-primary h-2 w-2 rounded-full"></div>
                  Industry-specific question banks
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-primary h-2 w-2 rounded-full"></div>
                  Progress tracking and improvement metrics
                </li>
              </ul>
            </div>
            <div className="bg-card border-border rounded-2xl border p-6 shadow-lg">
              <div className="bg-muted/50 mb-4 rounded-lg p-4">
                <div className="mb-3 flex items-center gap-3">
                  <div className="bg-primary/20 flex h-8 w-8 items-center justify-center rounded-full">
                    <Brain className="text-primary h-4 w-4" />
                  </div>
                  <span className="text-foreground text-sm font-medium">
                    AI Interviewer
                  </span>
                </div>
                <p className="text-muted-foreground text-sm italic">
                  &quot;Tell me about a time when you had to work with a
                  difficult team member...&quot;
                </p>
              </div>
              <div className="bg-primary/5 rounded-lg p-4">
                <div className="mb-3 flex items-center gap-3">
                  <div className="bg-primary/20 flex h-8 w-8 items-center justify-center rounded-full">
                    <span className="text-primary text-xs font-bold">You</span>
                  </div>
                  <span className="text-foreground text-sm font-medium">
                    Your Response
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">
                  &quot;In my previous role, I worked with a colleague who
                  consistently missed deadlines...&quot;
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="bg-primary/20 text-primary rounded-full px-2 py-1 text-xs">
                    Strong storytelling
                  </span>
                  <span className="bg-primary/20 text-primary rounded-full px-2 py-1 text-xs">
                    Good structure
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Resume Optimization */}
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="lg:order-2">
              <div className="mb-6 flex items-center gap-3">
                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                  <FileSlidersIcon className="text-primary h-6 w-6" />
                </div>
                <h4 className="text-foreground text-2xl font-bold">
                  Smart Resume Analysis
                </h4>
              </div>
              <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                Transform your resume with AI-powered suggestions that optimize
                for ATS systems and recruiter preferences. Get specific,
                actionable feedback tailored to your target role and industry.
              </p>
              <ul className="text-muted-foreground space-y-3">
                <li className="flex items-center gap-3">
                  <div className="bg-primary h-2 w-2 rounded-full"></div>
                  ATS compatibility scoring and optimization
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-primary h-2 w-2 rounded-full"></div>
                  Job description matching analysis
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-primary h-2 w-2 rounded-full"></div>
                  Industry-specific keyword suggestions
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-primary h-2 w-2 rounded-full"></div>
                  Before/after impact measurement
                </li>
              </ul>
            </div>
            <div className="bg-card border-border rounded-2xl border p-6 shadow-lg lg:order-1">
              <div className="mb-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-foreground text-sm font-medium">
                    Resume Score
                  </span>
                  <span className="text-primary text-2xl font-bold">87%</span>
                </div>
                <div className="bg-muted h-2 w-full rounded-full">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: "87%" }}
                  ></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-muted/50 flex items-center justify-between rounded-lg p-3">
                  <span className="text-foreground text-sm">
                    ATS Compatibility
                  </span>
                  <span className="text-primary text-sm font-medium">
                    Excellent
                  </span>
                </div>
                <div className="bg-muted/50 flex items-center justify-between rounded-lg p-3">
                  <span className="text-foreground text-sm">Keyword Match</span>
                  <span className="text-primary text-sm font-medium">92%</span>
                </div>
                <div className="bg-muted/50 flex items-center justify-between rounded-lg p-3">
                  <span className="text-foreground text-sm">
                    Impact Statements
                  </span>
                  <span className="text-primary text-sm font-medium">Good</span>
                </div>
              </div>
              <div className="bg-primary/10 mt-4 rounded-lg p-3">
                <p className="text-primary mb-1 text-xs font-medium">
                  💡 Suggestion
                </p>
                <p className="text-muted-foreground text-xs">
                  Add 2 more quantified achievements to increase impact score
                </p>
              </div>
            </div>
          </div>

          {/* Technical Questions */}
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                  <BookOpenCheckIcon className="text-primary h-6 w-6" />
                </div>
                <h4 className="text-foreground text-2xl font-bold">
                  Technical Interview Prep
                </h4>
              </div>
              <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                Master coding interviews with our comprehensive practice
                platform. Get step-by-step guidance, hints, and detailed
                explanations for problems across all difficulty levels and
                topics.
              </p>
              <ul className="text-muted-foreground space-y-3">
                <li className="flex items-center gap-3">
                  <div className="bg-primary h-2 w-2 rounded-full"></div>
                  1000+ curated coding problems
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-primary h-2 w-2 rounded-full"></div>
                  Real-time code execution and testing
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-primary h-2 w-2 rounded-full"></div>
                  AI-powered hints and explanations
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-primary h-2 w-2 rounded-full"></div>
                  Company-specific question patterns
                </li>
              </ul>
            </div>
            <div className="bg-card border-border rounded-2xl border p-6 shadow-lg">
              <div className="bg-muted/50 mb-4 rounded-lg p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-foreground text-sm font-medium">
                    Two Sum
                  </span>
                  <span className="bg-primary/20 text-primary rounded-full px-2 py-1 text-xs">
                    Easy
                  </span>
                </div>
                <p className="text-muted-foreground mb-3 text-xs">
                  Given an array of integers, return indices of two numbers that
                  add up to target.
                </p>
                <div className="bg-background rounded p-2 font-mono text-xs">
                  <span className="text-primary">def</span>{" "}
                  <span className="text-foreground">twoSum</span>(
                  <span className="text-primary">nums, target</span>):
                  <br />
                  &nbsp;&nbsp;
                  <span className="text-muted-foreground">
                    # Your solution here
                  </span>
                </div>
              </div>

              <div className="text-muted-foreground text-xs">
                <span className="text-primary">✓</span> 3/5 test cases passed
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    {
      value: "2.3x",
      label: "Faster job placement",
      description:
        "Our users land offers in 4-6 weeks vs industry average of 12+ weeks",
    },
    {
      value: "65%",
      label: "Fewer interviews needed",
      description:
        "Average 3-4 interviews to land an offer vs typical 8-10 interviews",
    },
    {
      value: "89%",
      label: "Interview success rate",
      description:
        "Users who complete our prep program receive offers at 9/10 interviews",
    },
    {
      value: "$15K+",
      label: "Higher starting salaries",
      description:
        "Better negotiation skills lead to significantly higher compensation",
    },
  ];

  return (
    <section className="bg-muted/30 py-20">
      <div className="container">
        <div className="mb-16 text-center">
          <h3 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl">
            Our users land jobs{" "}
            <span className="text-primary">faster and better</span>
          </h3>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            Don&apos;t just take our word for it. See how Resumate AI users
            consistently outperform the competition in every metric that
            matters.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-card/60 border-border/50 hover:bg-card/80 rounded-2xl border p-6 text-center backdrop-blur-sm transition-all duration-300"
            >
              <div className="text-primary mb-2 text-4xl font-bold sm:text-5xl">
                {stat.value}
              </div>
              <div className="text-foreground mb-3 text-lg font-semibold">
                {stat.label}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-8 text-sm text-pretty">
            * Based on internal data from 2,500+ successful job placements in
            2024
          </p>
          <Button size="lg" className="h-12 px-6" asChild>
            <Link href="/app">Join thousands of successful job seekers</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      company: "Google",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=64&h=64&fit=crop&crop=face&auto=format&q=80",
      content:
        "Resumate AI completely transformed my interview preparation. The AI practice sessions felt so realistic that I walked into my Google interview feeling completely confident. Landed the offer on my first try!",
      timeToOffer: "3 weeks",
    },
    {
      name: "Marcus Rodriguez",
      role: "Product Manager",
      company: "Stripe",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face&auto=format&q=80",
      content:
        "I was struggling with behavioral questions until I found Resumate AI. The AI helped me craft compelling stories and practice my delivery. Got offers from 3 different companies!",
      timeToOffer: "5 weeks",
    },
    {
      name: "Emily Park",
      role: "Data Scientist",
      company: "Netflix",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face&auto=format&q=80",
      content:
        "The resume optimization feature was a game-changer. My callback rate tripled after implementing Resumate AI&apos;s suggestions. Worth every penny and more.",
      timeToOffer: "4 weeks",
    },
    {
      name: "Alex Thompson",
      role: "Frontend Developer",
      company: "Airbnb",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face&auto=format&q=80",
      content:
        "The technical question practice was incredible. I went from failing coding interviews to acing them. The AI&apos;s feedback helped me identify and fix my weak spots immediately.",
      timeToOffer: "2 weeks",
    },
    {
      name: "Priya Patel",
      role: "UX Designer",
      company: "Figma",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=face&auto=format&q=80",
      content:
        "I was career-changing into tech and felt overwhelmed. Resumate AI&apos;s personalized guidance gave me the confidence to pursue design roles. Now I&apos;m living my dream at Figma!",
      timeToOffer: "6 weeks",
    },
    {
      name: "David Kim",
      role: "DevOps Engineer",
      company: "AWS",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=face&auto=format&q=80",
      content:
        "The salary negotiation tips alone paid for the platform 10x over. I increased my offer by $25K just by following Resumate AI&apos;s guidance. Absolutely worth it!",
      timeToOffer: "4 weeks",
    },
  ];

  return (
    <section className="py-20">
      <div className="container">
        <div className="mb-16 text-center">
          <h3 className="text-foreground mb-4 text-3xl font-bold text-balance sm:text-4xl">
            Success stories from{" "}
            <span className="text-primary">real users</span>
          </h3>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl text-pretty">
            Join thousands of professionals who&apos;ve accelerated their
            careers with Resumate AI
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="relative h-full transform overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <CardContent className="flex h-full flex-col p-6">
                <div className="mb-4 flex items-center gap-3">
                  <UserAvatar
                    className="size-10 flex-shrink-0"
                    user={{
                      imageUrl: testimonial.avatar,
                      name: testimonial.name,
                    }}
                  />
                  <div>
                    <div className="text-foreground font-semibold">
                      {testimonial.name}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {testimonial.role}
                    </div>
                  </div>
                </div>

                <blockquote className="text-muted-foreground mb-4 flex-grow-1 leading-relaxed italic">
                  &quot;{testimonial.content}&quot;
                </blockquote>

                <div className="flex items-center justify-between">
                  <div className="text-primary text-sm font-medium">
                    @{testimonial.company}
                  </div>
                  <div className="text-muted-foreground bg-muted/50 rounded-full px-2 py-1 text-xs">
                    Hired in {testimonial.timeToOffer}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-6">
            Ready to write your own success story?
          </p>
          <Button size="lg" className="h-12 px-8" asChild>
            <Link href="/app">Start Your Journey Today</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section className="bg-muted/20 py-20">
      <div className="container">
        <div className="mb-16 text-center">
          <h3 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl">
            Choose your{" "}
            <span className="text-primary">career acceleration</span> plan
          </h3>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            Invest in your future with flexible pricing options designed to fit
            your career goals and budget
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <PricingTable />
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4 text-sm">
            All plans include a 7-day refund period. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-card border-border border-t py-6">
      <div className="container">
        <div className="text-center">
          <p className="text-muted-foreground">
            Empowering your career journey with AI-powered job preparation
            tools.
          </p>
        </div>
      </div>
    </footer>
  );
}
