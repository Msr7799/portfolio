"use client";

import { useState } from "react";

import Image from "next/image";
import NavbarHeader from "../components/Navbar";
import SocialSidebar from "../components/SocialSidebar";
import ContactModal from "../components/ContactModal";
import { Download, Mail, Phone } from "lucide-react";

export default function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const workExperience = [
    {
      title: "Officer of Bahrain Defence Force",
      period: "Aug 2007 - Feb 2019",
      location: "Bahrain (11 years)",
      responsibilities: [
        "Commander with leading education and prepared to lead",
        "Manager of Maintenance and Technical Support (3 years)",
        "Manager of warehouses for military clothes and equipment (5 years)"
      ]
    },
    {
      title: "Work Experience as Developer",
      period: "2019 - Present",
      responsibilities: [
        "Full-Stack Developer | Cybersecurity Technician",
        "Build advanced Next.js, TypeScript web sites and mobile apps",
        "Developed Atlas AI Flutter app",
        "Created custom API and Quran website",
        "Designed e-commerce platform with secure integration",
        "Completed Software Engineering Bootcamp"
      ]
    }
  ];

  const expertise = [
    "Cybersecurity & Network Security: Securing networks and protecting systems",
    "Full-Stack Development: Proficient in React, Next.js, TypeScript, Tailwind CSS, Python, Flask, and Flutter",
    "Database Management: Designing, managing, and optimizing databases",
    "Linux & PowerShell: System administration and process automation",
    "Leadership & Management: Former military officer (Captain) with strong leadership and team management skills",
    "Creativity & Problem-Solving: Innovative thinker with the ability to develop effective solutions",
    "AI Expert include fine-tuning using smart Algorithms and prompt Engineering",
    "UI design skills"
  ];

  const education = [
    {
      title: "Diploma in Military Sciences – Royal Military College of Isa",
      period: "2007 - 2010"
    },
    {
      title: "General Secondary School Certificate (Science) – East Riffa Secondary Boys School",
      period: "Sep 2005 - Jun 2007"
    },
    {
      title: "Cybersecurity Technician Procloud institute, Manama",
      period: "2024"
    },
    {
      title: "CybersecurityTechnician (CCT)",
      period: "2024"
    },
    {
      title: "Software Engineer Bootcamp",
      period: "2020 - present"
    },
    {
      title: "Listed and active as a developer on GitHub",
      period: "2020 - present"
    }
  ];

  const skills = [
    "Flexibility",
    "Effective communication",
    "Discipline",
    "Organizational",
    "Fast-learner",
    "Leadership",
    "Critical-thinker",
    "Team builder",
    "Machine learning",
    "Coding & UI designer",
    "Developer"
  ];

  const languages = ["Arabic", "English"];

  const deployments = [
    {
      title: "COLLACTIONS WEBSITE",
      url: "https://collactions.vercel.app"
    },
    {
      title: "QURAN DATA API",
      url: "https://msr-quran-data.vercel.app/"
    },
    {
      title: "QURAN WEBSITE",
      url: "https://msr-quran-app.vercel.app/"
    },
    {
      title: "ATLAS AI FLUTTER APP",
      url: "https://github.com/Msr7799/Atlas-AI/"
    }
  ];

  return (
    <div className="bg-user-bg">
      {/* Logo on the far left */}
      <div className="fixed -mt-20 left-8 z-40 animate-fadeIn">
        <Image
          src="/img/bg-img/Portfoloi.gif"
          alt="Portfolio Logo"
          width={32}
          height={110}
          className="hover:scale-105 duration-300 cursor-pointer"
          priority
        />
      </div>

      <NavbarHeader />
      <div className="gradient-background-overlay"></div>
      <SocialSidebar onMessageClick={() => setIsModalOpen(true)} />

      {/* Main Content */}
      <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Hero Section with Large GIF */}
          <div className="mb-16 text-center">
            {/* Large Animated Profile GIF */}
            <div className="relative inline-block mb-8 group">
              <div className="absolute -inset-8 bg-gradient-to-r from-primary-glow/30 via-primary-hover/40 to-primary-glow/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <Image
                src="/img/bg-img/about-me.gif"
                alt="Mohamed Saud Alromaihi"
                width={500}
                height={500}
                className="rounded-md w-[100vw] shadow-2xl relative z-10 border-8 border-slate/40 group-hover:border-primary-glow/60 transition-all duration-500 group-hover:scale-105"
                priority
              />
            </div>
            
            {/* Name and Title */}
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary-hover/50 via-primary-hover to-primary-hover/50 bg-clip-text text-transparent animate-fadeIn">
              MOHAMED SAUD ALROMAIHI
            </h1>
            <p className="text-2xl text-light/80 mb-6">
              Military Leader & Cybersecurity Technician | Full-Stack Developer
            </p>

            {/* Contact Info */}
            <div className="flex items-center justify-center space-x-8 mb-8">
              <div className="flex items-center space-x-2 text-light hover:text-primary-hover transition-colors">
                <Phone className="w-5 h-5" />
                <a href="tel:37925259" className="text-lg">37925259</a>
              </div>
              <div className="flex items-center space-x-2 text-light hover:text-primary-hover transition-colors">
                <Mail className="w-5 h-5" />
                <a href="mailto:alromaihi2224@gmail.com" className="text-lg">alromaihi2224@gmail.com</a>
              </div>
            </div>

            {/* Download CV Button */}
            <a
              href="/img/bg-img/CV-last.pdf"
              download="Mohamed_Saud_Alromaihi_CV.pdf"
              className="group relative inline-block"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-glow to-primary-hover rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <button className="relative px-12 py-5 bg-gradient-to-r from-very-dark-bg to-dark rounded-xl flex items-center space-x-3 hover:scale-105 transition-all duration-300">
                <Download className="w-7 h-7 text-light" />
                <span className="text-xl font-semibold text-light">Download CV (PDF)</span>
              </button>
            </a>
          </div>

          {/* About Me Section */}
          <div className="glass-dark rounded-3xl p-10 shadow-2xl border border-slate/30 hover:border-primary-glow/50 transition-all duration-500 mb-12">
            <h2 className="text-4xl font-bold text-light mb-8 pb-4 border-b-2 border-primary-glow/30">
              ABOUT ME
            </h2>
            <div className="space-y-6 text-light/90 text-xl leading-relaxed">
              <p>
                Experienced in network security and full-stack development using <span className="text-primary-hover font-semibold">HTML, CSS, JavaScript, React, Next.js, TypeScript, Tailwind CSS, Python, Flask, and Flutter</span>.
              </p>
              <p>
                Former officer with the rank of <span className="text-primary-hover font-semibold">Captain</span>, bringing strong leadership, discipline, and teamwork.
              </p>
              <p>
                Skilled in <span className="text-primary-hover font-semibold">Linux, PowerShell, and database management</span>, with a proven ability to deliver high-quality and efficient solutions.
              </p>
            </div>
          </div>

          {/* Two Column Layout for Education and CV Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            
            {/* Education Section */}
            <div className="glass-dark rounded-3xl p-8 shadow-2xl border border-slate/30 hover:border-primary-glow/50 transition-all duration-500">
              <h3 className="text-3xl font-bold text-light mb-6 pb-3 border-b-2 border-primary-glow/30">
                EDUCATION
              </h3>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="bg-very-dark-bg/50 rounded-xl p-5 border border-slate/20 hover:border-primary-glow/40 transition-all duration-300">
                    <h4 className="text-light font-semibold text-lg">{edu.title}</h4>
                    <p className="text-slate text-sm mt-2">{edu.period}</p>
                  </div>
                ))}
              </div>

              {/* Languages */}
              <div className="mt-10">
                <h3 className="text-2xl font-bold text-light mb-4 pb-3 border-b border-primary-glow/30">
                  LANGUAGES
                </h3>
                <div className="flex space-x-4">
                  {languages.map((lang, index) => (
                    <span key={index} className="px-8 py-3 bg-gradient-to-r from-primary-glow/20 to-primary-hover/20 rounded-full text-light font-semibold border border-slate/30 text-lg">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CV Preview */}
            <div className="glass-dark rounded-3xl p-8 shadow-2xl border border-slate/30 hover:border-primary-glow/50 transition-all duration-500">
              <h3 className="text-3xl font-bold text-light mb-6 pb-3 border-b-2 border-primary-glow/30">
                CV PREVIEW
              </h3>
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary-glow/20 to-primary-hover/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Image
                  src="/img/bg-img/CV.svg"
                  alt="CV Preview"
                  width={600}
                  height={849}
                  className="w-full rounded-xl shadow-2xl relative z-10 border-2 border-slate/30 group-hover:border-primary-glow/50 transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Work Experience */}
          <div className="glass-dark rounded-3xl p-10 shadow-2xl border border-slate/30 hover:border-primary-glow/50 transition-all duration-500 mb-12">
            <h2 className="text-4xl font-bold text-light mb-8 pb-4 border-b-2 border-primary-glow/30">
              WORK EXPERIENCE
            </h2>
            <div className="space-y-8">
              {workExperience.map((job, index) => (
                <div key={index} className="bg-very-dark-bg/50 rounded-xl p-8 border border-slate/20 hover:border-primary-glow/40 transition-all duration-300">
                  <h3 className="text-2xl font-bold text-primary-hover mb-3">{job.title}</h3>
                  <p className="text-slate mb-2 text-lg">{job.period}</p>
                  {job.location && <p className="text-slate mb-4 text-lg">{job.location}</p>}
                  <ul className="list-disc list-inside space-y-3 text-light/90 text-lg">
                    {job.responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Expertise */}
          <div className="glass-dark rounded-3xl p-10 shadow-2xl border border-slate/30 hover:border-primary-glow/50 transition-all duration-500 mb-12">
            <h2 className="text-4xl font-bold text-light mb-8 pb-4 border-b-2 border-primary-glow/30">
              EXPERTISE
            </h2>
            <ul className="space-y-4">
              {expertise.map((item, index) => (
                <li key={index} className="flex items-start space-x-4 text-light/90 text-xl">
                  <span className="text-primary-hover mt-1 text-2xl">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Skills Summary */}
          <div className="glass-dark rounded-3xl p-10 shadow-2xl border border-slate/30 hover:border-primary-glow/50 transition-all duration-500 mb-12">
            <h2 className="text-4xl font-bold text-light mb-8 pb-4 border-b-2 border-primary-glow/30">
              SKILL SUMMARY
            </h2>
            <div className="flex flex-wrap gap-4">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-6 py-3 bg-gradient-to-r from-very-dark-bg to-dark rounded-full text-light text-lg border border-slate/30 hover:border-primary-glow/50 hover:scale-105 transition-all duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Deployments */}
          <div className="glass-dark rounded-3xl p-10 shadow-2xl border border-slate/30 hover:border-primary-glow/50 transition-all duration-500">
            <h2 className="text-4xl font-bold text-light mb-8 pb-4 border-b-2 border-primary-glow/30">
              DEPLOYMENT
            </h2>
            <div className="space-y-6">
              <p className="text-light/90 text-xl mb-8">SOME OF MY WORK & WEBSITES:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {deployments.map((project, index) => (
                  <a
                    key={index}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary-glow/20 to-primary-hover/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                    <div className="relative bg-very-dark-bg/50 rounded-xl p-8 border border-slate/30 group-hover:border-primary-glow/50 transition-all duration-300">
                      <h3 className="text-light font-semibold text-xl group-hover:text-primary-hover transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-slate text-sm mt-3 truncate">{project.url}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {isModalOpen && <ContactModal onClose={() => setIsModalOpen(false)} />}

      <footer className="text-center py-6 text-md text-gray-600">
        <p>
          Copyright &copy;{new Date().getFullYear()} All rights reserved | Made with{" "}
          <i className="fa fa-heart-o" aria-hidden="true"></i> by Mohamed Saud Alromaihi
        </p>
      </footer>
    </div>
  );
}
