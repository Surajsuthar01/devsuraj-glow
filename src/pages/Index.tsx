import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import About from "@/components/About";
import Certifications from "@/components/Certifications";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import LeetCode from "@/components/LeetCode";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div id="hero"><Hero /></div>
      <div id="about"><About /></div>
      <div id="education"><Education /></div>
      <div id="tech-stack"><TechStack /></div>
      <div id="certifications"><Certifications /></div>
      <div id="leetcode"><LeetCode /></div>
      <div id="contact"><Contact /></div>
    </div>
  );
};

export default Index;
