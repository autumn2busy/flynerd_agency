import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, ArrowUpRight } from "lucide-react";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return { title: "Post Not Found" };
    return {
        title: `${post.title} | FlyNerd Tech Blog`,
        description: post.excerpt,
    };
}

/**
 * Minimal markdown-to-HTML for our blog content strings.
 * Handles: h2, h3, bold, italic, links, unordered lists, paragraphs.
 */
function renderMarkdown(raw: string): string {
    const lines = raw.trim().split("\n");
    const htmlParts: string[] = [];
    let inList = false;

    for (const line of lines) {
        const trimmed = line.trim();

        // Skip blank lines but close lists
        if (!trimmed) {
            if (inList) {
                htmlParts.push("</ul>");
                inList = false;
            }
            continue;
        }

        // Headings
        if (trimmed.startsWith("### ")) {
            if (inList) { htmlParts.push("</ul>"); inList = false; }
            htmlParts.push(`<h3>${inlineFormat(trimmed.slice(4))}</h3>`);
            continue;
        }
        if (trimmed.startsWith("## ")) {
            if (inList) { htmlParts.push("</ul>"); inList = false; }
            htmlParts.push(`<h2>${inlineFormat(trimmed.slice(3))}</h2>`);
            continue;
        }

        // Unordered list items
        if (trimmed.startsWith("- ")) {
            if (!inList) {
                htmlParts.push("<ul>");
                inList = true;
            }
            htmlParts.push(`<li>${inlineFormat(trimmed.slice(2))}</li>`);
            continue;
        }

        // Ordered list items
        if (/^\d+\.\s/.test(trimmed)) {
            if (!inList) {
                htmlParts.push("<ul>");
                inList = true;
            }
            htmlParts.push(`<li>${inlineFormat(trimmed.replace(/^\d+\.\s/, ""))}</li>`);
            continue;
        }

        // Regular paragraph
        if (inList) { htmlParts.push("</ul>"); inList = false; }
        htmlParts.push(`<p>${inlineFormat(trimmed)}</p>`);
    }

    if (inList) htmlParts.push("</ul>");
    return htmlParts.join("\n");
}

function inlineFormat(text: string): string {
    return text
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>")
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const allPosts = getAllPosts();
    const relatedPosts = allPosts
        .filter((p) => p.slug !== slug)
        .filter((p) => p.category === post.category)
        .slice(0, 3);

    // Fallback: if no same-category posts, just grab recent ones
    const displayRelated = relatedPosts.length > 0
        ? relatedPosts
        : allPosts.filter((p) => p.slug !== slug).slice(0, 3);

    const renderedContent = renderMarkdown(post.content);

    return (
        <>
            {/* Header */}
            <section className="pt-32 pb-8 lg:pt-40 relative overflow-hidden">
                {/* Background glow */}
                <div
                    className="absolute top-0 left-1/3 w-[500px] h-[400px] rounded-full opacity-[0.03]"
                    style={{ background: "var(--gradient-gold)", filter: "blur(120px)" }}
                />
                <div className="section-container relative z-10">
                    <Link
                        href="/blog"
                        id="back-to-blog"
                        className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--gold-400)] mb-8 transition-colors group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Nerd News
                    </Link>

                    <div className="max-w-3xl">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[var(--gold-500)]/10 text-[var(--gold-400)] border border-[var(--gold-500)]/20 mb-4">
                            {post.category}
                        </span>
                        <h1 className="text-[clamp(2rem,5vw,3rem)] font-semibold mt-2 mb-6 leading-tight">
                            {post.title}
                        </h1>
                        <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-6">
                            {post.excerpt}
                        </p>
                        <div className="flex items-center gap-6 text-sm text-[var(--text-muted)]">
                            <span className="flex items-center gap-2">
                                <Calendar size={14} />
                                {new Date(post.date).toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock size={14} />
                                {post.readTime}
                            </span>
                            <span>By {post.author}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Divider */}
            <div className="section-container">
                <div className="max-w-3xl border-t border-[var(--glass-border)] my-4" />
            </div>

            {/* Content */}
            <section className="pb-24">
                <div className="section-container">
                    <article
                        className="max-w-3xl blog-prose"
                        dangerouslySetInnerHTML={{ __html: renderedContent }}
                    />
                </div>
            </section>

            {/* Related Posts */}
            {displayRelated.length > 0 && (
                <section className="py-20 border-t border-[var(--glass-border)]">
                    <div className="section-container">
                        <h2 className="text-2xl font-semibold mb-10">
                            More <span className="gradient-text">Nerd Reads</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {displayRelated.map((rp) => (
                                <Link
                                    key={rp.slug}
                                    href={`/blog/${rp.slug}`}
                                    id={`related-${rp.slug}`}
                                    className="glass-card rounded-2xl p-6 group flex flex-col"
                                >
                                    <span className="inline-block self-start px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider text-[var(--gold-400)] bg-[var(--gold-500)]/8 border border-[var(--gold-500)]/15 mb-3">
                                        {rp.category}
                                    </span>
                                    <h3 className="text-base font-semibold mb-2 group-hover:text-[var(--gold-400)] transition-colors line-clamp-2">
                                        {rp.title}
                                    </h3>
                                    <p className="text-sm text-[var(--text-secondary)] line-clamp-2 flex-1 mb-4">
                                        {rp.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between text-xs text-[var(--text-muted)] pt-3 border-t border-[var(--glass-border)]">
                                        <span>{rp.readTime}</span>
                                        <ArrowUpRight
                                            size={14}
                                            className="text-[var(--gold-400)] opacity-0 group-hover:opacity-100 transition-opacity"
                                        />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="py-24 relative overflow-hidden" style={{ background: "var(--bg-elevated)" }}>
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-[0.03]"
                    style={{ background: "var(--gradient-gold)", filter: "blur(120px)" }}
                />
                <div className="section-container relative z-10">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-2xl font-semibold mb-6">
                            Need Help Implementing This?
                        </h2>
                        <p className="text-lg text-[var(--text-secondary)] mb-8">
                            Book a free strategy call and we&apos;ll help you identify the best automation opportunities for your business.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/contact" id="cta-strategy-call" className="btn btn-primary">
                                Book a Strategy Call
                                <ArrowUpRight size={18} />
                            </Link>
                            <Link href="/blog" id="cta-more-articles" className="btn btn-ghost">
                                Read More Articles
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
