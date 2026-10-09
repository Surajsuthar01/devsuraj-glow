import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "tech-stack", label: "Expertise" },
  { id: "certifications", label: "Credentials" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);
  return (
    <header className={`portfolio-nav fixed inset-x-0 top-0 z-50 border-b transition-colors ${scrolled || open ? "border-border bg-background/95 backdrop-blur-xl" : "border-foreground/10 bg-transparent"}`}>
      <nav aria-label="Main navigation" className="site-container flex h-20 items-center justify-between gap-4">
        <a href="#hero" className="flex items-center gap-2 text-foreground" onClick={() => setOpen(false)}><span className="brand-mark">s.</span><span className="text-sm font-semibold">suraj suthar<span className="text-primary">.</span></span></a>
        <div className="hidden items-center gap-7 lg:flex">{links.map(link => <a key={link.id} href={`#${link.id}`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{link.label}</a>)}</div>
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="icon" aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`} onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} className="text-muted-foreground">{resolvedTheme === "dark" ? <Sun /> : <Moon />}</Button>
          <Button asChild variant="outline" className="hidden border-foreground/25 bg-transparent sm:inline-flex"><a href="#contact">Let's talk <ArrowUpRight /></a></Button>
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(value => !value)}>{open ? <X /> : <Menu />}</Button>
        </div>
      </nav>
      {open && <nav id="mobile-navigation" aria-label="Mobile navigation" className="site-container flex flex-col gap-1 border-t border-border py-5 lg:hidden">{[...links, {id:"education",label:"Education"}, {id:"contact",label:"Contact"}].map(link => <a className="py-3 text-lg text-foreground" href={`#${link.id}`} key={link.id} onClick={() => setOpen(false)}>{link.label}</a>)}<a href="/Suraj_Resume.pdf" download className="py-3 text-primary">Download resume <ArrowUpRight className="inline h-4 w-4" /></a></nav>}
    </header>
  );
}