import Image from "next/image";
import Link from "next/link";
import {
  Video,
  Calendar,
  Youtube,
  Instagram,
  Mail,
  ArrowRight,
  CheckCircle2,
  Clock,
  Zap,
  BarChart3,
  Globe,
  CirclePlay
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-slate-900 dark:bg-zinc-950 dark:text-zinc-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-zinc-200 bg-white/80 px-6 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80 md:px-12">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 shadow-lg shadow-indigo-500/20">
            <Video className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">AIshorts<span className="text-indigo-600">-gen</span></span>
        </div>
        <div className="hidden items-center gap-8 md:flex">
          <Link href="#features" className="text-sm font-medium transition-colors hover:text-indigo-600">Features</Link>
          <Link href="#platforms" className="text-sm font-medium transition-colors hover:text-indigo-600">Platforms</Link>
          <Link href="#pricing" className="text-sm font-medium transition-colors hover:text-indigo-600">Pricing</Link>

          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost" className="text-sm font-medium">Log in</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button className="bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-700">Get Started</Button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <Link href="/dashboard">
              <Button variant="ghost" className="text-sm font-medium">Dashboard</Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
        <Button variant="ghost" size="icon" className="md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
        </Button>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
          <div className="container relative mx-auto px-6 text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-1 text-sm font-medium text-indigo-700 bg-indigo-50 dark:bg-indigo-900/30 dark:text-indigo-300">
              New: AI Auto-Scheduling is here!
            </Badge>
            <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight md:text-7xl lg:leading-[1.1]">
              Generate & Schedule <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">AI Shorts</span> in Minutes.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 md:text-xl">
              Create high-quality short-form videos for YouTube, Instagram, and TikTok using AI. Auto-schedule them across all your socials and never miss a beat.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <SignedOut>
                <SignUpButton mode="modal">
                  <Button size="lg" className="h-12 bg-indigo-600 px-8 text-white hover:bg-indigo-700 sm:w-auto">
                    Generate My First Video <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard">
                  <Button size="lg" className="h-12 bg-indigo-600 px-8 text-white hover:bg-indigo-700 sm:w-auto">
                    Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </SignedIn>
              <Button size="lg" variant="outline" className="h-12 border-zinc-200 px-8 dark:border-zinc-800">
                View Examples
              </Button>
            </div>

            {/* Social Proof / Platforms */}
            <div className="mt-16 flex flex-wrap justify-center gap-8 opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0">
              <div className="flex items-center gap-2">
                <Youtube className="h-6 w-6 text-[#FF0000]" />
                <span className="font-semibold">YouTube Shorts</span>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="h-6 w-6 text-[#E4405F]" />
                <span className="font-semibold">Instagram Reels</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
                <span className="font-semibold">TikTok</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-6 w-6 text-blue-500" />
                <span className="font-semibold">Email Campaigns</span>
              </div>
            </div>
          </div>

          {/* Background Decoration */}
          <div className="absolute top-0 -z-10 h-full w-full opacity-30 dark:opacity-20">
            <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-400 blur-[120px]"></div>
          </div>
        </section>

        {/* Video Preview / App Interface Preview */}
        <section className="container mx-auto px-6 pb-24">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-zinc-200 bg-white p-4 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
            <div className="aspect-video w-full rounded-xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-950 flex items-center justify-center relative group">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-20 w-20 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform cursor-pointer">
                  <CirclePlay className="h-10 w-10 text-indigo-600 fill-indigo-600/20" />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6 hidden md:flex items-center justify-between rounded-lg bg-white/80 p-4 backdrop-blur-md dark:bg-zinc-900/80">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-md bg-zinc-200 dark:bg-zinc-700 animate-pulse"></div>
                  <div>
                    <p className="text-sm font-bold">Generating: "10 AI Facts"</p>
                    <p className="text-xs text-zinc-500">Processing transitions and captions...</p>
                  </div>
                </div>
                <div className="h-2 w-32 rounded-full bg-indigo-100 dark:bg-zinc-800 overflow-hidden">
                  <div className="h-full bg-indigo-600 w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-zinc-50 py-24 dark:bg-zinc-900/30">
          <div className="container mx-auto px-6">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Built for Growth & Efficiency</h2>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">Everything you need to scale your short-form content presence.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="border-none bg-white shadow-sm transition-all hover:shadow-md dark:bg-zinc-900">
                <CardContent className="pt-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-900/30">
                    <Zap className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">AI Video Generation</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">Automatically curate clips, add captions, and apply viral transitions with our advanced AI engine.</p>
                </CardContent>
              </Card>

              <Card className="border-none bg-white shadow-sm transition-all hover:shadow-md dark:bg-zinc-900">
                <CardContent className="pt-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-900/30">
                    <Calendar className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Auto-Scheduler</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">Schedule your videos weeks in advance. We automatically post to all your platforms at peak times.</p>
                </CardContent>
              </Card>

              <Card className="border-none bg-white shadow-sm transition-all hover:shadow-md dark:bg-zinc-900">
                <CardContent className="pt-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-900/30">
                    <BarChart3 className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Advanced Analytics</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">Track performance across all platforms in one place. See view counts, engagement, and conversion rates.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center gap-12 lg:flex-row">
              <div className="lg:w-1/2">
                <h2 className="mb-6 text-4xl font-bold">How it Works</h2>
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">1</div>
                    <div>
                      <h4 className="text-xl font-bold">Input Your Content</h4>
                      <p className="text-zinc-600 dark:text-zinc-400">Provide a topic, script, or long-form video link. Our AI analyzes and extracts the best moments.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">2</div>
                    <div>
                      <h4 className="text-xl font-bold">AI Generation</h4>
                      <p className="text-zinc-600 dark:text-zinc-400">Watch as the AI adds trendy subtitles, viral music, and seamless transitions to your shorts.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">3</div>
                    <div>
                      <h4 className="text-xl font-bold">Schedule & Relax</h4>
                      <p className="text-zinc-600 dark:text-zinc-400">Choose your platforms and post times. Our auto-scheduler handles the rest, 24/7.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="relative rounded-2xl bg-indigo-600 p-8 text-white shadow-xl">
                  <div className="mb-6 rounded-lg bg-white/10 p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="h-5 w-5" />
                      <span className="font-bold">Automated Schedule</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span>Mon, 10:00 AM</span>
                        <Badge variant="outline" className="text-white border-white/30 bg-green-500/20">Success</Badge>
                      </div>
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span>Tue, 06:30 PM</span>
                        <Badge variant="outline" className="text-white border-white/30 bg-indigo-500/20">Scheduled</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Wed, 09:00 AM</span>
                        <Badge variant="outline" className="text-white border-white/30 bg-indigo-500/20">Scheduled</Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-lg italic font-medium">"AIshorts-gen saved me over 20 hours a week on content creation and posting."</p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-indigo-400"></div>
                    <div>
                      <p className="font-bold">Alex Rivera</p>
                      <p className="text-xs text-indigo-200">Content Creator @ TechFlow</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-indigo-600 py-20 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="mb-6 text-4xl font-bold tracking-tight">Ready to Automate Your Shorts?</h2>
            <p className="mx-auto mb-10 max-w-2xl text-xl text-indigo-100">
              Join 10,000+ creators who are scaling their brand with AIshorts-gen. No credit card required to start.
            </p>
            <SignedOut>
              <SignUpButton mode="modal">
                <Button size="lg" variant="secondary" className="h-14 bg-white px-10 text-lg font-bold text-indigo-600 hover:bg-zinc-100">
                  Get Started for Free
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button size="lg" variant="secondary" className="h-14 bg-white px-10 text-lg font-bold text-indigo-600 hover:bg-zinc-100">
                  Go to Dashboard
                </Button>
              </Link>
            </SignedIn>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-zinc-50 py-12 dark:border-zinc-800 dark:bg-black">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
                  <Video className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight">AIshorts<span className="text-indigo-600">-gen</span></span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                The ultimate AI-powered short video generator and scheduler for modern creators.
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-zinc-400">Product</h4>
              <ul className="space-y-2 text-sm font-medium">
                <li><Link href="#features" className="hover:text-indigo-600">Features</Link></li>
                <li><Link href="#" className="hover:text-indigo-600">Video Styles</Link></li>
                <li><Link href="#" className="hover:text-indigo-600">Scheduler</Link></li>
                <li><Link href="#" className="hover:text-indigo-600">Templates</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-zinc-400">Support</h4>
              <ul className="space-y-2 text-sm font-medium">
                <li><Link href="#" className="hover:text-indigo-600">Documentation</Link></li>
                <li><Link href="#" className="hover:text-indigo-600">API Reference</Link></li>
                <li><Link href="#" className="hover:text-indigo-600">Blog</Link></li>
                <li><Link href="#" className="hover:text-indigo-600">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-zinc-400">Legal</h4>
              <ul className="space-y-2 text-sm font-medium">
                <li><Link href="#" className="hover:text-indigo-600">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-indigo-600">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-indigo-600">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between border-t border-zinc-200 pt-8 dark:border-zinc-800 md:flex-row">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">&copy; 2025 AIshorts-gen. All rights reserved.</p>
            <div className="mt-4 flex gap-6 md:mt-0">
              <Link href="#" className="text-zinc-400 hover:text-indigo-600 transition-colors"><Globe className="h-5 w-5" /></Link>
              <Link href="#" className="text-zinc-400 hover:text-indigo-600 transition-colors"><Instagram className="h-5 w-5" /></Link>
              <Link href="#" className="text-zinc-400 hover:text-indigo-600 transition-colors"><Youtube className="h-5 w-5" /></Link>
              <Link href="#" className="text-zinc-400 hover:text-indigo-600 transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
