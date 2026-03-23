"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getAllPosts, categories } from "@/lib/blog";

export default function BlogPage() {
    const allPosts = getAllPosts();
    const [activeCategory, setActiveCategory] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPosts = allPosts.filter((post) => {
        const matchesCategory = activeCategory === "All" || post.category === activeCategory;
        const matchesSearch =
            searchQuery === "" ||
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const featuredPost = filteredPosts.find((p) => p.featured);
    const regularPosts = filteredPosts.filter((p) => !p.featured);

    return (
        <>
            {/* Hero */}
            <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 relative overflow-hidden">
                {/* Ambient background */}
                <div
                    className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.04]"
                    style={{ background: "var(--gradient-gold)", filter: "blur(140px)" }}
                />
                <div className="section-container relative z-10">
                    <motion.div
                        className="max-w-3xl"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <span className="section-label">Nerd News</span>
                        <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-semibold mt-4 mb-6">
                            Insights for <span className="gradient-text">Smart Growth</span>
                        </h1>
                        <p className="text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                            Practical strategies for AI automation, marketing operations, and building
                            systems that scale. No fluff. Just what works.
                        </p>
                    </motion.div>

                    {/* Search bar */}
                    <motion.div
                        className="mt-10 max-w-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="relative">
                            <Search
                                size={18}
                                className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                            />
                            <input
                                id="blog-search"
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-white placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--gold-500)] transition-colors"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Categories */}
            <section className="pb-10">
                <div className="section-container">
                    <motion.div
                        className="flex flex-wrap gap-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                    >
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                id={`category-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                                    activeCategory === cat
                                        ? "bg-[var(--gold-500)] text-[var(--bg-base)] shadow-[0_4px_20px_rgba(212,164,24,0.35)]"
                                        : "bg-[var(--glass-bg)] text-[var(--text-secondary)] hover:text-white border border-[var(--glass-border)] hover:border-[var(--glass-border-hover)]"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Featured Post */}
            <AnimatePresence mode="wait">
                {featuredPost && (
                    <motion.section
                        key="featured"
                        className="pb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="section-container">
                            <Link
                                href={`/blog/${featuredPost.slug}`}
                                id="featured-post"
                                className="glass-card rounded-3xl p-8 lg:p-12 block group relative overflow-hidden"
                            >
                                {/* Glow accent */}
                                <div
                                    className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-[0.06] transition-opacity duration-500 group-hover:opacity-[0.12]"
                                    style={{ background: "var(--gradient-gold)", filter: "blur(80px)" }}
                                />
                                <div className="relative z-10 flex flex-col lg:flex-row gap-8">
                                    <div className="lg:w-2/3">
                                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[var(--gold-500)]/10 text-[var(--gold-400)] border border-[var(--gold-500)]/20 mb-4">
                                            Featured · {featuredPost.category}
                                        </span>
                                        <h2 className="text-2xl lg:text-3xl font-semibold mb-4 group-hover:text-[var(--gold-400)] transition-colors">
                                            {featuredPost.title}
                                        </h2>
                                        <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                                            {featuredPost.excerpt}
                                        </p>
                                        <div className="flex items-center gap-6 text-sm text-[var(--text-muted)]">
                                            <span className="flex items-center gap-2">
                                                <Calendar size={14} />
                                                {new Date(featuredPost.date).toLocaleDateString("en-US", {
                                                    month: "long",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <Clock size={14} />
                                                {featuredPost.readTime}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="lg:w-1/3 flex items-center justify-end">
                                        <span className="text-[var(--gold-400)] flex items-center gap-2 group-hover:gap-4 transition-all text-sm font-medium uppercase tracking-wider">
                                            Read article <ArrowUpRight size={20} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* Posts Grid */}
            <section className="pb-24 lg:pb-32">
                <div className="section-container">
                    <AnimatePresence mode="wait">
                        {filteredPosts.length === 0 ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center py-20"
                            >
                                <p className="text-[var(--text-muted)] text-lg">No articles found.</p>
                                <button
                                    onClick={() => {
                                        setActiveCategory("All");
                                        setSearchQuery("");
                                    }}
                                    className="mt-4 text-[var(--gold-400)] hover:text-[var(--gold-500)] transition-colors text-sm font-medium cursor-pointer"
                                >
                                    Clear filters
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key={activeCategory + searchQuery}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {regularPosts.map((post, idx) => (
                                    <motion.div
                                        key={post.slug}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.4,
                                            delay: idx * 0.08,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                    >
                                        <Link
                                            href={`/blog/${post.slug}`}
                                            id={`post-${post.slug}`}
                                            className="glass-card rounded-2xl p-6 group flex flex-col h-full relative overflow-hidden"
                                        >
                                            {/* Hover glow */}
                                            <div
                                                className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500"
                                                style={{ background: "var(--gradient-gold)", filter: "blur(60px)" }}
                                            />
                                            <div className="relative z-10 flex flex-col h-full">
                                                <span className="inline-block self-start px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider text-[var(--gold-400)] bg-[var(--gold-500)]/8 border border-[var(--gold-500)]/15 mb-3">
                                                    {post.category}
                                                </span>
                                                <h3 className="text-lg font-semibold mb-3 group-hover:text-[var(--gold-400)] transition-colors line-clamp-2">
                                                    {post.title}
                                                </h3>
                                                <p className="text-sm text-[var(--text-secondary)] mb-5 line-clamp-3 flex-1">
                                                    {post.excerpt}
                                                </p>
                                                <div className="flex items-center justify-between text-xs text-[var(--text-muted)] pt-4 border-t border-[var(--glass-border)]">
                                                    <div className="flex items-center gap-4">
                                                        <span className="flex items-center gap-1.5">
                                                            <Calendar size={12} />
                                                            {new Date(post.date).toLocaleDateString("en-US", {
                                                                month: "short",
                                                                day: "numeric",
                                                            })}
                                                        </span>
                                                        <span className="flex items-center gap-1.5">
                                                            <Clock size={12} />
                                                            {post.readTime}
                                                        </span>
                                                    </div>
                                                    <ArrowUpRight
                                                        size={16}
                                                        className="text-[var(--gold-400)] opacity-0 group-hover:opacity-100 transition-opacity"
                                                    />
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="py-24 lg:py-32 relative overflow-hidden" style={{ background: "var(--bg-elevated)" }}>
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.03]"
                    style={{ background: "var(--gradient-gold)", filter: "blur(120px)" }}
                />
                <div className="section-container relative z-10">
                    <div className="max-w-xl mx-auto text-center">
                        <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-semibold mb-6">
                            Get the Weekly <span className="gradient-text">Nerd Brief</span>
                        </h2>
                        <p className="text-lg text-[var(--text-secondary)] mb-8">
                            One email per week with actionable AI and automation insights. No spam, unsubscribe anytime.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-4">
                            <input
                                id="newsletter-email"
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-6 py-4 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] text-white placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--gold-500)] transition-colors"
                            />
                            <button type="submit" className="btn btn-primary px-8 rounded-full">
                                Subscribe
                                <ArrowUpRight size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
