import { CardContent } from "@/components/ui/card";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Calendar, MapPin } from "lucide-react";


const education = [
  {
    institution: "Arya College of Engineering and IT",
    degree: "Bachelor of Technology - BTech, Computer Science",
    period: "2022 - 2026",
    location: "Jaipur, Rajasthan, India",
    status: "Current",
    description: "Pursuing B.Tech in Computer Science with focus on software engineering, data structures, algorithms, and modern development practices.",
    subjects: ["Data Structures & Algorithms", "Operating Systems", "Computer Networks", "Database Management", "Software Engineering", "Cloud Computing"]
  },
  {
    institution: "Govt. Senior Secondary School Karju Pratapgarh",
    degree: "Senior Secondary Education",
    period: "Completed 2022",
    location: "Pratapgarh, Rajasthan, India",
    grade: "80.80%",
    description: "Completed higher secondary education with strong performance in Science and Mathematics.",
    subjects: ["Physics", "Chemistry", "Mathematics", "Computer Science"]
  }
];

const Education = () => {
  return (
    <section className="py-12 md:py-20 relative">
      {/* Ambient glow */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/4 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Education
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            My academic background and educational qualifications.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          {education.map((edu, index) => (
            <GlowCard 
              key={edu.institution}
              className="group bg-card/40 backdrop-blur-md border-primary/10 animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-4 md:p-6 lg:p-8">
                <div className="grid lg:grid-cols-4 gap-4 md:gap-6">
                  {/* Institution Logo/Icon */}
                  <div className="lg:col-span-1 flex flex-col items-center lg:items-start">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:shadow-glow transition-all duration-300 mb-4">
                      <GraduationCap className="h-8 w-8 md:h-10 md:w-10 text-primary-foreground" />
                    </div>
                    {edu.status && (
                      <Badge variant="outline" className="border-primary text-primary text-xs">
                        {edu.status}
                      </Badge>
                    )}
                  </div>

                  {/* Education Details */}
                  <div className="lg:col-span-3 space-y-3 md:space-y-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                        {edu.institution}
                      </h3>
                      <h4 className="text-base md:text-lg font-semibold text-primary mb-2">
                        {edu.degree}
                      </h4>
                    </div>

                    {/* Period and Location */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-4 text-xs md:text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                        <span>{edu.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                        <span className="break-words">{edu.location}</span>
                      </div>
                      {edu.grade && (
                        <div className="font-medium text-primary">
                          Grade: {edu.grade}
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                      {edu.description}
                    </p>

                    {/* Key Subjects */}
                    <div className="space-y-2">
                      <p className="text-xs md:text-sm font-medium text-foreground">Key Subjects:</p>
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {edu.subjects.map((subject) => (
                          <Badge 
                            key={subject} 
                            variant="secondary" 
                            className="text-xs bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;