import { Button } from "@/components/ui/button";
import { ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react";
import earth from "@/assets/orbital-earth.jpg";

export default function Hero() {
  return <section id="hero" className="orbital-hero relative isolate overflow-hidden">
    <img src={earth} width={1920} height={1024} alt="Earth's illuminated horizon from orbit" className="orbital-image absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
    <div className="hero-shade absolute inset-0" />
    <div className="orbital-path orbital-path-one" aria-hidden="true" /><div className="orbital-path orbital-path-two" aria-hidden="true" />
    <div className="site-container relative z-10 flex h-full flex-col justify-center pb-24 pt-32">
      <p className="mb-7 flex items-center gap-3 text-xs font-mono text-hero-muted"><span className="h-1.5 w-1.5 rounded-full bg-primary" />DEVOPS ENGINEER · CLOUD & INFRASTRUCTURE</p>
      <h1 className="hero-name text-hero-foreground">Suraj<br /><span className="text-primary">Suthar.</span></h1>
      <p className="mt-6 max-w-lg text-xl font-medium text-hero-foreground sm:text-2xl">Engineering beyond the code.</p>
      <p className="mt-4 max-w-md text-base leading-relaxed text-hero-muted">I build resilient cloud infrastructure, automate the repetitive, and bring reliable deployments to life.</p>
      <div className="mt-8 flex flex-wrap gap-3"><Button asChild size="lg" className="h-12 px-6"><a href="#projects">Explore my work <ArrowUpRight /></a></Button><Button asChild variant="outline" size="lg" className="hero-outline h-12 px-6"><a href="/Suraj_Resume.pdf" download="Suraj_Suthar_Resume.pdf"><Download /> Download resume</a></Button></div>
      <div className="mt-7 flex flex-wrap gap-2">{[{label:"GitHub",icon:Github,href:"https://github.com/Surajsuthar01"},{label:"LinkedIn",icon:Linkedin,href:"https://www.linkedin.com/in/suraj-suthar-7a088a28b/"},{label:"Email me",icon:Mail,href:"mailto:surajsuthar0654@gmail.com"}].map(social => <Button key={social.label} asChild variant="outline" size="sm" className="hero-outline border-hero-foreground/20 bg-transparent text-hero-muted"><a href={social.href} target={social.href.startsWith("https") ? "_blank" : undefined} rel="noopener noreferrer"><social.icon />{social.label}</a></Button>)}</div>
      <div className="hero-coordinate hidden lg:block"><span className="text-primary">●</span> JAIPUR, INDIA<br /><span className="text-hero-muted">26.9124° N / 75.7873° E</span></div>
    </div>
    <div className="absolute inset-x-0 bottom-0 z-10 border-t border-hero-foreground/15"><div className="site-container flex flex-wrap items-center justify-between gap-3 py-5 text-xs text-hero-muted"><span>LINUX FOUNDATION. CLOUD MINDSET.</span><span className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-primary" />RHCSA CERTIFIED</span><span className="hidden sm:inline">AUTOMATE. OBSERVE. IMPROVE.</span></div></div>
  </section>;
}