import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ExternalLink, Award, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";


const certifications = [
  {
    id: "rhcsa",
    title: "Red Hat Certified System Administrator (RHCSA)",
    issuer: "Red Hat",
    date: "May 17, 2024 - May 17, 2027",
    credentialId: "240-067-413",
    description: "Validated expertise in essential Red Hat Enterprise Linux system administration tasks.",
    skills: ["System Configuration", "Security", "File Systems", "User Management", "Service Management"],
    link: "https://www.credly.com/users/suraj-suthar.34931b98"
  },
  {
    id: "oracle",
    title: "Oracle Certified Foundations Associate",
    issuer: "Oracle Corporation",
    date: "March 25, 2025",
    description: "Oracle Fusion Cloud Applications HCM Certified Foundations Associate. Recognized by Oracle Corporation as Oracle Certified professional.",
    skills: ["Oracle Cloud", "HCM Applications", "Cloud Foundations"]
  },
  {
    id: "kodekloud-docker",
    title: "Docker Training Course for the Absolute Beginner",
    issuer: "KodeKloud",
    date: "June 04, 2025",
    credentialId: "5899481-b31c-4217-b3fd-1db742087f0d",
    description: "Comprehensive Docker containerization training covering fundamentals to advanced concepts. Mastered container creation, image management, networking, and orchestration.",
    skills: ["Docker Containers", "Image Management", "Docker Compose", "Container Networking", "Volume Management"]
  },
  {
    id: "hackerrank-sql",
    title: "SQL (Basic) Certificate",
    issuer: "HackerRank",
    date: "June 18, 2025",
    credentialId: "8BCCB7FAAEE7",
    description: "Demonstrated proficiency in fundamental SQL concepts including querying, data manipulation, and database operations through hands-on assessments.",
    skills: ["SQL Queries", "Data Manipulation", "Database Operations", "JOIN Operations", "Data Analysis"]
  },
  {
    id: "techforce-cybersecurity",
    title: "Advanced Cyber Security with Internship",
    issuer: "TechForce Academy",
    date: "May 26, 2025 - July 10, 2025",
    credentialId: "uk8+xf",
    description: "Comprehensive cybersecurity training program with practical internship experience. Covered advanced security concepts, threat analysis, and hands-on security implementations.",
    skills: ["Cybersecurity Fundamentals", "Threat Analysis", "Security Implementation", "Risk Assessment", "Incident Response"]
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
    <section className="py-12 md:py-20 relative">
      {/* Background Pattern with floating logos */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/3 to-secondary/3"></div>
      </div>
      
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Certifications & Credentials
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional credentials that validate my expertise and technical knowledge.
          </p>
        </div>
        
        {/* Major Certifications */}
        <div className="mb-12 md:mb-16">
          <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-center">Professional Certifications</h3>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {certifications.map((cert, index) => (
              <Card 
                key={cert.id}
                className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 bg-gradient-card border-primary/10 animate-slide-up overflow-hidden cursor-pointer"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <Link to={`/certification/${cert.id}`}>
                  <CardContent className="p-4 md:p-6">
                    <div className="space-y-4">
                      {/* Certification Header */}
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
                            <Award className="h-6 w-6 md:h-8 md:w-8 text-primary-foreground" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg md:text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2 leading-tight">
                            {cert.title}
                          </h4>
                          <p className="text-primary font-medium text-sm md:text-base">{cert.issuer}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0" />
                      </div>
                      
                      {/* Date and Credential */}
                      <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                        <span className="truncate">{cert.date}</span>
                      </div>
                      
                      {cert.credentialId && (
                        <div className="text-xs md:text-sm">
                          <span className="text-muted-foreground">Credential ID: </span>
                          <span className="font-mono text-primary break-all">{cert.credentialId}</span>
                        </div>
                      )}
                      
                      {/* Description */}
                      <p className="text-muted-foreground text-xs md:text-sm leading-relaxed line-clamp-3">
                        {cert.description}
                      </p>
                      
                      {/* Skills */}
                      <div className="space-y-2">
                        <p className="text-xs md:text-sm font-medium text-foreground">Key Skills:</p>
                        <div className="flex flex-wrap gap-1 md:gap-2">
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
                      
                      <div className="pt-2 border-t border-border/50">
                        <p className="text-xs text-muted-foreground">Click to view detailed information</p>
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
        
        {/* AWS Educate Certifications */}
        <div>
          <h3 className="text-2xl font-bold mb-8 text-center">AWS Educate Certifications</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {awsCertifications.map((cert, index) => (
            <Card 
              key={cert.title}
              className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-primary/10 animate-bounce-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-4 md:p-6">
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
                        <Award className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm leading-tight truncate">
                          {cert.title}
                        </h4>
                      </div>
                    </div>
                    
                    <p className="text-primary font-medium text-sm">{cert.issuer}</p>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 flex-shrink-0" />
                    <span>{cert.date}</span>
                  </div>
                  
                  <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3">
                    {cert.description}
                  </p>
                  
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.map((skill) => (
                        <Badge 
                          key={skill} 
                          variant="outline" 
                          className="text-xs border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
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