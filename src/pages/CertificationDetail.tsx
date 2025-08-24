import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, ExternalLink, Award, CheckCircle, Target, BookOpen } from "lucide-react";

const certificationData = {
  "rhcsa": {
    title: "Red Hat Certified System Administrator (RHCSA)",
    issuer: "Red Hat",
    date: "May 17, 2024 - May 17, 2027",
    credentialId: "240-067-413",
    description: "The Red Hat Certified System Administrator (RHCSA) certification validates the skills and knowledge required to perform essential Red Hat Enterprise Linux system administration tasks.",
    fullDescription: "This certification demonstrates competency in areas such as understanding and using essential tools for handling files, directories, command-line environments, and documentation. It validates skills in operating running systems, including booting into different run levels, identifying processes, starting and stopping virtual machines, and controlling services.",
    skills: ["System Configuration", "Security", "File Systems", "User Management", "Service Management", "Networking", "Storage Management", "Troubleshooting"],
    objectives: [
      "Configure local storage using partitions and logical volumes",
      "Create and configure file systems and file system attributes",
      "Deploy, configure, and maintain systems",
      "Manage users and groups",
      "Manage security including basic firewall and SELinux configuration",
      "Perform basic container management",
      "Manage basic networking",
      "Create simple shell scripts"
    ],
    industryValue: "RHCSA is one of the most respected Linux certifications in the industry. It's particularly valuable for DevOps engineers, system administrators, and cloud engineers working with enterprise Linux environments.",
    link: "https://www.credly.com/users/suraj-suthar.34931b98"
  },
  "oracle": {
    title: "Oracle Certified Foundations Associate",
    issuer: "Oracle Corporation",
    date: "March 25, 2025",
    description: "Oracle Fusion Cloud Applications HCM Certified Foundations Associate. Recognized by Oracle Corporation as Oracle Certified professional.",
    fullDescription: "This certification validates foundational knowledge of Oracle Cloud Infrastructure and Oracle Fusion Cloud Applications, specifically in Human Capital Management (HCM). It demonstrates understanding of cloud concepts, Oracle's cloud services, and the ability to work with Oracle's enterprise applications.",
    skills: ["Oracle Cloud", "HCM Applications", "Cloud Foundations", "Enterprise Applications", "Cloud Architecture"],
    objectives: [
      "Understand Oracle Cloud Infrastructure basics",
      "Navigate Oracle Fusion Cloud Applications",
      "Configure HCM modules and features",
      "Implement basic security and access controls",
      "Manage user interfaces and reporting",
      "Understand integration capabilities"
    ],
    industryValue: "Oracle certifications are highly valued in enterprise environments, especially in organizations using Oracle's cloud solutions for HR, finance, and other business applications."
  },
  "kodekloud-docker": {
    title: "Docker Training Course for the Absolute Beginner",
    issuer: "KodeKloud",
    date: "June 04, 2025",
    credentialId: "5899481-b31c-4217-b3fd-1db742087f0d",
    description: "Comprehensive Docker containerization training covering fundamentals to advanced concepts. Mastered container creation, image management, networking, and orchestration.",
    fullDescription: "This intensive Docker training program covers everything from basic containerization concepts to advanced Docker features. The course includes hands-on labs, real-world scenarios, and practical exercises that prepare professionals for container-based development and deployment in production environments.",
    skills: ["Docker Containers", "Image Management", "Docker Compose", "Container Networking", "Volume Management", "Dockerfile Creation", "Container Security"],
    objectives: [
      "Understand containerization concepts and Docker architecture",
      "Create and manage Docker containers effectively",
      "Build custom Docker images using Dockerfiles",
      "Implement container networking and communication",
      "Use Docker Compose for multi-container applications",
      "Manage persistent data with Docker volumes",
      "Apply container security best practices",
      "Troubleshoot common Docker issues"
    ],
    industryValue: "Docker skills are essential in modern DevOps environments. This certification demonstrates practical ability to work with containerization, which is fundamental to microservices architecture, CI/CD pipelines, and cloud-native development."
  },
  "hackerrank-sql": {
    title: "SQL (Basic) Certificate",
    issuer: "HackerRank",
    date: "June 18, 2025",
    credentialId: "8BCCB7FAAEE7",
    description: "Demonstrated proficiency in fundamental SQL concepts including querying, data manipulation, and database operations through hands-on assessments.",
    fullDescription: "This certification validates core SQL skills through practical, hands-on assessments. It covers essential database operations, query optimization, and data manipulation techniques that are crucial for backend development, data analysis, and DevOps automation tasks.",
    skills: ["SQL Queries", "Data Manipulation", "Database Operations", "JOIN Operations", "Data Analysis", "Query Optimization", "Data Filtering"],
    objectives: [
      "Write efficient SELECT queries with filtering and sorting",
      "Perform complex JOIN operations across multiple tables",
      "Use aggregate functions and GROUP BY clauses effectively",
      "Implement data manipulation with INSERT, UPDATE, DELETE",
      "Apply subqueries and nested query techniques",
      "Understand database constraints and relationships",
      "Optimize query performance and execution",
      "Handle data types and conversions properly"
    ],
    industryValue: "SQL proficiency is fundamental for DevOps engineers working with databases, data pipelines, and automation scripts. This certification demonstrates ability to work with data effectively in various technical roles."
  },
  "techforce-cybersecurity": {
    title: "Advanced Cyber Security with Internship",
    issuer: "TechForce Academy",
    date: "May 26, 2025 - July 10, 2025",
    credentialId: "uk8+xf",
    description: "Comprehensive cybersecurity training program with practical internship experience. Covered advanced security concepts, threat analysis, and hands-on security implementations.",
    fullDescription: "This intensive cybersecurity program combines theoretical knowledge with practical internship experience. The curriculum covers advanced security concepts, threat detection and analysis, incident response, and hands-on implementation of security measures in real-world scenarios.",
    skills: ["Cybersecurity Fundamentals", "Threat Analysis", "Security Implementation", "Risk Assessment", "Incident Response", "Network Security", "Vulnerability Assessment"],
    objectives: [
      "Identify and analyze various cybersecurity threats",
      "Implement comprehensive security measures and controls",
      "Conduct thorough risk assessments and vulnerability scans",
      "Develop incident response procedures and protocols",
      "Apply network security principles and configurations",
      "Use security tools for monitoring and detection",
      "Create security policies and compliance frameworks",
      "Perform penetration testing and security audits"
    ],
    industryValue: "Cybersecurity skills are critical in today's digital landscape. This certification with internship experience demonstrates practical ability to protect infrastructure and applications, making it highly valuable for DevOps and security-focused roles."
  }
};

const CertificationDetail = () => {
  const { id } = useParams();
  const cert = certificationData[id as keyof typeof certificationData];

  if (!cert) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Certification Not Found</h1>
          <Link to="/">
            <Button>Go Back Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary-glow transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-2xl mb-6 shadow-glow">
            <Award className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            {cert.title}
          </h1>
          <p className="text-xl text-primary font-semibold">{cert.issuer}</p>
          <div className="flex items-center justify-center gap-2 mt-4 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{cert.date}</span>
          </div>
          {'credentialId' in cert && (
            <div className="mt-2">
              <span className="text-muted-foreground">Credential ID: </span>
              <span className="font-mono text-primary">{cert.credentialId}</span>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card className="bg-gradient-card border-primary/20 animate-slide-up">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-primary" />
                  Overview
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {cert.description}
                </p>
                <p className="text-foreground leading-relaxed">
                  {cert.fullDescription}
                </p>
              </CardContent>
            </Card>

            {/* Learning Objectives */}
            <Card className="bg-gradient-card border-primary/20 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Target className="h-6 w-6 text-primary" />
                  Key Learning Objectives
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {cert.objectives.map((objective, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{objective}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Industry Value */}
            <Card className="bg-gradient-card border-primary/20 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Industry Value & Impact</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {cert.industryValue}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Skills */}
            <Card className="bg-gradient-card border-primary/20 animate-slide-in-right">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Core Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="secondary" 
                      className="bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action */}
            {'link' in cert && (
              <Card className="bg-gradient-card border-primary/20 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Verify Certification</h3>
                  <Button 
                    className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                    asChild
                  >
                    <a href={cert.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View on Credly
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationDetail;