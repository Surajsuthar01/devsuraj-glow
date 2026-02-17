import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const LeetCode = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-secondary font-mono text-sm tracking-widest uppercase mb-4">
            LeetCode
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Problem-solving profile, rank, and contest snapshot
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Username: surajsuthar01
          </p>
        </div>

        {/* Content Card */}
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center">
            {/* Left: Description */}
            <div className="flex-1 space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-foreground">
                Track my coding progress on LeetCode
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Live card includes solved questions, acceptance, global ranking, and contest
                highlights from my public profile.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Daily Problem Solving", "Contest Participation", "Algorithm Practice", "Data Structures Focus"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium rounded-full border border-border/60 text-muted-foreground bg-muted/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Button
                className="mt-4 bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all"
                asChild
              >
                <a
                  href="https://leetcode.com/u/Surajsuthar01/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open LeetCode Profile
                </a>
              </Button>
            </div>

            {/* Right: LeetCode Stats Card */}
            <div className="w-full md:w-auto flex-shrink-0">
              <img
                src="https://leetcard.jacoblin.cool/Surajsuthar01?theme=dark&font=JetBrains%20Mono&ext=contest"
                alt="LeetCode Stats for Surajsuthar01"
                className="rounded-xl border border-border/30 shadow-card w-full md:w-[320px]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeetCode;
