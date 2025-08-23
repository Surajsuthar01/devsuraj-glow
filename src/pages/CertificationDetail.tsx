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