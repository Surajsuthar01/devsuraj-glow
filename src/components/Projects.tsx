import { ArrowUpRight, Box, Cloud, GitBranch, Layers, Server, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/glow-card";
import SectionHeading from "./SectionHeading";

const projects = [
  { name: "From code to deployment.", category: "CI/CD & AUTOMATION", repo: "devops-ci-cd", description: "Exploring repeatable build and deployment workflows, connecting application development with DevOps automation.", tags: ["CI/CD", "Jenkins", "Docker"], type: "pipeline" },
  { name: "Infrastructure, defined.", category: "INFRASTRUCTURE AS CODE", repo: "terraform", description: "Version-controlled Terraform configurations for cloud infrastructure, built around an automation-first approach.", tags: ["Terraform", "Cloud", "IaC"], type: "cloud" },
  { name: "Built to run anywhere.", category: "CONTAINERIZED APPLICATION", repo: "simple-docker-flask-app", description: "A Flask application packaged with Docker, bringing application code and its runtime into one portable environment.", tags: ["Python", "Flask", "Docker"], type: "container" },
];

function ProjectVisual({ type }: { type: string }) {
  return <div className={`project-visual visual-${type}`} aria-hidden="true">
    <div className="diagram-grid" />
    {type === "pipeline" ? <div className="pipeline-diagram">{[{icon:GitBranch,label:"COMMIT"},{icon:Workflow,label:"BUILD"},{icon:Box,label:"PACKAGE"},{icon:Server,label:"DEPLOY"}].map((step,i) => <div className="pipeline-step" key={step.label}><div className="diagram-node"><step.icon /></div><span>{step.label}</span>{i<3 && <div className="pipeline-connector" />}</div>)}</div>
    : type === "cloud" ? <div className="cloud-diagram"><div className="cloud-node"><Cloud /><span>CLOUD INFRASTRUCTURE</span></div><div className="cloud-branches">{["COMPUTE","NETWORK","STORAGE"].map(label => <div className="diagram-node" key={label}><Server /><span>{label}</span></div>)}</div></div>
    : <div className="container-diagram"><div className="container-layer"><Layers /><span>APPLICATION</span><span className="text-primary">Flask</span></div><div className="container-layer"><Box /><span>CONTAINER</span><span className="text-primary">Docker</span></div><div className="container-layer"><Server /><span>RUNTIME</span><span className="text-primary">Linux</span></div></div>}
    <span className="visual-caption">{type === "pipeline" ? "01 — DELIVERY WORKFLOW" : type === "cloud" ? "02 — CLOUD ARCHITECTURE" : "03 — APPLICATION STACK"}</span>
  </div>;
}

export default function Projects() {
  return <section id="projects" className="section-band"><div className="site-container"><SectionHeading number="01" label="SELECTED WORK" title="Built. Automated. Deployed."><Button asChild variant="link" className="px-0 text-foreground"><a href="https://github.com/Surajsuthar01?tab=repositories" target="_blank" rel="noopener noreferrer">All repositories <ArrowUpRight /></a></Button></SectionHeading><div className="grid gap-6 lg:grid-cols-3">{projects.map(project => <GlowCard key={project.repo} className="project-card group"><a className="block h-full" href={`https://github.com/Surajsuthar01/${project.repo}`} target="_blank" rel="noopener noreferrer"><ProjectVisual type={project.type} /><div className="p-6"><p className="mb-4 text-xs font-mono text-primary">{project.category}</p><h3 className="mb-3 flex items-start justify-between gap-3 text-xl font-semibold">{project.name}<ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></h3><p className="min-h-24 text-sm leading-relaxed text-muted-foreground">{project.description}</p><div className="mt-5 flex flex-wrap gap-3 border-t border-border pt-5">{project.tags.map(tag => <span key={tag} className="text-xs text-muted-foreground">{tag}</span>)}</div></div></a></GlowCard>)}</div><div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground"><span>More from the workbench</span>{["k8s", "django-Notes-App", "Voting-app", "bash_scripting"].map(repo => <a key={repo} href={`https://github.com/Surajsuthar01/${repo}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary">{repo}<ArrowUpRight className="h-3 w-3" /></a>)}</div></div></section>;
}