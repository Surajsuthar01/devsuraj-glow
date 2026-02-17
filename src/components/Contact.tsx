import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Copy } from "lucide-react";
import { GlowCard } from "@/components/ui/glow-card";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();

  const copyEmail = () => {
    navigator.clipboard.writeText("surajsuthar0654@gmail.com");
    toast({ title: "Email copied to clipboard!" });
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <GlowCard className="bg-card/40 backdrop-blur-md border-primary/10 p-8 md:p-12 rounded-2xl">
            <div className="flex flex-col lg:flex-row gap-10 items-start">
              {/* Left side */}
              <div className="flex-1 space-y-6">
                <div>
                  <p className="text-secondary font-mono text-sm tracking-widest uppercase mb-3">
                    Contact
                  </p>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                    Let us build the next deployment-ready product
                  </h2>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Email:</span>
                    <a
                      href="mailto:surajsuthar0654@gmail.com"
                      className="text-sm text-foreground underline underline-offset-4 hover:text-secondary transition-colors"
                    >
                      surajsuthar0654@gmail.com
                    </a>
                    <button
                      onClick={copyEmail}
                      className="ml-2 px-3 py-1 text-xs rounded-full border border-border/60 text-muted-foreground hover:text-foreground hover:border-secondary/40 transition-all flex items-center gap-1"
                    >
                      <Copy className="h-3 w-3" />
                      Copy Email
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Phone:</span>
                    <span className="text-sm text-foreground">+91 6350692701</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Location:</span>
                    <span className="text-sm text-foreground">Jaipur, Rajasthan, India</span>
                  </div>
                </div>
              </div>

              {/* Right side: Action buttons */}
              <div className="flex flex-col gap-3 w-full lg:w-auto min-w-[180px]">
                <Button
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full px-8 py-5 text-sm font-medium"
                  asChild
                >
                  <a href="mailto:surajsuthar0654@gmail.com">Email Me</a>
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full px-8 py-5 text-sm font-medium border-border/60 hover:border-secondary/40 hover:text-secondary"
                  asChild
                >
                  <a
                    href="https://www.linkedin.com/in/suraj-suthar-7a088a28b/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full px-8 py-5 text-sm font-medium border-border/60 hover:border-secondary/40 hover:text-secondary"
                  asChild
                >
                  <a
                    href="https://github.com/Surajsuthar01"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full px-8 py-5 text-sm font-medium border-border/60 hover:border-secondary/40 hover:text-secondary"
                  asChild
                >
                  <a href="/Suraj_Resume.pdf" download="Suraj_Suthar_Resume.pdf">
                    Resume PDF
                  </a>
                </Button>
              </div>
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  );
};

export default Contact;
