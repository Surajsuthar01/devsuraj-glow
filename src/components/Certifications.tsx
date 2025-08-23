import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ExternalLink, Award } from "lucide-react";

const certifications = [
  {
    title: "Red Hat Certified System Administrator (RHCSA)",
    issuer: "Red Hat",
    date: "May 17, 2024 - May 17, 2027",
    credentialId: "240-067-413",
    description: "Validated expertise in essential Red Hat Enterprise Linux system administration tasks.",
    skills: ["System Configuration", "Security", "File Systems", "User Management", "Service Management"],
    link: "https://www.credly.com/users/suraj-suthar.34931b98"
  },
  {
    title: "Oracle Certified Foundations Associate",
    issuer: "Oracle Corporation",
    date: "March 25, 2025",
    description: "Oracle Fusion Cloud Applications HCM Certified Foundations Associate. Recognized by Oracle Corporation as Oracle Certified professional.",
    skills: ["Oracle Cloud", "HCM Applications", "Cloud Foundations"]
  }
];

const awsCertifications = [
  {
    title: "AWS Educate Introduction to Cloud 101",
    issuer: "Amazon Web Services (AWS)",
    date: "March 2025",
    description: "Foundational knowledge of cloud computing concepts, services, and AWS infrastructure.",
    skills: ["Cloud Fundamentals", "AWS Services", "Cloud Architecture", "Security"]
  },
  {
    title: "AWS Educate Getting Started with Cloud Ops",
    issuer: "Amazon Web Services (AWS)",
    date: "March 2025",
    description: "Skills in managing and operating cloud infrastructure and services on AWS.",
    skills: ["Cloud Operations", "Monitoring", "Automation", "Best Practices"]
  },
  {
    title: "AWS Educate Getting Started with Compute",
    issuer: "Amazon Web Services (AWS)",
    date: "March 2025",
    description: "Expertise in AWS compute services including EC2, Lambda, and containerization.",
    skills: ["EC2", "Lambda", "Auto Scaling", "Elastic Beanstalk"]
  },
  {
    title: "AWS Educate Getting Started with Storage",
    issuer: "Amazon Web Services (AWS)",
    date: "March 2025",
    description: "Knowledge of AWS storage solutions and data management strategies.",
    skills: ["S3", "EBS", "EFS", "Storage Gateway"]
  },
  {
    title: "AWS Educate Getting Started with Databases",
    issuer: "Amazon Web Services (AWS)",
    date: "March 2025",
    description: "Proficiency in AWS database services and database management.",
    skills: ["RDS", "DynamoDB", "ElastiCache", "Aurora"]
  }
];

const Certifications = () => {
  return (
    <section className="py-20 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/3 to-secondary/3"></div>
      </div>
      
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Certifications & Credentials
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional credentials that validate my expertise and technical knowledge.
          </p>
        </div>
        
        {/* Major Certifications */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center">Professional Certifications</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {certifications.map((cert, index) => (
              <Card 
                key={cert.title}
                className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 bg-gradient-card border-primary/10 animate-slide-up overflow-hidden"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Certification Header */}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
                          <Award className="h-8 w-8 text-primary-foreground" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                          {cert.title}
                        </h4>
                        <p className="text-primary font-medium">{cert.issuer}</p>
                      </div>
                    </div>
                    
                    {/* Date and Credential */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{cert.date}</span>
                    </div>
                    
                    {cert.credentialId && (
                      <div className="text-sm">
                        <span className="text-muted-foreground">Credential ID: </span>
                        <span className="font-mono text-primary">{cert.credentialId}</span>
                      </div>
                    )}
                    
                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {cert.description}
                    </p>
                    
                    {/* Skills */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">Key Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {cert.skills.map((skill) => (
                          <Badge 
                            key={skill} 
                            variant="secondary" 
                            className="text-xs bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {/* View Certificate Link */}
                    {cert.link && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground group-hover:shadow-elegant transition-all duration-300"
                        asChild
                      >
                        <a href={cert.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View on Credly
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* AWS Educate Certifications */}
        <div>
          <h3 className="text-2xl font-bold mb-8 text-center">AWS Educate Certifications</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {awsCertifications.map((cert, index) => (
              <Card 
                key={cert.title}
                className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-primary/10 animate-bounce-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
                        <Award className="h-5 w-5 text-secondary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm leading-tight">
                          {cert.title}
                        </h4>
                      </div>
                    </div>
                    
                    <p className="text-secondary font-medium text-sm">{cert.issuer}</p>
                    
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{cert.date}</span>
                    </div>
                    
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {cert.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.map((skill) => (
                        <Badge 
                          key={skill} 
                          variant="outline" 
                          className="text-xs border-secondary/30 text-secondary hover:bg-secondary hover:text-secondary-foreground transition-colors"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Credly Profile Link */}
        <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '1s' }}>
          <Button 
            size="lg" 
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
            asChild
          >
            <a href="https://www.credly.com/users/suraj-suthar.34931b98" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Complete Certification Profile on Credly
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Certifications;