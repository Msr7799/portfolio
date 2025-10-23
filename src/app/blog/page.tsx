"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { CalendarIcon, FileTextIcon, RocketIcon } from "@radix-ui/react-icons";
import { Code2, Sparkles, TrendingUp, Award } from "lucide-react";
import { cn } from "@/components/lib/utils";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Marquee } from "@/components/ui/marquee";
import NavbarHeader from "../components/Navbar";
import SocialSidebar from "../components/SocialSidebar";
import ContactModal from "../components/ContactModal";

const techImages = [
  { src: "/img/bg-img/1.gif", name: "Animation Tech", category: "UI/UX" },
  { src: "/img/bg-img/2.png", name: "Flutter", category: "Mobile Dev" },
  { src: "/img/bg-img/3.gif", name: "3D Graphics", category: "Design" },
  { src: "/img/bg-img/4.png", name: "TypeScript", category: "Development" },
  { src: "/img/bg-img/5.png", name: "CSS3", category: "Styling" },
  { src: "/img/bg-img/6.png", name: "GitHub", category: "Version Control" },
  { src: "/img/bg-img/7.png", name: "React", category: "Framework" },
  { src: "/img/bg-img/8.png", name: "Node.js", category: "Backend" },
  { src: "/img/bg-img/9.png", name: "Next.js", category: "Framework" },
  { src: "/img/bg-img/10.gif", name: "AI/ML", category: "Innovation" },
];

const blogPosts = [
  {
    id: 1,
    title: "Building Modern Web Apps",
    description: "Explore the latest technologies and best practices for creating stunning web applications.",
    date: "2025-01-15",
    image: "/img/bg-img/1.gif",
    category: "Development",
  },
  {
    id: 2,
    title: "UI/UX Design Trends 2025",
    description: "Discover the cutting-edge design patterns that are shaping the future of digital experiences.",
    date: "2024-01-10",
    image: "/img/bg-img/3.gif",
    category: "Design",
  },
  {
    id: 3,
    title: "TypeScript Best Practices",
    description: "Master TypeScript with advanced patterns and techniques for scalable applications.",
    date: "2024-01-05",
    image: "/img/bg-img/4.png",
    category: "Programming",
  },
];

const BlogPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Development", "Design", "Programming", "Mobile Dev"];

  const features = [
    {
      Icon: Code2,
      name: "Tech Stack Showcase",
      description: "Explore the technologies powering modern applications with interactive galleries.",
      href: "#tech-stack",
      cta: "View Gallery",
      className: "col-span-3 lg:col-span-2",
      background: (
        <Marquee
          pauseOnHover
          repeat={2}
          className="absolute top-10 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] [--duration:20s]"
        >
          {techImages.map((tech, idx) => (
            <figure
              key={idx}
              className={cn(
                "relative w-40 cursor-pointer overflow-hidden rounded-xl border p-4",
                "border-slate-800/50 bg-slate-900/50 hover:bg-slate-800/70",
                "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none hover:scale-110",
                "shadow-lg hover:shadow-primary-glow/50"
              )}
            >
              <div className="relative h-24 w-full mb-3">
                <Image
                  src={tech.src}
                  alt={tech.name}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <div className="text-center">
                <figcaption className="text-sm font-bold text-light">
                  {tech.name}
                </figcaption>
                <p className="text-xs text-primary-glow mt-1">{tech.category}</p>
              </div>
            </figure>
          ))}
        </Marquee>
      ),
    },
    {
      Icon: Sparkles,
      name: "Latest Blog Posts",
      description: "Stay updated with our latest articles on web development and design.",
      href: "#blog-posts",
      cta: "Read More",
      className: "col-span-3 lg:col-span-1",
      background: (
        <div className="absolute inset-0 flex flex-col gap-2 p-4 overflow-hidden">
          {blogPosts.slice(0, 2).map((post, idx) => (
            <div
              key={idx}
              className="relative h-32 rounded-lg overflow-hidden border border-slate-700/50 group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:border-primary-glow/50"
            >
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover opacity-60 group-hover:opacity-90 transition-opacity"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-3 flex flex-col justify-end">
                <h4 className="text-xs font-bold text-light truncate">{post.title}</h4>
                <p className="text-[10px] text-primary-glow">{post.category}</p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      Icon: TrendingUp,
      name: "Trending Technologies",
      description: "The most popular frameworks and tools in the developer community.",
      href: "#trending",
      cta: "Explore",
      className: "col-span-3 lg:col-span-1",
      background: (
        <div className="absolute inset-0 p-6">
          <div className="grid grid-cols-2 gap-3 h-full">
            {techImages.slice(0, 4).map((tech, idx) => (
              <div
                key={idx}
                className="relative rounded-lg overflow-hidden border border-slate-700/50 hover:border-primary-glow/50 transition-all duration-300 hover:scale-105 cursor-pointer group"
              >
                <Image
                  src={tech.src}
                  alt={tech.name}
                  fill
                  className="object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      Icon: Award,
      name: "Featured Projects",
      description: "Showcase of exceptional work built with cutting-edge technologies.",
      className: "col-span-3 lg:col-span-2",
      href: "#projects",
      cta: "View Projects",
      background: (
        <Marquee
          pauseOnHover
          reverse
          repeat={2}
          className="absolute top-10 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] [--duration:25s]"
        >
          {techImages.slice().reverse().map((tech, idx) => (
            <div
              key={idx}
              className="relative w-48 h-32 rounded-xl overflow-hidden border border-slate-700/50 cursor-pointer group hover:border-primary-glow/50 transition-all duration-300"
            >
              <Image
                src={tech.src}
                alt={tech.name}
                fill
                className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-sm font-bold text-light">{tech.name}</p>
                  <p className="text-xs text-primary-glow">{tech.category}</p>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      ),
    },
  ];

  return (
    <div className="bg-user-bg min-h-screen">
      {/* Logo */}
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
      <SocialSidebar onMessageClick={() => setIsModalOpen(true)} />

      {/* Hero Section */}
      <div className="container-custom pt-32 pb-16">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-primary-glow/30 mb-6 animate-fadeIn">
            <RocketIcon className="w-4 h-4 text-primary-glow animate-pulse" />
            <span className="text-sm text-primary-glow font-medium">Welcome to My Blog</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-hover via-primary-glow to-primary-hover bg-clip-text text-transparent animate-fadeIn">
            Tech & Innovation Hub
          </h1>
          
          <p className="text-lg md:text-xl text-light/80 mb-8 animate-fadeIn">
            Exploring the latest in web development, design, and cutting-edge technologies
          </p>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 animate-fadeIn">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  selectedCategory === category
                    ? "bg-primary-glow text-very-dark-bg shadow-lg shadow-primary-glow/50 scale-105"
                    : "bg-slate-900/50 text-light/70 hover:bg-slate-800/70 hover:text-light border border-slate-700/50"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <BentoGrid className="max-w-7xl mx-auto mb-16">
          {features.map((feature, idx) => (
            <BentoCard key={idx} {...feature} />
          ))}
        </BentoGrid>

        {/* Blog Posts Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <FileTextIcon className="w-6 h-6 text-primary-glow" />
            <h2 className="text-3xl font-bold text-light">Latest Articles</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="group relative glass-dark rounded-2xl overflow-hidden border border-slate/30 hover:border-primary-glow/50 transition-all duration-500 cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-primary-glow/20"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-very-dark-bg via-transparent to-transparent" />
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium bg-primary-glow/90 text-very-dark-bg backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-light/60 mb-3">
                    <CalendarIcon className="w-3 h-3" />
                    <time>{new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</time>
                  </div>

                  <h3 className="text-xl font-bold text-light mb-3 group-hover:text-primary-glow transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-light/70 text-sm leading-relaxed mb-4">
                    {post.description}
                  </p>

                  <button className="inline-flex items-center gap-2 text-primary-glow font-medium text-sm group-hover:gap-3 transition-all">
                    Read More
                    <span className="text-lg">→</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Interactive Tech Gallery */}
        <div className="mt-20 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-light mb-4">Technologies I Work With</h2>
            <p className="text-light/70">Hover over the technologies to explore</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {techImages.map((tech, idx) => (
              <div
                key={idx}
                className="group relative glass-dark rounded-2xl p-6 border border-slate/30 hover:border-primary-glow/50 transition-all duration-500 cursor-pointer hover:scale-110 hover:shadow-xl hover:shadow-primary-glow/30"
              >
                <div className="relative h-24 mb-4">
                  <Image
                    src={tech.src}
                    alt={tech.name}
                    fill
                    className="object-contain filter group-hover:drop-shadow-[0_0_15px_rgba(110,231,183,0.5)] transition-all duration-300"
                    unoptimized
                  />
                </div>
                <div className="text-center">
                  <h4 className="text-sm font-bold text-light group-hover:text-primary-glow transition-colors">
                    {tech.name}
                  </h4>
                  <p className="text-xs text-light/60 mt-1">{tech.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ContactModal 
          onClose={() => setIsModalOpen(false)} 
        />
      )}

      {/* Footer */}
      <footer className="glass-dark mt-20 py-8 border-t border-slate/30">
        <div className="container-custom text-center text-light/60 text-sm">
          <p>© 2024 Tech Blog. Built with Next.js & TypeScript 💚</p>
        </div>
      </footer>
    </div>
  );
};

export default BlogPage;
